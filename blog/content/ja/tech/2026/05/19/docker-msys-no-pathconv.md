---
title: "【Docker】Git Bash で Docker を実行するときの MSYS_NO_PATHCONV=1 について"
date: 2026-05-19T10:30:00+09:00
description: "Git Bash から Docker を実行するときにパスが意図せず変換される場合の原因と、MSYS_NO_PATHCONV=1 を使った回避方法を整理します。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】Git Bash で Docker を実行するときの MSYS_NO_PATHCONV=1 について

Windows の Git Bash から Docker コマンドを実行していると、ボリュームマウントやコンテナ内のパス指定が意図せず Windows パスに変換されることがあります。

たとえば、`/app` や `/var/www/html` のようなコンテナ内の Linux パスを指定したつもりでも、Git Bash 側のパス変換によって Docker に渡る引数が変わり、マウントに失敗することがあります。

このような場合は、コマンドの先頭に `MSYS_NO_PATHCONV=1` を付けることで回避できます。

## MSYS_NO_PATHCONV=1 とは

`MSYS_NO_PATHCONV=1` は、Git Bash などの MSYS 系シェルで行われるパス変換を無効化するための環境変数です。

Git Bash は Windows 上で Unix 風の操作感を提供するため、`/c/Users/user` のようなパスを Windows の `C:\Users\user` のような形式に変換して、Windows ネイティブの実行ファイルへ渡します。

この変換は便利な一方で、Docker のように「ホスト側のパス」と「コンテナ側の Linux パス」の両方を同じコマンドに書くツールでは、意図しない変換の原因になることがあります。

## Docker で問題になりやすい例

たとえば、Git Bash で以下のように Docker を実行します。

```bash
docker run --rm -v "$(pwd)":/app -w /app node:24-alpine npm install
```

このコマンドでは、以下の 2 種類のパスを使っています。

- `"$(pwd)"`: Windows ホスト側のカレントディレクトリ
- `/app`: コンテナ内の作業ディレクトリ

しかし Git Bash のパス変換が働くと、コンテナ内の `/app` まで Windows 側のパスとして扱われてしまい、Docker が期待する指定とずれることがあります。

## MSYS_NO_PATHCONV=1 を付けて実行する

Git Bash から Docker を実行する場合は、以下のようにコマンドの先頭に `MSYS_NO_PATHCONV=1` を付けます。

```bash
MSYS_NO_PATHCONV=1 docker run --rm -v "$(pwd)":/app -w /app node:24-alpine npm install
```

これで Git Bash による自動パス変換を抑止し、Docker に指定したパスをそのまま渡せます。

一時的に 1 コマンドだけ無効化したい場合は、この書き方が扱いやすいです。

## docker compose でも同じ

`docker compose` コマンドでも同じように指定できます。

```bash
MSYS_NO_PATHCONV=1 docker compose up -d
```

`docker compose exec` でコンテナ内のパスを指定する場合にも有効です。

```bash
MSYS_NO_PATHCONV=1 docker compose exec app ls /var/www/html
```

コンテナ内のパスを引数に含めるコマンドで、Git Bash 利用時だけ挙動がおかしい場合は、まず `MSYS_NO_PATHCONV=1` を付けて確認すると切り分けしやすいです。

## 毎回付けるのが面倒な場合

毎回 `MSYS_NO_PATHCONV=1` を付けるのが面倒な場合は、Git Bash の設定ファイルに alias を定義しておく方法もあります。

```bash
alias docker='MSYS_NO_PATHCONV=1 docker'
alias docker-compose='MSYS_NO_PATHCONV=1 docker-compose'
```

`~/.bashrc` などに追記しておくと、Git Bash を開いたときに自動で反映できます。

ただし、すべての Docker コマンドでパス変換を無効化して問題ないとは限りません。まずは問題が起きるコマンドだけに付けて確認し、必要であれば alias 化するのがおすすめです。

## PowerShell や WSL では基本的に不要

`MSYS_NO_PATHCONV=1` は MSYS 系シェルのパス変換を抑止するための指定です。

そのため、PowerShell やコマンドプロンプト、WSL の bash から Docker を実行している場合は、基本的にこの指定は不要です。

環境ごとの使い分けとしては、以下のように考えると分かりやすいです。

- Git Bash で Docker を使う: `MSYS_NO_PATHCONV=1` が必要になることがある
- PowerShell で Docker を使う: PowerShell 向けのパス指定にする
- WSL で Docker を使う: WSL の Linux パスとして扱う

## まとめ

Git Bash から Docker を実行していて、ボリュームマウントやコンテナ内パスの指定がうまく動かない場合は、Git Bash の自動パス変換が原因になっていることがあります。

その場合は、以下のように `MSYS_NO_PATHCONV=1` を付けて実行します。

```bash
MSYS_NO_PATHCONV=1 docker run --rm -v "$(pwd)":/app -w /app node:24-alpine npm install
```

Docker コマンド自体の問題に見えても、実際にはシェルが Docker に渡す前に引数を書き換えているケースがあります。Git Bash + Docker の組み合わせでは、`MSYS_NO_PATHCONV=1` を覚えておくとトラブルシュートしやすくなります。

## 参考

- <a href="https://www.msys2.org/docs/filesystem-paths/" target="_blank" rel="nofollow noopener">Filesystem Paths - MSYS2</a>
- <a href="https://docs.docker.com/engine/storage/bind-mounts/" target="_blank" rel="nofollow noopener">Bind mounts | Docker Docs</a>
- <a href="https://docs.docker.com/get-started/workshop/06_bind_mounts/" target="_blank" rel="nofollow noopener">Use bind mounts | Docker Docs</a>
