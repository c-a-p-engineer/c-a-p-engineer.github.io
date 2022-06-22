---
title: "【GoLang】go: cannot use path@version syntax in GOPATH mode 解決"
date: 2022-06-22T18:30:00+09:00
description: "go: cannot use path@version syntax in GOPATH mode 解決メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GoLang
- コーディング規約
categories: 
- GoLang
image: images/thumbnail/Go_Logo_Aqua.svg
---

# 【GoLang】go: cannot use path@version syntax in GOPATH mode 解決
`go: cannot use path@version syntax in GOPATH mode` 解決メモ

## 現象
発生バージョン
* `Go 1.15`

`Go` の場合はパッケージを入れる際に `@` の後ろにバージョンを指定すると指定のバージョンを入れることができます。
```shell
go get golang.org/x/tools/gopls@v0.8.4
```

ですが、以下のようなエラーが発生しました。

```
go: cannot use path@version syntax in GOPATH mode
```

## 原因
**モジュール対応モード** の設定がされていなかった。

## 解決
モジュール対応モードを有効化すれば可能になります。

```shell
export GO111MODULE=on
```
`Go 1.11` から入ったので `GO111MODULE` という名前のようです。

これによりバージョン指定をすることが可能になります。

## 参考情報
* <a href="https://stackoverflow.com/questions/54415733/getting-gopath-error-go-cannot-use-pathversion-syntax-in-gopath-mode-in-ubun" target="_blank" rel="nofollow noopener">Getting GOPATH error &quot;go: cannot use path@version syntax in GOPATH mode&quot; in Ubuntu 16.04 - Stack Overflow</a>
