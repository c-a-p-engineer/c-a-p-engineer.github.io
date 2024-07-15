---
title: "【bash】シェル内でヒアドキュメントを使用する"
date: 2022-10-15T13:30:00+09:00
description: "シェル内でヒアドキュメント使用する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- bash
categories: 
- bash
image: images/thumbnail/Gnu-bash-logo.svg
---

# 【bash】シェル内でヒアドキュメントを使用する
シェル内でヒアドキュメント使用する方法

## ヒアドキュメント

最初に **ヒアドキュメントは標準出力として扱われる** ということです。

試しに以下のように `echo` してみます。

```bash
echo << EOS
1
ab
456
cdef
EOS
```

こうすると標準出力扱いのため改行のみ出力されます。
以下のようにすると文字列を出力します。

```bash
cat<<EOS
1
ab
456
cdef
EOS
```

## 変数に使用する
変数にヒアドキュメントを使用する場合 `$()` , ``\（アクセント）`, `'（シングルクォーテーション）`, `"（ダブルクォーテーション）` で囲うと使用できます。
どれも `1 ab 456 cdef` と改行がスペースに変えられた状態で出力されます。

### カッコ
```bash
STR=$(cat << EOS
1
ab
456
cdef
EOS
)

echo ${STR}
```

### バッククォート
```bash
STR=`cat << EOS
1
ab
456
cdef
EOS
`

echo ${STR}
```

### シングルクォート
```bash
STR='
1
ab
456
cdef
'

echo ${STR}
```

### ダブルクォーテーション
```bash
STR="
1
ab
456
cdef
"

echo ${STR}
```

## 変数内の改行を有効にする
`"` を使用して変数を展開すると改行が有効になります。
```bash
STR="
1
ab
456
cdef
"

echo "${STR}"
```

こうすると変数が改行されて展開されます。
```
1
ab
456
cdef
```
