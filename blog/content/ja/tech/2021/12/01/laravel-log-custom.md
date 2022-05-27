---
title: "【Laravel】ログにログ出力元のファイル情報などを出力する"
date: 2021-12-01T03:00:00+09:00
description: "Laravelで簡単にログにログ出力元のファイル情報などを出力する方法"
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

# 【Laravel】ログにログ出力元のファイル情報などを出力する
Laravelで簡単にログにログ出力元のファイル情報などを出力する方法メモ。

## サンプルコード
## 確認環境
{{< alert theme="info" >}}
PHP 8.0.1
Laravel 8.73.2
{{< /alert >}}

### ログカスタマイズクラスを作成
```php:/app/Logging/CustomLog.php
<?php

declare(strict_types=1);

namespace App\Logging;

use Monolog\Logger;

class CustomLog
{
    public function __invoke($monolog)
    {
        foreach ($monolog->getHandlers() as $handler) {
            // ファイル名、行、クラス名、ファンクション名
            $handler->pushProcessor(new \Monolog\Processor\IntrospectionProcessor(
                \Monolog\Logger::DEBUG,
                [
                    // 出力しないフォルダ
                    'Monolog\\',
                    'Illuminate\\',
                    'Fruitcake\\',
                ]
            ));
            // ホスト名
            $handler->pushProcessor(new \Monolog\Processor\HostnameProcessor());
            // メモリ最大使用量
            $handler->pushProcessor(new \Monolog\Processor\MemoryPeakUsageProcessor());
            // メモリ使用量
            $handler->pushProcessor(new \Monolog\Processor\MemoryUsageProcessor());
            // プロセスID
            $handler->pushProcessor(new \Monolog\Processor\ProcessIdProcessor());
        }
    }
}
```

### ログを追加
`logging.php` にログを追加。
```php:/app/config/logging.php
<?php

return [

        // この行を追加
        'custom' => [
            'driver' => 'daily',
            'path' => storage_path('logs/laravel.log'),
            'level' => env('LOG_LEVEL', 'debug'),
            'days' => 14,
            'tap' => [App\Logging\CustomLog::class],
        ],
]
```

### 設定を変更
`.env` の設定を変更
```yml:.env..yml
LOG_CHANNEL=custom
```
### ログを仕込む
 Welcomeページに仕込みました。
```php:/app/routes/web.php
<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

Route::get('/', function () {
    Log::debug('test');
    return view('welcome');
});

```
### 出力結果
ログに適用したプロセスIDなどが出力されるようになりました。
```php:/app/storage/logs/laravel-2021-12-01.log..php
[2021-12-01 02:44:56] local.DEBUG: test  {"process_id":7,"memory_usage":"2 MB","memory_peak_usage":"2 MB","hostname":"d2dc8b7547c8","file":"/var/www/app/public/index.php","line":52,"class":null,"function":null}
```

## 参考
* <a href="https://akamist.com/blog/archives/4191" target="_blank" rel="nofollow noopener">[Laravel] ログにファイル名と行番号を追加する | akamist blog</a>
