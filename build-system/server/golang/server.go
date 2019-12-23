package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	http.HandleFunc("/", entitlements)
	log.Fatal(http.ListenAndServe(":" + port, nil))
}

func entitlements(w http.ResponseWriter, r *http.Request) {

	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	dictionary := make(map[string]string)
	dictionary["message"] = "Hello from Go!"

	json, _ := json.Marshal(dictionary)

	w.Header().Set("Content-Type", "application/json")
	w.Write(json)

}