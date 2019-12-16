package main

import (
	"bytes"
	"encoding/base64"
	"flag"
	"fmt"
	"github.com/google/tink/go/aead"
	"github.com/google/tink/go/core/registry"
	"github.com/google/tink/go/hybrid"
	"github.com/google/tink/go/insecurecleartextkeyset"
	"github.com/google/tink/go/integration/gcpkms"
	"github.com/google/tink/go/keyset"
	"log"
	"os"
)

var (
	project        = flag.String("project", "", "GCS Project ID")
	location       = flag.String("location", "", "GCS Keyring Location")
	keyring        = flag.String("keyring", "", "GCS Keyring ID")
	key            = flag.String("key", "", "GCS Key ID")
	outFilePrivate = flag.String("outfilePrivate", "", "Output file for private key.")
	outFilePublic  = flag.String("outfilePublic", "", "Output file for public key.")
)

func main() {
	flag.Parse()
	keyURI := fmt.Sprintf(
		"gcp-kms://projects/%s/locations/%s/keyRings/%s/cryptoKeys/%s",
		*project,
		*location,
		*keyring,
		*key)

    log.Println("KEY URI: ", keyURI)

	gcpclient, err := gcpkms.NewGCPClient(keyURI)
	if err != nil {
		log.Fatal(err)
	}

	//_, err = gcpclient.LoadCredentials(*credentialsFile)
	_, err = gcpclient.LoadDefaultCredentials()
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Calling KMS")
	registry.RegisterKMSClient(gcpclient)
	log.Println("KMS Registered")

	dek := aead.AES128CTRHMACSHA256KeyTemplate()
	khgcs, err := keyset.NewHandle(aead.KMSEnvelopeAEADKeyTemplate(keyURI, dek))
	if err != nil {
		log.Fatal(err)
	}
	log.Println("GCP Key Handle created")

	a, err := aead.New(khgcs)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("GCP AEAD created")

	kh, err := keyset.NewHandle(hybrid.ECIESHKDFAES128GCMKeyTemplate())
	if err != nil {
		log.Fatal(err)
	}
	exported := &keyset.MemReaderWriter{}
	if err := insecurecleartextkeyset.Write(kh, exported); err != nil {
		log.Fatal("unexpected error writing keyset: %v", err)
	}
	log.Println("private keyset created")

	ct, err := a.Encrypt([]byte(exported.Keyset.String()), nil)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Private keyset encrypted successfully.")

	// Write the encrypted document to the output file.
	f, err := os.Create(*outFilePrivate)
	if err != nil {
		log.Fatal(err)
	}
	f.WriteString(base64.StdEncoding.EncodeToString(ct))
	log.Println("Private keyset writen to file: ", *outFilePrivate)

	khPub, err := kh.Public()
	if err != nil {
		log.Fatal(err)
	}

	buf := new(bytes.Buffer)
	exportedPub := keyset.NewJSONWriter(buf)
	if err = khPub.WriteWithNoSecrets(exportedPub); err != nil {
		log.Fatal(err)
	}

	pf, err := os.Create(*outFilePublic)
	if err != nil {
		log.Fatal(err)
	}
	pf.Write(buf.Bytes())
	log.Println("Public keyset writen to file: ", *outFilePrivate)
}
