---
title: "【Laravel】CloudWatch Logs にログを出力する方法"
date: 2022-01-22T18:00:00+09:00
description: "Laravel で AWS の CloudWatch Logs にログを出力する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- Laravel
- AWS CloudWatch Logs
categories: 
- Laravel
image: images/thumbnail/laravel-l-slant.png
---

# 【Laravel】CloudWatch Logs にログを出力する方法
`Laravel` で `AWS` の `CloudWatch Logs` にログを出力する方法。

## 実装

### 1. composer インストール
```shell
composer require maxbanton/cwh
```

### 2. ログクラス作成
```php:config/logging.php
<?php

namespace App\Logging;

use Aws\CloudWatchLogs\CloudWatchLogsClient;
use Maxbanton\Cwh\Handler\CloudWatch;
use Monolog\Logger;

class CloudWatchLoggerFactory
{
    /**
     * Create a custom Monolog instance.
     *
     * @param  array  $config
     * @return \Monolog\Logger
     */
    public function __invoke(array $config)
    {
        $sdkParams = $config["sdk"];
        $tags = $config["tags"] ?? [ ];
        $name = $config["name"] ?? 'cloudwatch';

        // AWS CloudWatchLogs Cliant
        $client = new CloudWatchLogsClient($sdkParams);
        $handler = new CloudWatch(
            $client,
            $config["log_group"],   // ロググループ
            $config["log_stream"],  // ログストリーム
            $config["retention"],   // ログ保持期間
            10000,
            $tags
        );
        $logger = new Logger($name);
        $logger->pushHandler($handler);
        return $logger;
    }
}
```

### 3. 設定追加
```php:config/logging.php
'cloudwatch' => [
    'driver' => 'custom',
    // 作成したクラス
    'via' => \App\Logging\CloudWatchLoggerFactory::class,
    'sdk' => [
        // AWS リージョン
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
        'version' => 'latest',
        // デプロイ先にIAMロールがアタッチされている場合、アタッチ済みロールを使用するなら削除する必要あり
        'credentials' => [
            // AWS アクセスキー
            'key' => env('AWS_ACCESS_KEY_ID'),
            // AWS シークレット
            'secret' => env('AWS_SECRET_ACCESS_KEY')
        ]
    ],
    // ロググループ名
    'log_group' => env('CLOUDWATCH_LOG_GROUP', 'log-group'),
    // ログストリーム名
    'log_stream' => env('CLOUDWATCH_LOG_STREAM', 'log-stream'),
    // ログ保持期間
    'retention' => env('CLOUDWATCH_LOG_RETENTION', 7),
    'level' => env('CLOUDWATCH_LOG_LEVEL', 'error')
],
```

## 注意点
`CloudWatchLogs` を使用するのでいくつかの注意点があります。
1. `CloudWatchLogs` に対する以下の権限が必要（面倒ならフル権限を与えましょう
    1. `CreateLogGroup` ロググループの作成
    2. `CreateLogStream` ログストリームの作成
    3. `PutLogEvents` ログ送信
    4. `DescribeLogStreams` ログ一覧
2. `config/logging.php` の `credentials` の設定
    * デプロイ先にIAMロールがアタッチされている場合、アタッチ済みロールを使用するなら削除する必要があります。



## 参考
* <a href="https://stackoverflow.com/questions/50814388/laravel-5-6-aws-cloudwatch-log#answer-51790656" target="_blank" rel="nofollow noopener">php - Laravel 5.6 aws cloudwatch log - Stack Overflow</a>
