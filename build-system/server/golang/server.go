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
	"os"
	"strings"
)

const swgEntitlementsUrl string = "https://news.google.com/swg/_/api/v1/publication/scenic-2017.appspot.com/entitlements"
const gcpProject string = "scenic-2017"
const gcpLocation string = "us-central1"
const gcpKeyring string = "swg-cryptokeys-1"
const gcpKey string = "tink-crypter-1"
const keyURI string = "gcp-kms://projects/scenic-2017/locations/us-central1/keyRings/swg-cryptokeys-1/cryptoKeys/tink-crypter-1"

type swgEncryptionKey struct {
	AccessRequirements []string
	Key                string
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	http.HandleFunc("/entitlements", entitlements)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// Gets entitlements from SwG backend, decrypts document key if access granted.
func entitlements(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	swgReq, err := http.NewRequest(r.Method, swgEntitlementsUrl, ioutil.NopCloser(bytes.NewReader(body)))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	swgReq.Header = r.Header
	client := &http.Client{}
	resp, err := client.Do(swgReq)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}
	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var entitlementsResponse map[string]interface{}
	if err := json.Unmarshal(respBody, &entitlementsResponse); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if _, ok := entitlementsResponse["decryptedDocumentKey"]; ok {
		// Although we could use this decryptedDocumentKey, we will decrypt
		// the key in the original request for demonstration.
		key, err := getDecryptedDocumentKey(r.URL)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if key != "" {
			entitlementsResponse["decryptedDocumentKey"] = key
		}
	}
	json, _ := json.Marshal(entitlementsResponse)
	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
}

// Decrypts the input document key using key information stored on GCP.
func getDecryptedDocumentKey(urlStr string) (string, error) {
	u, err := url.Parse(urlStr)
	if err != nil {
		return "", err
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
		// TODO: upload encrypted private key to Cloud Storage, change names here
		rc, err := client.Bucket(gcpProject).Object("encryptedPrivateKey").NewReader(ctx)
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
			if strings.Contains(ar, "scenic-2017.appspot.com:news") {
				return decKeys.Key, nil
			}
		}
	}
	return "", nil
}
