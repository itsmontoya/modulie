package main

import (
	"io"
	"net/http"
	"os"

	"github.com/julienschmidt/httprouter"
)

func main() {
	srv := httprouter.New()
	srv.GET("/", getIndex)
	srv.GET("/:filename", getFile)
	http.ListenAndServe(":8080", srv)
}

func getIndex(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Content-Type", "text/html")

	f, err := os.Open("./index.html")
	if err != nil {
		w.WriteHeader(404)
		return
	}

	io.Copy(w, f)
	f.Close()
}

func getFile(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	w.Header().Set("Content-Type", "application/javascript")
	filename := p.ByName("filename")
	if filename == "modulie.js" || filename == "modulie.compiled.js" {
		filename = "../" + filename
	} else {
		filename = "./" + filename
	}

	f, err := os.Open(filename)
	if err != nil {
		w.WriteHeader(404)
		return
	}

	io.Copy(w, f)
	f.Close()
}
