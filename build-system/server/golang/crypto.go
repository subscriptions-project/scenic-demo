import (
	"encoding/base64"
	"encoding/json"
	"log"
	"github.com/google/tink/go/aead"
	"github.com/google/tink/go/hybrid"
	"github.com/google/tink/go/core/registry"
	"github.com/google/tink/go/integration/gcpkms"
	"github.com/google/tink/go/keyset"
)

const gcsProjectId string = "";
const gcsLocationId string = ""; 
const gcsMasterKeyLocation string = "";

type swgEncryptionKey struct {
	AccessRequirements []string
	Key                string
}


func GenerateAndEncryptKeyset(input string) string {
	keyURI := fmt.Sprintf(
		"gcp-kms://projects/%s/locations/%s/keyRings/%s/cryptoKeys/%s",
		*project,
		*location,
		*keyring,
		*key)

	gcpclient, err := gcpkms.NewGCPClient(keyURI)
	if err != nil {
		log.Fatal(err)
	}

	//_, err = gcpclient.LoadCredentials(*credentialsFile)
	_, err = gcpclient.LoadDefaultCredentials()
	if err != nil {
		log.Fatal(err)
	}

	registry.RegisterKMSClient(gcpclient)

	priv := hybrid.ECIESHKDFAES128GCMKeyTemplate()
	khPriv, err := keyset.NewHandle(aead.KMSEnvelopeAEADKeyTemplate(keyURI, priv))
	if err != nil {
		log.Fatal(err)
	}

	hd, err := hybrid.NewHybridDecrypt(khPriv)
	if err != nil {
		log.Fatal(err)
	}

	b, err := base64.StdEncoding.DecodeString(input)
	if err != nil {
		log.Fatal(err)
	}

	dec, err := hd.Decrypt(b, nil)
	if err != nil {
		log.Fatal(err)
	}
	var dat swgEncryptionKey
	if err = json.Unmarshal(dec, &dat); err != nil {
        log.Fatal(err)
	}
	var decDocumentKey string = "";
	for _, val := range dat.AccessRequirements {
		if (val == "scenic-2017.appspot.com:premium") {
			decDocumentKey = dat.Key
		}
	}
	return decDocumentKey
}