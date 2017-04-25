package main

import (
	"io"
	"os"

	"fmt"

	"github.com/missionMeteora/apiserv"
)

func main() {
	srv := apiserv.New()
	srv.GET("/", getFile)
	srv.GET("/:filename", getFile)
	srv.Run(":8080")
}

func getFile(ctx *apiserv.Context) *apiserv.Response {
	filename, ext := ctx.Params.GetExt("filename")
	fmt.Println(filename, ext)
	if filename == "" && ext == "" {
		filename = "index"
		ext = "html"
	}

	switch ext {
	case "js":
		ctx.SetContentType("application/javascript")
	case "html":
		ctx.SetContentType("text/html")
	}

	f, err := os.Open(filename + "." + ext)
	if err != nil {
		ctx.WriteHeader(404)
		return nil
	}
	defer f.Close()

	io.Copy(ctx, f)
	return nil
}
