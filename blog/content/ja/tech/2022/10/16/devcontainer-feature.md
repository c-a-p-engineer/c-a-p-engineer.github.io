---
title: "【VSCode】Dev Container Features を利用して Dev Containerに簡単に機能を追加する"
date: 2022-10-17T09:00:00+09:00
description: "VSCode で Dev Container Features を利用して Dev Containerに簡単に機能を追加する"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Visual Studio Code
categories: 
- エディタ
image: images/thumbnail/docker.png
---

# 【VSCode】Dev Container Features を利用して Dev Containerに簡単に機能を追加する
VSCode で Dev Container Features を利用して Dev Containerに簡単に機能を追加する

## Dev Container Features とは
DevContainer に簡単に追加の機能を入れることが機能です。
これにより特にDockerの知識がなくても簡単に開発用のコンテナに言語などのセットアップが可能になります。

features の中にはGoやRustなど各種言語を入れることも簡単にでき `docker-in-docker`（Dockerの中でDockerを使う）や `desktop-lite` （デスクトップ） などの機能が存在していてとても有用です。

## Dev Container Features を設定する
以下のように設定すると簡単に `go` の `lts` バージョンがインストールされます。
```json:.devcontainer\devcontainer.json
{
    "image": "ubuntu:latest",
    "features": {
        "go": {
            "version": "lts",
        },
    },
}
```

今回はDocker image を使用していますが `dockerfile`, `docker-compose` の際でも Dev Container に対して自動的に入れてくれます。
公式の features は以下にあります。
<a href="https://github.com/devcontainers/features/tree/main/src" target="_blank" rel="nofollow noopener">devcontainers/features</a>

### Dev Container Features の参照方法
Dev Container Features 自作用テンプレートは以下に用意されています。
<a href="https://github.com/devcontainers/spec/blob/main/proposals/devcontainer-features.md#referencing-a-feature" target="_blank" rel="nofollow noopener">Referencing a feature</a>

公式リポジトリ使用時は該当名だけで良さそう（？

* 公式リポジトリ
  * `go`
* OCIリポジトリ
  * `ghcr.io/user/repo/go:latest`
* URL
  * `https://github.com/user/repo/releases/devcontainer-feature-go.tgz`
* ローカルリポジトリ
  * `./myGoFeature`

```json:.devcontainer\devcontainer.json
{
    "image": "ubuntu:latest",
    "features": {
        "go": {
            "version": "lts",
        },
        "ghcr.io/user/repo/go": {},
        "ghcr.io/user/repo1/go:1": {},
        "ghcr.io/user/repo2/go:latest": {},
        "https://github.com/user/repo/releases/devcontainer-feature-go.tgz": { 
                "optionA": "value" 
        },
        "./myGoFeature": { 
                "optionA": true,
                "optionB": "hello",
                "version" : "1.0.0"
        }
    }
}
```

### Dev Container Features を自作
Dev Container Features 自作用テンプレートは以下に用意されています。
<a href="https://github.com/devcontainers/feature-template" target="_blank" rel="nofollow noopener">devcontainers/feature-template</a>

## 注意点
features を使用することで簡単に機能の導入が可能になります。
ですが、いくつか問題があります。

僕は以下の問題から積極的に `features` を使用していません。

### 実行順序
実行順序は以下のようでした。
1. `Image`, `Dockerfile`, `docker-compose` からのコンテナの作成
2.  コンテナ作成後に `features` をインストール。

こうするとたとえばコンテナ作成時に細かな言語の設定をしたい場合などDev Containerに入ったあとに実行せざるおえません。

### インストールするのが遅い
僕自身の利用感ですがインストールするのが遅いです。
おそらく様々な環境にインストール出来るようにしているためだと思います。
できるなら自分で `Dockerfile` をいじって環境に適した書き方をした方が早いかと思われます。

### Dev Container じゃないといけない
当たり前ですが `features` を使用するに当たって Dev Container を起動しなければいけません。
そのため `Dockerfile`, `docker-compose` でコンテナを立ち上げても `features` がインストールされません。

## 参考
* <a href="https://code.visualstudio.com/blogs/2022/09/15/dev-container-features" target="_blank" rel="nofollow noopener">Dev Container Features</a>
* <a href="https://code.visualstudio.com/docs/remote/containers#_dev-container-features-preview" target="_blank" rel="nofollow noopener">Developing inside a Container#Dev Container Features (preview)</a>
* <a href="https://github.com/devcontainers/features/tree/main/src" target="_blank" rel="nofollow noopener">devcontainers/features</a>
* <a href="https://github.com/devcontainers/feature-template" target="_blank" rel="nofollow noopener">devcontainers/feature-template</a>
