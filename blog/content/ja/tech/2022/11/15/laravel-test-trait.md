---
title: "【Laravel】データベースに影響が出ないようにテストする"
date: 2022-11-15T18:00:00+09:00
description: "Laravel には各種テスト用の trait が用意されていて、それらを使用することでデータベースに影響が出ないようにテストができます"
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

# 【Laravel】データベースに影響が出ないようにテストする
Laravel には各種テスト用の trait が用意されていて、それらを使用することでデータベースに影響が出ないようにテストができます。


## トランザクションを使用する
`DatabaseTransactions` を使用する。
データベースにトランザクションを張って実行します。
そのため他のテストに影響を与えませんが代わりにマイグレーションなどは自分で実装する必要があります。

僕はPHPUnitのフックでテスト実行時にマイグレーションを実行して各テストはこれを使用するようにしています。

複数DBにまたがってトランザクションを張る必要がある場合は `connectionsToTransact` を指定してください。

```php:tests/feature/ExampleTest.php {linenos=table,hl_lines=[5,11,13]}
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use DatabaseTransactions;

    protected $connectionsToTransact = ['mysql1', 'mysql2'];

    /**
     * 基本的な機能テスト例
     *
     * @return void
     */
    public function test_basic_example()
    {
        $response = $this->get('/');

        // ...
    }
}
```

## migrationを使用する
`DatabaseMigrations` を使用する。
マイグレーションを使用してデータベースを完全にリセットしたい場合に使用。
ただし、毎回マイグレーションを実行するためテストがすごく遅くなります。

```php:tests/feature/ExampleTest.php {linenos=table,hl_lines=[5,11]}
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * 基本的な機能テスト例
     *
     * @return void
     */
    public function test_basic_example()
    {
        $response = $this->get('/');

        // ...
    }
}
```

## migrate, トランザクションの複合
`RefreshDatabase` を使用する。
スキーマが最新ならマイグレートされないようです。
その代わりにトランザクション内でテストをするために他のテストに影響を与えません。
ただし、マイグレーションを実行すると遅くなることがあります。

こちらの方法も複数DBにまたがってトランザクションを張る必要がある場合は `connectionsToTransact` を指定してください。

```php:tests/feature/ExampleTest.php {linenos=table,hl_lines=[5,11,13]}
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    protected $connectionsToTransact = ['mysql1', 'mysql2'];

    /**
     * 基本的な機能テスト例
     *
     * @return void
     */
    public function test_basic_example()
    {
        $response = $this->get('/');

        // ...
    }
}
```

## 参考
* <a href="https://readouble.com/laravel/9.x/ja/database-testing.html">Laravel 9.x データベーステスト</a>
