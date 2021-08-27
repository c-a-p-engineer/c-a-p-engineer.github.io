---
title: "【Electron】Ubuntu で Windows インストーラー作成時に出る wine is required エラー対処方法"
date: 2021-05-06T03:30:00+09:00
description: "Electron で Ubuntu Windows インストーラー作成時に出る wine is required エラー対処方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Electron
- Ubuntu
categories: 
- Electron 
image: images/thumbnail/Electron_Software_Framework_Logo.svg
---

# Ubuntu で Windows インストーラー作成時に出る wine is required エラー対処方法
Electron で Ubuntu Windows インストーラー作成時に出る wine is required エラー対処方法。

## 環境
* Ubuntu 20.04.2 LTS
* Node.js 14.16.0 LTS

## エラー
<a href="/blog/2021-05-06-electron-pack" target="_blank">【Electron】Windows用実行ファイルを作成</a> で `Ubuntu` で Windows 用のインストーラーを作成時に `electron-builder` を実行した際に以下のエラーが発生しました。

``` bash
$ npx electron-builder --win --x64
  • electron-builder  version=22.10.5 os=4.19.128-microsoft-standard
  • cannot check updates  error=TypeError: update_notifier_1.default is not a function
  • writing effective config  file=dist/builder-effective-config.yaml
  • packaging       platform=win32 arch=x64 electron=12.0.6 appOutDir=dist/win-unpacked
  • default Electron icon is used  reason=application icon is not set
  ⨯ wine is required, please see https://electron.build/multi-platform-build#linux  
  ⨯ /src/node_modules/app-builder-bin/linux/x64/app-builder exited with code ERR_ELECTRON_BUILDER_CANNOT_EXECUTE  failedTask=build stackTrace=Error: /src/node_modules/app-builder-bin/linux/x64/app
```

## 原因
原因は Windows 用のインストーラー作成する際に `Wine` という Linux 上で Windows 向けアプリケーションを実行するソフトが入っていないのが原因になります

## 解決方法
`Wine` を入れることで解決します。
以下のリンクの指示通りにインストールします。
* <a href="https://wiki.winehq.org/Ubuntu" target="_blank">Ubuntu - WineHQ Wiki</a>

以下のコマンドを実行することで解決します。
```
sudo dpkg --add-architecture i386
wget -nc https://dl.winehq.org/wine-builds/winehq.key
sudo apt-key add winehq.key
sudo apt update
sudo apt install --install-recommends winehq-stable
```