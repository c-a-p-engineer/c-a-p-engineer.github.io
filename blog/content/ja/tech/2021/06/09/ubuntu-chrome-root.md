---
title: "【Ubuntu】root ユーザでは Google Chrome が起動しない"
date: 2021-06-09T06:30:00+09:00
description: "Ubunt で root ユーザでは Google Chrome が起動しない現象"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Linux
- Ubuntu
categories: 
- Linux
image: images/thumbnail/delivered-by_orange_hex.png
---

# root ユーザでは Google Chrome が起動しない
`Ubuntu` を使用していて何故か `Google Chrome` が起動しない現象を確認しました。

## 原因
`Ubuntu` では `root` ユーザの場合に `Google Chrome` がセキュリティ上の都合で起動しません。

## 解決方法

解決方法自体は簡単です。
`--no-sandbox` を付けるだけで起動が出来ます。
ですが、`root` ユーザのサンドボックスを外すのは**セキュリティの都合上、推奨しません。**

お気をつけてください。

## コマンドラインから起動
コマンドラインから起動する場合は以下のようにすれば起動できます。
```
google-chrome --no-sandbox
```

上記のように `--no-sandbox` を入れて起動すればOKです。
リンクなども上記のように修正すればいけます。

## Chrome の修正
`Google Chrome` 起動 `bash` を修正します。
`/usr/bin/google-chrome` を開いて最終行に `--no-sandbox` を追加します。

``` bash
exec -a "$0" "$HERE/chrome" "$@"
```

↓ `--no-sandbox` を付与

``` bash
exec -a "$0" "$HERE/chrome" "$@" --no-sandbox
```

これで `Google Chrome` を起動することが出来ます。