---
title: "【PHP】github のリポジトリから直接 composer require でインストール"
date: 2022-02-07T09:00:00+09:00
description: "github のリポジトリから直接 composer require でインストールするメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- php
- composer
categories: 
- php
image: images/thumbnail/php.png
---

# 【PHP】github のリポジトリから直接 composer require でインストール
github のリポジトリから直接 composer require でインストールするメモ。
OSSのリポジトリの突然の削除や非公開の自作のパッケージを使用する際に使用できる方法です。

## composer に追記
以前に作成したパッケージを利用します。
<a href="https://github.com/c-a-p-engineer/hello-world-composer" target="_blank" rel="nofollow noopener">c-a-p-engineer/hello-world-composer: Hello,World in Composer</a>

```json:composer.json
{
    "repositories": [
        {
            "name": "c-a-p-engineer/hello-world-composer",
            "type": "vcs",
            "url": "https://github.com/c-a-p-engineer/hello-world-composer"
        }
    ]
}
```

* `name` パッケージの別名（なしでも可
* `vcs` リポジトリのタイプ <a href="https://getcomposer.org/doc/05-repositories.md" target="_blank" rel="nofollow noopener">Repositories#Types</a>
* `url` パッケージのURL

## インストール
インストール方法
```shell
composer require [パッケージ名]:dev-[ブランチ名]
```

実際にインストールする方法は以下になります。
```shell
composer require c-a-p-engineer/hello-world-composer:dev-master
```

これでインストールされ使用することが可能です。

## 参考
* <a href="https://getcomposer.org/doc/articles/handling-private-packages.md" target="_blank" rel="nofollow noopener">Handling private packages - Composer</a>
