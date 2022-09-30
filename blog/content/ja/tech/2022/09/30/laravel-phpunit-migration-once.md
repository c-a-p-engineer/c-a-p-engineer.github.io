---
title: "【Laravel】phpunit 実行時にマイグレーションを1回だけ実行する"
date: 2022-09-30T17:00:00+09:00
description: "Laravel で phpunit 実行時にテスト側にマイグレーションを一々実行させると時間がかかるのでマイグレーションを1回だけ実行する"
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

# 【Laravel】phpunit 実行時に migration を1回だけ実行する
Laravel で phpunit 実行時にテスト側にマイグレーションを一々実行させると時間がかかるのでマイグレーションを1回だけ実行する

## 実装
実装方法。

### phpunit.xml の設定
`phpunit.xml` に PHPUnit のフックファイルのパスを追記します。

```xml:phpunit.xml {linenos=table,hl_lines=["13"]}
<?xml version="1.0" encoding="UTF-8"?>
<phpunit backupGlobals="false"
         backupStaticAttributes="false"
         bootstrap="bootstrap/autoload.php"
         colors="true"
         convertErrorsToExceptions="true"
         convertNoticesToExceptions="true"
         convertWarningsToExceptions="true"
         processIsolation="false"
         stopOnFailure="false">
    <extensions>
        <!-- フック用ファイルのパス -->
        <extension class="Tests\Extension\Migration"/>
    </extensions>
    <php>
        <server name="APP_ENV" value="test"/>
        <server name="DB_CONNECTION" value="test_db"/>
        <server name="BCRYPT_ROUNDS" value="4"/>
        <server name="CACHE_DRIVER" value="array"/>
        <server name="MAIL_DRIVER" value="array"/>
        <server name="QUEUE_CONNECTION" value="sync"/>
        <server name="SESSION_DRIVER" value="array"/>
    </php>
</phpunit>
```

### PHPUnit 実行前にマイグレーションを行う
PHPUnit の `BeforeFirstTestHook` を利用して最初のテスト実行前にマイグレーションを行うようにします。

```php:tests\Extension\Migration.php
<?php

namespace Tests\Extension;

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Facades\Artisan;
use PHPUnit\Runner\BeforeFirstTestHook;

class Migration implements
    BeforeFirstTestHook
{
    /**
     * 最初のテスト実行前に起動
     * 
     * @return void
     */
    public function executeBeforeFirstTest(): void
    {
        // そのままLaravelの機能を使用できないため app を読み込み
        $app = require __DIR__ . '/../../bootstrap/app.php';

        // envファイル読み込み
        $envFile = '.env.' $_SERVER['APP_ENV']);
        $app->loadEnvironmentFrom($envFile);
        $app->make(Kernel::class)->bootstrap();

        // マイグレーション実行
        Artisan::call('migrate:fresh', ['--env' => $_SERVER['APP_ENV']]);
    }
}
```

これで起動時の最初のテスト前にマイグレーションを実行してくれて各テストの実行速度が早くなります。
