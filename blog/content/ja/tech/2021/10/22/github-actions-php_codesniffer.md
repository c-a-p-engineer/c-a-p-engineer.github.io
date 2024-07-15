---
title: "【GitHub】GitHub Actions で PHP を自動整形させる"
date: 2021-10-22T07:00:00+09:00
description: "GitHub Actions で PHP_codesniffer を利用して PHP の自動整形させる方法。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
- PHP
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Actions で PHP を自動整形させる
GitHub Actions で `PHP_codesniffer` を利用して PHP の自動整形させる方法。
ちなみにプルリクなどの際にコードチェックしてくれるのは以下の方法で可能なようです。
<a href="https://github.com/chekalsky/phpcs-action" target="_blank" rel="nofollow noopener"> chekalsky / phpcs-action</a>

## PHP自動整形

先に以下のようにローカルで一度インストールして `composer.json` に入れるようにしてください。
```
composer require --dev "squizlabs/php_codesniffer"
```

※サンプルでは `master`ブランチにコミットする度に整形が走ります。
出来ればコミットログが汚くなるのが嫌であればローカルで実行するなりする方法を考えてください。

``` yml:/.github/workflows/phpcs-auto-commit.yml
name: PHP_CodeSniffier

on:
  push:
    branches:
      - master

jobs:
  create-rss:
    runs-on: ubuntu-latest

    steps:
      # Checkout
      - name: Checkout
        uses: actions/checkout@v2

      # Composer Install
      - name: Install Dependencies
        run: composer install -q --no-ansi --no-interaction --no-scripts --no-progress --prefer-dist

      # PHPCS
      - name: PHPCS
        run: ./vendor/bin/phpcbf .

      # Commit
      - name: Commit
        if: ${{ failure() }}
        uses: stefanzweifel/git-auto-commit-action@v4.2.0
        with:
          commit_message: PHPCS
```

`if: ${{ failure() }}` にしている理由ですが、 `PHP_codesniffer` では例え実行が成功しても **phpcbfは修正したエラーの量を返す** ようです。
* <a href="https://gitter.im/squizlabs/PHP_CodeSniffer?at=5728b35e944fc7ba04cc9d05" target="_blank" rel="nofollow noopener"> squizlabs/PHP_CodeSniffer - Gitter</a>

## 参考
* <a href="https://gitter.im/squizlabs/PHP_CodeSniffer?at=5728b35e944fc7ba04cc9d05" target="_blank" rel="nofollow noopener"> squizlabs/PHP_CodeSniffer - Gitter</a>