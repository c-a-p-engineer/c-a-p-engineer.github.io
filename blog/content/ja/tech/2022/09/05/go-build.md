---
title: "【GoLang】クロスコンパイルさせる方法"
date: 2022-09-05T19:00:00+09:00
description: "Go でクロスコンパイルさせる方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GoLang
categories: 
- GoLang
image: images/thumbnail/Go_Logo_Aqua.svg
---

# 【GoLang】クロスコンパイルさせる方法
Go でクロスコンパイルさせる方法

## サンプルコード
```go:hello.go
package main

import "fmt"

func main() {
	fmt.Println("Hello, World")
}
```

## 通常のビルドコマンド
実行環境用のビルドを行うコマンドです。
```
go build [ビルドするファイル名]
go build hello.go
```

このビルドを行うと実行環境用のコンパイルが走ります。

### 名前を付けてビルド
```
go build -o [出力したいファイル名] [ビルドするファイル名]
go build -o sample hello.go
```

## クロスコンパイルをしてみる

### 対応OS確認
Goのクロスコンパイルが可能な一覧です。
```
go tool dist list
```

### Windows
64bit Windows用にコンパイルします。
```
GOOS=windows GOARCH=amd64 go build -o hello.exe hello.go
```

ファイル名を `.exe` を付け忘れないようにしてください。

### Linux x86_64
Linux x86_64用にコンパイルします。
```
GOOS=linux GOARCH=arm64 go build -o hello-linux,arm hello.go
```

### 現在の環境を確認
現在の `GOOS`,`GOARCH` を確認するには以下のコマンドで環境変数を確認できます。
```
go env
```

## 参考
* <a href="https://pkg.go.dev/cmd/go#hdr-Build_modes" target="_blank" rel="nofollow noopener">go command - cmd/go - Go Packages</a>
