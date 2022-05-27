---
title: "【PHP】PHPでツイートする"
date: 2021-12-19T04:00:00+09:00
description: "PHPで簡単にツイートをする方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- Twitter
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】PHPでツイートする
PHPで簡単にツイートをする方法

## 1. Twitter Developer
<a href="https://developer.twitter.com/" target="_blank" rel="nofollow noopener">Twitter Developer</a> に登録して、各種キーを確保してください。

だいぶ前に登録したのでうろ覚えなので詳しくは <a href="https://www.google.com/search?q=Twitter+Developer+%E7%99%BB%E9%8C%B2%E6%96%B9%E6%B3%95" target="_blank" rel="nofollow noopener">Google先生</a> に聞いてください。

英語で登録する必要がありますが、翻訳ソフトを使用しても通過するかと思います。
審査には数日かかるらしいです。

審査通過後、アプリを作成して各種キーを取得してください。
アプリを作成する際は権限を **Read And Write** にしないとツイートする権限がないので注意してください。

## 2. composer install
まずはTwitter用のパッケージをインストールします。
<a href="https://github.com/abraham/twitteroauth" target="_blank" rel="nofollow noopener">abraham/twitteroauth</a>
```shell
composer require abraham/twitteroauth
```

## 3. 自動ツイートコード
`tweet.php`を作ってPHPのコードを書きます。
```php:tweet.php
<?php

require __DIR__ . '/vendor/autoload.php';

use Abraham\TwitterOAuth\TwitterOAuth;

$apiKey = 'XXXXXXXXXX';
$apiSecret = 'XXXXXXXXXX';
$accessToken = 'XXXXXXXXXX';
$accessTokenSecret = 'XXXXXXXXXX';

$connection = new TwitterOAuth($apiKey, $apiSecret, $accessToken, $accessTokenSecret);

$result = $connection->post("statuses/update", [
    "status" => 'Hello,World',
]);

var_dump($result);
```

## 4. 実行
作ったPHPファイルを実行します。
```shell
php tweet.php
```

これでPHPからツイートされます。

## 参考情報
* <a href="https://github.com/abraham/twitteroauth" target="_blank" rel="nofollow noopener">abraham/twitteroauth</a>
