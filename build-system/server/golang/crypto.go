package golang

import (
	"context"
	"log"
	cloudkms "cloud.google.com/go/kms/apiv1"
	"github.com/google/tink/go/insecurecleartextkeyset"
    "github.com/google/tink/go/keyset"
)

const gcsProjectId string = "";
const gcsLocationId string = ""; 
const gcsMasterKeyLocation string = "";

func Decrypt() {
	// Create the KMS client.
	ctx := context.Background()
	client, err := cloudkms.NewKeyManagementClient(ctx)
	if err != nil {
			log.Fatal(err)
	}
	khPub, err := insecurecleartextkeyset.Read(keyset.NewBinaryReader(bytes.NewReader(ksPub)))
}