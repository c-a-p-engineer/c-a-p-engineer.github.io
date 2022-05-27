---
title: "【Ubuntu】Node.js をインストール"
date: 2021-04-30T11:30:00+09:00
description: "UbuntuにNode.js をインストールする備忘録"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Ubuntu
- Node.js
categories: 
- Ubuntu
image: images/thumbnail/delivered-by_orange_hex.png
---

# Node.js をインストール備忘録
UbuntuにNode.js をインストールする備忘録

## 実行環境
* Ubuntu 20.04.2 LTS

## PPAを利用して Node.js をインストール

`16.x` の箇所を変更することで他のバージョンをインストールすることが可能です。
使用可能なバージョンは <a href="https://github.com/nodesource/distributions/blob/master/README.md" target="_blank" rel="nofollow noopener">NodeSourceドキュメント</a> で確認が可能です。

``` bash {linenos=table}
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

インストール確認
``` bash
node -v
```

バージョン情報
``` bash
v16.0.0
```

## 参考
* <a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-ja" target="_blank" rel="nofollow noopener">Ubuntu 20.04にNode.jsをインストールする方法 | DigitalOcean</a>