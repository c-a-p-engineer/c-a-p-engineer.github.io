---
title: "【Electron】Windows用実行ファイルを作成"
date: 2021-05-06T03:00:00+09:00
description: "Electron で作ったものをWindows用の実行ファイルにします。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Electron
categories: 
- Electron 
image: images/thumbnail/Electron_Software_Framework_Logo.svg
---

# Windows用実行ファイルを作成
<a href="/blog/2021-05-04-electron-hello-world" target="_blank">【Electron】Hello,World! を表示するまで</a> で作った環境で進めています。

## 環境
* Ubuntu 20.04.2 LTS
* Node.js 14.16.0 LTS

## electron-builder インストール
`Electron` の実行用ファイル作成用のために `electron-builder` をインストールします。

``` bash
npm install -D electron-builder
```

インストールの確認
``` bash
npx electron-builder --help
```

各種ドキュメント
* <a href="https://www.electron.build/" target="_blank">electron-builder</a>
* <a href="https://github.com/electron-userland/electron-builder" target="_blank">electron-userland/electron-builder: A complete solution to package and build a ready for distribution Electron app with “auto update” support out of the box</a>

## Windows 実行ファイル作成
``` bash
npx electron-builder --win --x64
```

実行すると `dist` の中に `my-electron-app Setup 0.1.0.exe` が出来ています。
名前は `package.json` に記載されている `name` + Setup + `version` + .exe で作成されます。

また `dist/win-unpacked` に実行用ファイル `my-electron-app.exe` があります。

## 参考
* <a href="https://zenn.dev/unsoluble_sugar/articles/c5b5faefddd35c1be8a3" target="_blank">【入門】Electron完全に理解した</a>
