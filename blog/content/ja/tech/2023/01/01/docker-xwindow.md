---
title: "【Docker】XWindow を使用してDocker上のGUIアプリをホスト側で使用する"
date: 2023-01-01T02:00:00+09:00
description: "Docker上の GUIアプリを XWindow を使用してDocker上のGUIアプリをホスト側で使用する"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】XWindow を使用してDocker上のGUIアプリをホスト側で使用する
Docker上の GUIアプリを XWindow を使用してDocker上のGUIアプリをホスト側で使用する

## 環境
* Windows 11
* Docker version 20.10.21

## Host側の Windowsの用意
Xサーバーを導入します。
```
winget install marha.VcXsrv
cd "C:\Program Files\VcXsrv"
XLaunch
```

`C:\Program Files\VcXsrv` にない場合はスタートメニューなどから探してください。
起動後、すべてデフォルト設定で起動して問題ないです。（僕の場合はこれで動きました。


Mac の場合は <a href="https://www.xquartz.org/" target="_blank" rel="nofollow noopener">XQuartz</a> を入れれば良いようです。

## DockerFile の用意
Ubuntu LTS に X11アプリケーションを入れたものを用意します。
`DISPLAY` に `host.docker.internal:0:0` を設定することでホスト側のXサーバーに接続させます。
```DockerFile
FROM ubuntu:latest

# X Windows System 設定
# DISPLAY=Xサーバー名:ディスプレイ番号.スクリーン番号
ENV DISPLAY host.docker.internal:0.0

RUN apt-get update -y\
    && apt-get install x11-apps -y

```

## 実行 & 確認
DockerFileをビルドして実際に `xeyes` を実行してみます。
```
docker image build . -t x11
docker run --rm -it -t x11 xeyes
```

以下のような目が出てくれば成功です！
![xeyes](/tech/2023/01/01/docker-xwindow/xeyes.png "xeyes") 

一応コマンドの説明を載せておきます。
```
docker image build . -t [コンテナ名]
docker run --rm -it -t [コンテナ名] [コマンド]
```

これは元々 Andoroid Studio をDocker内で実行させてHOST側で操作出来ないかと思いやってみました。
Android Studio を実行して操作できることを確認できました。

## 参考
* <a href="https://zenn.dev/dozo/articles/3ef1565b2b069e" target="_blank" rel="nofollow noopener">Docker上のX11GUIをWindowsで使う</a>
