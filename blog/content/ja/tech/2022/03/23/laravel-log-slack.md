---
title: "【Laravel】ログを Slack に通知する"
date: 2022-03-23T02:50:00+09:00
description: "Laravel でログを Slack に通知する"
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

# 【Laravel】ログを Slack に通知する
LaravelでログをSlackに通知する。
Laravelはバージョン5.6から標準でSlackにログを出力する機能があり、簡単に設定が可能です。

## 1.Slack の用意
Slackへの通知用Webhook URLを取得する必要があります。
以下のリンクを参考に取得してください。
<a href="https://slack.com/intl/ja-jp/help/articles/115005265063-Slack-%E3%81%A7%E3%81%AE-Incoming-Webhook-%E3%81%AE%E5%88%A9%E7%94%A8" target="_blank" rel="nofollow noopener">Slack での Incoming Webhook の利用 | Slack</a>

## 2.設定変更
`.env` の修正を行います。
`LOG_CHANNEL` を `slack` に修正してSlackログの設定を追加します。
```yml:.env
# ログチャンネルを変更
LOG_CHANNEL=slack

# Slackログ設定
LOG_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxx # Webhook URL
```

Laravelでは以下の順でログレベルが設定されているので、たとえば `LOG_LEVEL` に `emergency` が設定されていた場合は `emergency` 未満の `alert` のログが出ないようになっています。
必要に応じて `LOG_LEVEL` の値を調整してください。
1. emergency
2. alert
3. critical
4. error
5. warning
6. notice
7. info
8. debug

実際に設定が使用される箇所は以下になります。
```php:config/logging.php
<?php
return [
        // 途中省略～～～
        'slack' => [
            'driver' => 'slack',
            'url' => env('LOG_SLACK_WEBHOOK_URL'),
            'username' => 'Laravel Log',
            'emoji' => '\:boom\:',
            'level' => env('LOG_LEVEL', 'critical'),
        ],
        // 途中省略～～～
];
```

## 3. 使用方法
実際にコードで行った際にSlackへログレベルに合わせて通知が飛びます。
```php
use Illuminate\Support\Facades\Log;

Log::emergency('emergency');
Log::alert('alert');
Log::critical('critical');
Log::error('error');
Log::warning('warning');
Log::notice('notice');
Log::info('info');
Log::debug('debug');
```

## 4. 通常のログも出力させたい
Slackへの通知が大量にあったりするとSlackのAPI側に拒否されたりする事がありSlackへの通知が行えないなど問題が発生します。
そういう場合に通常のログも残しておかないとログを確認することができません。
なので通常ログとSlackログの2つのログを `stack` で複数のログをまとめることができます。

```php:config/logging.php
<?php
return [
        // 途中省略～～～
        'stack' => [
            'driver' => 'stack',
            'channels' => ['single', 'slack'],
        ],
        // 途中省略～～～
];
```

`.env` の `LOG_CHANNEL` を `stack` に修正すると複数のログが出るようになります。
```yml:.env
# ログチャンネルを変更
LOG_CHANNEL=stack
```

## 5. ログを短くする
Slackへ通知するログが大きいと視認性が減るので短くしたい場合があります。
その場合は `short` と `context` の設定を追加します。
`'short' => true` で短いフォーマット。
`''context' => false ` でログのcontext部分を表示しないようになります。

```php:config/logging.php
<?php
return [
        // 途中省略～～～
        'slack' => [
            'driver' => 'slack',
            'url' => env('LOG_SLACK_WEBHOOK_URL'),
            'username' => 'Laravel Log',
            'emoji' => '\:boom\:',
            'level' => env('LOG_LEVEL', 'critical'),
            'short' => true, // 短いフォーマット
            'context' => false // context部分を表示しない
        ],
        // 途中省略～～～
];
```

## 参考
* <a href="https://readouble.com/laravel/9.x/ja/logging.html#configuration" target="_blank" rel="nofollow noopener">ログ 9.x Laravel #設定</a>
* <a href="https://readouble.com/laravel/9.x/ja/logging.html#configuring-the-slack-channel" target="_blank" rel="nofollow noopener">ログ 9.x Laravel #Slackチャンネルの設定</a>
* <a href="https://stackoverflow.com/questions/52272841/message-customization-of-laravel-log-using-slack-chanel" target="_blank" rel="nofollow noopener">logging - Message Customization of Laravel Log using Slack Chanel - Stack Overflow</a>
* <a href="https://github.com/laravel/framework/blob/v5.6.3/src/Illuminate/Log/LogManager.php#L270" target="_blank" rel="nofollow noopener">framework/LogManager.php at v5.6.3 · laravel/framework</a>
