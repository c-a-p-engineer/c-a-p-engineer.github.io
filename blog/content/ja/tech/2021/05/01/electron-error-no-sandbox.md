---
title: "【Electron】Running as root without --no-sandbox is not supported. エラーのの対処法"
date: 2021-05-01T18:30:00+09:00
description: "Electron で Running as root without --no-sandbox is not supported. エラーの対処法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Electron
categories: 
- Electron 
image: images/thumbnail/Electron_Software_Framework_Logo.svg
---

# Electron で Running as root without --no-sandbox is not supported. エラーの対処法
Electron で Running as root without --no-sandbox is not supported. エラーの対処法。

## 実行環境
* Ubuntu 20.04.2 LTS
* Node v14.16.1

## エラーの発生

`Electron` を実行のために下記のコマンドを実行します。
``` bash
npm start
```

そうすると以下のエラーが出力されて `Electron` が実行出来ませんでした。

``` bash
[1683:0501/092842.091389:FATAL:electron_main_delegate.cc(252)] Running as root without --no-sandbox is not supported. See https://crbug.com/638180./src/node_modules/electron/dist/electron exited with signal SIGTRAP
```

## pakage.json の修正
`pakage.json` の修正を行います。
以下の箇所を見つけて修正を行います。

``` json:package.json
  "scripts": {
    "start": "electron ."
  },
```

` --no-sandbox` を付与します。

``` json:package.json
  "scripts": {
    "start": "electron . --no-sandbox"
  },
```

再度以下のコマンドを実行すると `Electron` が起動します。

``` bash
npm start
```

## 参考
* <a href="https://github.com/electron/electron/issues/19454" target="_blank" rel="nofollow noopener">electron-quick-start on debian _ --no-sandbox is not supported · Issue #19454 · electron/electron</a>