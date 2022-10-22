---
title: "【GoLang】ヒアドキュメント（複数行の文字列）を使用する方法"
date: 2022-10-22T12:00:00+09:00
description: "Go でヒアドキュメント（複数行の文字列）を使用する方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GoLang
categories: 
- GoLang
image: images/thumbnail/Go_Logo_Aqua.svg
---

# 【GoLang】ヒアドキュメント（複数行の文字列）を使用する方法
Go でヒアドキュメント（複数行の文字列）を使用する方法メモ

## サンプルコード
`` `  `` バッククォートで囲うと複数行にまたがって文字列を使用できます。

```go:sample.go {linenos=table,hl_lines=["4-6"]}
package main

func main() {
    str := `1st line
2nd line
3rd line`

    println(str)
}
```

