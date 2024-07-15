---
title: "【Laravel】Class Redis Not Found が出た際の対処方法"
date: 2022-11-25T18:00:00+09:00
description: "LaravelでRedisを使用しようとしたら Class Redis Not Found が出た際の対処方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- Laravel
categories: 
- Laravel
image: images/thumbnail/laravel-l-slant.png
---

# 【Laravel】Class Redis Not Found が出た際の対処方法
LaravelでRedisを使用しようとしたら `Class Redis Not Found` が出た際の対処方法

## 発生環境
{{< alert theme="info" >}}
PHP 8.1.11
Laravel Framework 9.33.0
{{< /alert >}}

Redisの設定値
```conf:.env
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

## 対処法
対処方法は2種類あります。

### predis を使用する
composer パッケージの `predis` を使用。

まずは `predis` を入れる。
```bash
composer require predis/predis
```

`REDIS_CLIENT` を `predis` を使用するように `.env` に追記します。
```conf:.env {linenos=table,hl_lines=[1]}
REDIS_CLIENT=predis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

個人的には `composer.json` に記載されて記録が残るのでこっちのほうがおすすめ。

### phpredis を使用する
<a href="https://github.com/phpredis/phpredis/blob/develop/INSTALL.md" target="_blank" rel="nofollow noopener">phpredis install</a>


phpredis を入れます。
```bash
yum install php-pecl-redis
```

## 参考
* <a href="https://github.com/phpredis/phpredis" target="_blank" rel="nofollow noopener">phpredis/phpredis</a>
* <a href="https://laracasts.com/discuss/channels/laravel/class-redis-not-found" target="_blank" rel="nofollow noopener">Class 'Redis' not found - Laracasts</a>
