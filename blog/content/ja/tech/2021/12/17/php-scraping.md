---
title: "【PHP】PHPで簡単スクレイピング"
date: 2021-12-17T03:30:00+09:00
description: "PHPで簡単にスクレイピングを始める"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- スクレイピング
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】PHPで簡単スクレイピング
PHPで簡単にスクレイピングを始める

## 環境
* PHP7.1 より上のバージョン
* [Goutte - GitHub](https://github.com/FriendsOfPHP/Goutte)

## パッケージのインストール
`composer` を利用してインストール
```shell
composer require fabpot/goutte
```

## 使い方
基本的な使い方は GitHub に記載されています。
* [Goutte - GitHub](https://github.com/FriendsOfPHP/Goutte)
### アクセス
指定のURLにアクセスする。
```php
<?php

require __DIR__ . '/vendor/autoload.php';

use Goutte\Client;

$client = new Client();
$crawler = $client->request('GET', 'https://www.google.com/');
```

### リンクをクリックする
指定のリンクをクリックする。
```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Goutte\Client;

$client = new Client();
$crawler = $client->request('GET', 'https://ja.wikipedia.org/');
$link = $crawler->selectLink('ウィキペディア')->link();
$crawler = $client->click($link);
var_dump($crawler);
```

### 属性を取得
画像の `src` を取得する。
```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Goutte\Client;

$client = new Client();
$crawler = $client->request('GET', 'https://www.google.com/');

// 画像保存用変数
$images = [];

// 画像を取得
$crawler->filter('img')->each(function ($node) use (&$images) {
    // 画像のSRCを取得
    $images[] = $node->filter('img')->attr("src");
});
var_dump($images);
```

### ユーザエージェントを変更
ユーザーエージェントを変更します。
```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Goutte\Client;

$client = new Client();
// ユーザーエージェントを設定
$client->setServerParameter('HTTP_USER_AGENT', 'test');
$crawler = $client->request('GET', 'https://www.ugtop.com/spill.shtml');
var_dump($crawler);
exit;
```

## 参考情報
* <a href="https://github.com/FriendsOfPHP/Goutte" target="_blank" rel="nofollow noopener">Goutte - GitHub</a>
