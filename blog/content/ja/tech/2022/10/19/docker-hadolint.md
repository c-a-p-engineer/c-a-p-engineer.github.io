---
title: "【Docker】hadolint で Dockerfile をチェックしよう！"
date: 2022-10-19T18:00:00+09:00
description: "hadolint で Dockerfile をチェックしよう！"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】hadolint で Dockerfile をチェックしよう！
hadolint で Dockerfile をチェックしよう！

## Hadolint
Hadolint という Docker の lint ツールです。
* <a href="https://github.com/hadolint/hadolint" target="_blank" rel="nofollow noopener">hadolint/hadolint: Dockerfile linter, validate inline bash, written in Haskell</a>

### 使い方
今回はDockerを使った方法を紹介します。

```
docker run --rm -i hadolint/hadolint < Dockerfile
```

### フォーマットの指定
`--format` で指定。
フォーマットは `tty` と `json` があります。
デフォルトは `tty` のため `json` で出したい時だけ使用する感じですね。
```
docker run --rm -i hadolint/hadolint hadolint - --format json < Dockerfile
```

実行すると以下のような指摘が出力されます。
```
-:5 DL3008 warning: Pin versions in apt get install. Instead of `apt-get install <package>` use `apt-get install <package>=<version>`
-:5 DL3015 info: Avoid additional packages by specifying `--no-install-recommends`
-:25 SC2046 warning: Quote this to prevent word splitting.
-:35 DL4006 warning: Set the SHELL option -o pipefail before RUN with a pipe in it. If you are using /bin/sh in an alpine image or if your shell is symlinked to busybox then consider explicitly setting your SHELL to /bin/ash, or disable this check
```

各種のルールはこちらに記載されています。
また修正方法も記載されています。
<a href="https://github.com/hadolint/hadolint#rules" target="_blank" rel="nofollow noopener">Rules</a>

### 特定のルールを除外
`--ignore` で指定。
この場合は `DL3306` のルールを除外しております。

```
docker run --rm -i hadolint/hadolint hadolint - --ignore DL3006 < Dockerfile
```

対象のDockerfile自体に除外設定することも可能です。
`,` で区切ることによって複数指定ができます。
```Dockerfile {linenos=table,hl_lines=[3]}
FROM php:8.1.6-fpm-bullseye

# hadolint ignore=DL3008,DL3015
RUN apt-get update \
    # 基本
    && apt-get install -y wget git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
```

### 設定ファイルを使用する
設定ファイルを使用して設定します。
設定値は以下のようになっています。
<a href="https://github.com/hadolint/hadolint#configure" target="_blank" rel="nofollow noopener">hadolint/hadolint - Congigure</a>

`hadolint.yaml` を作成し、試しに除外設定を行います。
```hadolint.yaml
ignored:
  - DL3000
  - SC1010
```

以下のように設定ファイルを読み込み実行します。
（僕は Windows上では実行できなくて WSL上で実行しました。
```
docker run --rm -i -v "$PWD:/data:ro" -w /data hadolint/hadolint /bin/hadolint -c hadolint.yaml Dockerfile
```

## 参考
* <a href="https://nekopunch.hatenablog.com/entry/2018/10/08/213513" target="_blank" rel="nofollow noopener">「hadolint」にシバかれながら美しいDockerfileを書き上げる - 憂鬱な世界にネコパンチ！</a>
* <a href="https://github.com/hadolint/hadolint" target="_blank" rel="nofollow noopener">hadolint/hadolint: Dockerfile linter, validate inline bash, written in Haskell</a>
* <a href="https://github.com/hadolint/hadolint#rules" target="_blank" rel="nofollow noopener">Rules</a>
