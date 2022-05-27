---
title: "WSL に Docker を入れて使う"
date: 2021-09-08T10:00:00+09:00
description: "Docker Desktop を使用しないで WSL に Docker を入れて使います。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Windows
categories: 
- Windows
image: images/thumbnail/linux.png
---

# WSL に Docker を入れて使う
Docker Desktop を使用しないで WSL に Docker を入れて使います。

理由としてはWSLのDockerの方が軽くて早いと聞いたのでやってみようかと、大企業ではDocker Desktop が有料になるので一応やっておこうと思いました。
<a href="https://www.docker.com/blog/updating-product-subscriptions/" target="_blank" rel="nofollow noopener">Docker is Updating and Extending Our Product Subscriptions - Docker Blog</a>
> Docker Desktop remains free for small businesses （fewer than 250 employees AND less than $10 million in annual revenue）, personal use, education, and non-commercial open source projects.
> Docker Desktopは、スモールビジネス（従業員数250人以下かつ年間売上高1000万ドル未満）、個人利用、教育機関、非商用のオープンソースプロジェクトであれば、引き続き無料でご利用いただけます。

## 動作環境
・Windows10 Pro
・WSL2
・Ubuntu20.04（WSL）

## WSLの用意
WSLの用意がない方はインストールガイドを見ておすすめください。
公式のインストールガイドはこちらになります。
<a href="https://docs.microsoft.com/ja-jp/windows/wsl/install-win10" target="_blank" rel="nofollow noopener">Windows 10 用 Windows Subsystem for Linux のインストール ガイド</a>

## WSLのUbuntu上にDockerをインストール
WSL内で進めます。
Dockerのドキュメントはこちら（リンクは `install using the repository` から）
<a href="https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository" target="_blank" rel="nofollow noopener">Install Docker Engine on Ubuntu | Docker Documentation</a>

### Dockerの起動
WSL内でDockerを起動
``` bash
sudo /etc/init.d/docker start
```

### Dockerの自動起動設定
入れただけだと自動起動しないのでWSL内で設定。
``` bash
sudo /etc/init.d/docker start
```

## Docker Compose をインストール
Dockerのドキュメントはこちら
<a href="https://docs.docker.com/compose/install/" target="_blank" rel="nofollow noopener">Install Docker ComposeDocumentation</a>

## 参考
* <a href="https://qiita.com/ohtsuka1317/items/617a865b8a9d4fb67989?utm_content=buffer73000&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer" target="_blank" rel="nofollow noopener">Docker Desktopに依存しない、WindowsでのDocker環境 - Qiita</a>
