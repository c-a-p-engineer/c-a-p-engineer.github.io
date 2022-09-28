---
title: "【Laravel】コマンドの実行制限をさせる方法"
date: 2022-09-27T02:00:00+09:00
description: "Laravel側で用意されているコマンドをたとえば本番環境で実行させたくない時などに使えるコマンドの実行制限をさせる方法です。"
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

# 【Laravel】コマンドの実行制限をさせる方法
Laravel側で用意されているコマンドをたとえば本番環境で実行させたくない時などに使えるコマンドの実行制限をさせる方法です。

## 特定のコマンドの実行制限をする

```php:app/Console/Kernel.php
<?php

namespace App\Console;

use Illuminate\Support\Str;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB;

class Kernel extends ConsoleKernel
{
    // 実行させたくないコマンド
    const EXCLUDE_COMMAND = [
        'migrate:fresh',
        'migrate:reset',
    ];

    public function handle($input, $output = null)
    {
        // Laravel Load
        $this->bootstrap();

        if (
            // 実行させたくない環境
            env('APP_ENV') == 'production' &&
            // 入力されたコマンドの除外コマンド判定
            Str::contains($input->getFirstArgument(), self::EXCLUDE_COMMAND)
        ) {
            // 除外コマンドであれば処理を停止
            echo '################# Warning #################' . PHP_EOL;
            echo $input->getFirstArgument() . ' is this ' . env('APP_ENV') . ' can\'t run ' . PHP_EOL;
            echo '###########################################' . PHP_EOL;
            return 1;
        }

        // 処理を実行
        return parent::handle($input, $output);
    }
}
```

コマンドを実行すると以下のようなエラーが出ます。
```
$ php artisan migrate:fresh
################# Warning #################
migrate:fresh is this production can't run 
###########################################
```

## 参考
* <a href="https://cpoint-lab.co.jp/article/202010/17274/" target="_blank" rel="nofollow noopener">【Laravel】artisan コマンド実行による操作ミスを防ぐ処理の作り方 &#8211; 株式会社シーポイントラボ ｜  浜松のシステム・RTK-GNSS開発</a>
