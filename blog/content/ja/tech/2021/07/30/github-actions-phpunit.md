---
title: "【GitHub】GitHub Actions を利用して PHPUnit を実行する"
date: 2021-07-29T08:00:00+09:00
description: "GitHub Actions を利用して PHPUnit を実行してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Actions を利用して PHPUnit を実行する
ローカルで実行するのに時間がかる場合があるので GitHub Actions を利用して PHPUnit を実行してみました。

## サンプルコード
```yml:.github/workflows/phpunit.yml
name: PHPUnit

on: [push]

jobs:
  test:
    name: Test

    runs-on: ubuntu-latest

    # PHPのバージョンを複数指定
    strategy:
      matrix:
        php-version: ['7.4', '8.0']

    steps:
    # PHP Setup
    - name: Setup PHP ${{ matrix.php-version }}
      uses: shivammathur/setup-php@v2
      with:
        php-version: ${{ matrix.php-version }}

    - name: Checkout
      uses: actions/checkout@v2

    - name: Install dependencies
      run: composer install --prefer-dist --no-progress --no-suggest

    # テストを実行
    - name: Run PHPUnit
      run: php ./vendor/bin/phpunit tests/

```

これを利用することによりGitHub Actionsでテストを実行してもらえます。
また、複数バージョンを指定することによりPHPのバージョンアップのテストを行うことが可能です。

## 参考
* <a href="https://qiita.com/blue32a/items/0661d70216051ad6552d" target="_blank" rel="nofollow noopener">GitHub ActionsでPHPUnitを実行する - Qiita</a>
* <a href="https://techblog.istyle.co.jp/archives/4143" target="_blank" rel="nofollow noopener">GitHubActionsでPHP7.4環境のPHPUnitを実行する - istyle Tech Blog</a>
