---
title: "【GoLang】文字列を簡単に切り出す"
date: 2022-05-17T03:30:00+09:00
description: "文字列を簡単に切り出すメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GoLang
categories: 
- GoLang
image: images/thumbnail/Go_Logo_Aqua.svg
---

# 【GoLang】文字列を簡単に切り出す
`GoLang` で文字列を簡単に切り出すコロン記法メモ

## 文字列を簡単に切り出す
`GoLang` では簡単に文字列を切り出す方法があります。
```go:main.go
package main

import (
	"fmt"
)

func main() {
  // わかりやすく数字
	numbers := "123456789"
  // 5文字目以降（56789
	fmt.Printf("%s\n", numbers[4:])
  // 3文字目以前（123
	fmt.Printf("%s\n", numbers[:3])
  // 6文字目 - 7文字目（67
	fmt.Printf("%s\n", numbers[5:7])
}
```

1文字目は `0` から始まります。
* `:` の左の数値が始点（文字列の最後まで切り出す
* `:` の右の数値が終点（文字列の最初から切り出す
* `:` のどちらにも数値が指定されていた場合は指定された部分のみ切り出します。

## 参考
* <a href="https://go-tour-jp.appspot.com/moretypes/7" target="_blank" rel="nofollow noopener">Slices - A Tour of Go</a>
