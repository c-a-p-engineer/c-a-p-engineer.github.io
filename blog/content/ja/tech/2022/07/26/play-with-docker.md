---
title: "【Docker】ブラウザ上で Docker を実行できる 「Play with Docker」を使ってみる"
date: 2022-07-26T09:00:00+09:00
description: "ブラウザ上で Docker を実行できる 「Play with Docker」を使ってみる"
draft: false
enableToc: true
enableTocContent: true
tags: 
- ツール
- Docker
categories: 
- ツール
image: images/thumbnail/docker.png
---

# 【Docker】ブラウザ上で Docker を実行できる 「Play with Docker」を使ってみる
ブラウザ上で Docker を実行できる 「Play with Docker」を使ってみる
<a href="https://labs.play-with-docker.com/" target="_blank" rel="nofollow noopener">Play with Docker</a>

ローカルで一々試すのが面倒な時やパワーがないマシン、タブレットやスマホでも使えそうな感じです。

## Play with Docker で出来ること
* Docker
* git
* ssh
* 動作しているコンテナへのWebアクセス

セッションに4時間という制限はありますが、Dockerの動作確認だけではなく簡単な開発など出来そうです。

## ログイン
ログインには <a href="https://hub.docker.com/" target="_blank" rel="nofollow noopener">Docker Hub</a> のアカウントが必要です。
ログイン後、左上に制限時間が出てきます4時間でセッションが自動的に切れます。

## インスタンスを作成
左サイドバーの「+ ADD NEW INSTANCE」をクリックするとインスタンスが作成されます。

## Hello Docker
Docker の `Hello,World` を試してみます。

右、下部のコンソール部分に `docker run hello-world` と入力してください。
hello-worldコンテナを実行されます。

実行後に `docker ps -a` と入力すると `hello-world` コンテナをダウンロードして来て実行したのがわかります。

## Docker Compose してみる
試しに Docker Compose で Wordpress 環境を作ってみます。

1. コンソール部分に `touch docker-compose.yml` でファイルを作ります。
1. 右画面中央の `EDITOR` をクリック
1. 作成した `docker-compose.yml` を選択
1. 以下の内容を編集して保存（<a href="https://docs.docker.jp/compose/wordpress.html#compose-wordpress" target="_blank" rel="nofollow noopener">クィックスタート: Compose と WordPress</a>
```yml:docker-compose.yml
version: '3'

services:
   db:
     image: mysql:5.7
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - "8000:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
volumes:
    db_data:
```
1. コンソール部分に `docker-compose up` で環境が構築されます。
1. 環境が出来ると右上部の IP の部分に `8000` と表示されポートが開かれ、クリックすると作ったWordPressの環境へ接続できます。

## SSH接続
右上部の「SSH」の欄からSSHコマンドが表示されています。
そちらを使えばSSH出来る模様です。

エラーが出た際は `ssh-keygen` を行えば入れるとのこと。
* <a href="https://github.com/play-with-docker/play-with-docker/issues/285" target="_blank" rel="nofollow noopener"> Unable to SSH into PWD Instance #285</a>

なお私は何故か入れたり、入れなかったりしました…

## ショートカット
Play With Docker で普通にコピー & ペーストが出来ないのでお気をつけください。

### コピー
* Windows
  * `Ctrl + Insert`
* Mac
  * `command + c`

### ペースト
* Windows
  * `Shift + Insert`
* Mac
  * `command + v`

### コンソール画面最大化
* Windows
  * `alt + enter`
* Mac
  * `option + enter`

## ソース
Play With Docker のソースコードは以下で公開されています。
<a href="https://github.com/play-with-docker/play-with-docker" target="_blank" rel="nofollow noopener">Play with Docker</a>

## 参考
* <a href="https://labs.play-with-docker.com/" target="_blank" rel="nofollow noopener">Play with Docker</a>
* <a href="https://github.com/play-with-docker/play-with-docker" target="_blank" rel="nofollow noopener">Play with Docker</a>
