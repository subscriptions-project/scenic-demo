package main

import (
	"bytes"
	gcs "cloud.google.com/go/storage"
	"context"
	"encoding/json"
	swgDec "github.com/subscriptions-project/encryption/golang/decryption"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
)

const swgEntitlementsUrl string = "https://news.google.com/swg/_/api/v1/publication/scenic-2017.appspot.com/entitlements"
const gcpProject string = "scenic-2017"
const gcpBucket string = "scenic-2017.appspot.com"
const gcpPrivateKeyObject string = "scenic_private_key_gcs.txt"
const gcpLocation string = "us-central1"
const gcpKeyring string = "swg-cryptokeys-1"
const gcpKey string = "tink-crypter-1"
const keyURI string = "gcp-kms://projects/scenic-2017/locations/us-central1/keyRings/swg-cryptokeys-1/cryptoKeys/tink-crypter-1"

type swgEncryptionKey struct {
	AccessRequirements []string
	Key                string
}

func main() {
	http.HandleFunc("/decryptDocumentKey", decryptDocumentKey)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func decryptDocumentKey(w http.ResponseWriter, r *http.Request) {
	key, err := getDecryptedDocumentKey(r.URL)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
    resp := map[string]string{"decryptedDocumentKey": key}
	json, _ := json.Marshal(resp)
	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
}

// Decrypts the input document key using key information stored on GCP.
func getDecryptedDocumentKey(urlStr string) (string, error) {
	u, err := url.Parse(urlStr)
	if err != nil {
		return "", err
	}
	if product, ok := u.Query()["product"]; !ok {
		return "", nil
	}
	if encKey, ok := u.Query()["crypt"]; ok {
		// Passing empty string as credentials so that the application default is used.
		if err := swgDec.GetRegisteredGcpClient(gcpProject, gcpLocation, gcpKeyring, gcpKey, ""); err != nil {
			return "", err
		}
		aead, err := swgDec.CreateGcpAead(keyURI)
		if err != nil {
			return "", err
		}
		ctx := context.Background()
		client, err := gcs.NewClient(ctx)
		if err != nil {
			return "", err
		}
		rc, err := client.Bucket(gcpBucket).Object(gcpPrivateKeyObject).NewReader(ctx)
		if err != nil {
			return "", err
		}
		encryptedPrivKey, err := ioutil.ReadAll(rc)
		if err != nil {
			return "", err
		}
		rc.Close()
		hd, err := swgDec.CreateHybridDecryptEncryptedKeyset(string(encryptedPrivKey), &aead)
		if err != nil {
			return "", err
		}
		decBytes, err := swgDec.DecryptBase64Str(encKey, &hd)
		if err != nil {
			return "", err
		}
		decKeys = swgEncryptionKey{}
		if err := json.Unmarshal(decBytes, &decKeys); err != nil {
			return "", err
		}
		for _, ar := range decKeys.AccessRequirements {
			if strings.Contains(ar, product) {
				return decKeys.Key, nil
			}
		}
	}
	return "", nil
}
