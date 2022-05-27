---
title: "【Laravel】ログをJSON化する方法"
date: 2021-12-01T04:00:00+09:00
description: "LaravelでログをJSON化する方法"
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

# 【Laravel】ログをJSON化する方法
ログをJSON化する方法

## サンプルコード
## 確認環境
{{< alert theme="info" >}}
PHP 8.0.1
Laravel 8.73.2
{{< /alert >}}

### JSONフォーマットクラスを作成
ログのフォーマットを変更するクラスを作成します。
```php:/app/Logging/JsonLogFormatter.php
<?php

declare(strict_types=1);

namespace App\Logging;

use Monolog\Formatter\LineFormatter;

class JsonLogFormatter extends LineFormatter
{
    public function format(array $record):string
    {
        return json_encode(parent::format($record));
    }
}
```

### ログ適用クラスを作成
ログのフォーマットを適用させるクラスを作成します。
```php:/app/Logging/JsonLogApply.php
<?php

declare(strict_types=1);

namespace App\Logging;

use App\Logging\JsonLogFormatter;

class JsonLogApply
{
    public function __invoke($logging)
    {
        $jsonFormatter = new JsonLogFormatter();

        foreach($logging->getHandlers() as $handler) {
            $handler->setFormatter($jsonFormatter);
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
        'json' => [
            'driver' => 'daily',
            'path' => storage_path('logs/laravel.log'),
            'level' => env('LOG_LEVEL', 'debug'),
            'days' => 14,
            'tap' => [App\Logging\JsonLogApply::class],
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
JSONになって出力されるようになりました。
```json:/app/storage/logs/laravel-2021-12-01.log..json
{"message":"test","context":[],"level":100,"level_name":"DEBUG","channel":"local","datetime":"2021-12-01T03:52:01.518468+00:00"}}
```

## 参考
* <a href="https://qiita.com/rorensu2236/items/8b07b002c81a12c76964" target="_blank" rel="nofollow noopener">LaravelのログをJsonで吐き出せる様にする方法、AWSのCloudWatchを使おう。 - Qiita</a>
