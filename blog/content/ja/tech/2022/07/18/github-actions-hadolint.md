---
title: "【GitHub】GitHub Actions で Hadolint で Dockerfile をチェックする"
date: 2022-07-18T13:00:00+09:00
description: "GitHub Actions で Hadolint で Dockerfile をチェックする"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
- Docker
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Actions で Hadolint で Dockerfile をチェックする
GitHub Actions で Hadolint で Dockerfile をチェックする

## Hadolint
Hadolint という Docker の lint ツールです。
* <a href="https://github.com/hadolint/hadolint" target="_blank" rel="nofollow noopener">hadolint/hadolint: Dockerfile linter, validate inline bash, written in Haskell</a>

### Hadolint CIS ベンチマーク
Hadolintでチェックできるセキュリティ項目は以下のとおりです。
<a href="https://github.com/docker/docker-bench-security" target="_blank" rel="nofollow noopener">docker / docker-bench-security</a>

1. Create a user for the container（コンテナのユーザーを作成します） ✅
2. Use trusted base images for containers（コンテナに信頼できるベースイメージを使用する） -
3. Do not install unnecessary packages in the container（不要なパッケージをコンテナにインストールしないでください） -
4. Scan and rebuild the images to include security patches（イメージをスキャンして再構築し、セキュリティパッチを含めます） -
5. Enable Content trust for Docker （Dockerのコンテンツ信頼を有効にする） -
6. Add HEALTHCHECK instruction to the container image（コンテナ画像にHEALTHCHECK命令を追加します） -
7. Do not use update instructions alone in the Dockerfile（Dockerfileで更新手順を単独で使用しないでください） ✅
8. Remove setuid and setgid permissions in the images（画像のsetuidおよびsetgid権限を削除します） -
9. Use COPY instead of ADD in Dockerfile（DockerfileでADDの代わりにCOPYを使用する） ✅
10. Do not store secrets in Dockerfiles（Dockerfilesにシークレットを保存しないでください） -
11. Install verified packages only （検証済みパッケージのみをインストールします）-

## GitHub Actions Dokle

```yml:.github\workflows\dockle.yml
name: Docker Check

on:push

jobs:
  hadolint:
    name: hadolint DockerFile
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - uses: hadolint/hadolint-action@v2.0.0
        with:
          dockerfile: ./Dockerfile # チェックするDockerファイル
```

結果は以下のように出力されます。
内容がわからない時は以下を参照してみてください。
<a href="https://github.com/hadolint/hadolint#rules" target="_blank" rel="nofollow noopener">Rules</a>

```yml
Error: .//Dockerfile:5 DL3008 warning: Pin versions in apt get install. Instead of `apt-get install <package>` use `apt-get install <package>=<version>`
Error: .//Dockerfile:5 DL3015 info: Avoid additional packages by specifying `--no-install-recommends`
Error: .//Dockerfile:18 SC2046 warning: Quote this to prevent word splitting.
Error: .//Dockerfile:28 DL4006 warning: Set the SHELL option -o pipefail before RUN with a pipe in it. If you are using /bin/sh in an alpine image or if your shell is symlinked to busybox then consider explicitly setting your SHELL to /bin/ash, or disable this check
```

## 参考
* <a href="https://github.com/hadolint/hadolint" target="_blank" rel="nofollow noopener">hadolint/hadolint: Dockerfile linter, validate inline bash, written in Haskell</a>
* <a href="https://github.com/docker/docker-bench-security" target="_blank" rel="nofollow noopener">docker / docker-bench-security</a>
* <a href="https://github.com/hadolint/hadolint#rules" target="_blank" rel="nofollow noopener">Rules</a>
