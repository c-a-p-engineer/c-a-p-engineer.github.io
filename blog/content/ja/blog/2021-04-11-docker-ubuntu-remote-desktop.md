---
title: "【Docker】Ubuntuでリモートデスクトップ"
date: 2021-04-11T19:00:00+09:00
description: "Docker Hub に Ubuntuでリモートデスクトップが可能なものがあったので紹介。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
- Ubuntu
categories: 
- Docker
image: images/thumbnail/docker.png
---

# Dockerでリモートデスクトップが出来るUbuntuを作る
色々作るのが面倒なので以下のDockerリポジトリを発見しました。
[dorowu/ubuntu-desktop-lxde-vnc | Docker Hub](https://hub.docker.com/r/dorowu/ubuntu-desktop-lxde-vnc/)

以下を使用しています。
* デスクトップ - lxde
* リモート - VNC

## Quick Start
クイックスタートをやってみると簡単にリモートデスクトップが成功！
しかもブラウザで接続できるように設定されていてありがたいです。
[http://127.0.0.1:6080/](http://127.0.0.1:6080/)

![desktop.png](/images/posts/2021-04-11-docker-ubuntu-remote-desktop/desktop.png "desktop.png") 

## Docker Compose
色々と再利用しやすいようにDocker Composeを作成してGitHubリポジトリにアップロードしておきました。
[GitHub - c-a-p-engineer/docker-ubuntu-remote-desktop](https://github.com/c-a-p-engineer/docker-ubuntu-remote-desktop)

