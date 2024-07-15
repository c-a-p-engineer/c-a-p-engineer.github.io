---
title: "【Laravel】Laravel + PHPUnit で RuntimeException: A facade root has not been set. が出た時の対処方法"
date: 2022-07-08T12:00:00+09:00
description: "Laravel + PHPUnit で RuntimeException: A facade root has not been set. が出た時の対処方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/laravel-l-slant.png
---

# 【Laravel】Laravel + PHPUnit で RuntimeException: A facade root has not been set. が出た時の対処方法
Laravel + PHPUnit で `RuntimeException: A facade root has not been set.` が出た時の対処方法メモ。

## 失敗
`setUp` メソッドを追加してログを出すようにしました。

```php:tests/Unit/ExampleTest.php {linenos=table,hl_lines=[13]}
<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Log;

class ExampleTest extends TestCase
{

    protected function setUp(): void
    {
        Log::debug('Start ' . __CLASS__);
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $this->assertTrue(true);
    }
}
```

下記のようなエラーが出ました。
```
RuntimeException: A facade root has not been set.
```

## 原因
`setUp` 時点ではファザードの読み込みがされていないのが原因でした。

## 解決方法
`parent::setUp();` を `setUp()` に追加するだけで解決できます。

Laravel によると `setUp()` には `parent::setUp()` , `tearDown()` には `parent::tearDown()` が必須のようです。

> Note: テストクラスに独自のsetUpメソッドを定義する場合は、親のクラスの`parent::setUp()`／`parent::tearDown()`を確実に呼び出してください。

<a href="https://readouble.com/laravel/8.x/ja/testing.html#creating-tests" target="_blank" rel="nofollow noopener">テスト: テストの準備 8.x Laravel</a>

```php:tests/Unit/ExampleTest.php {linenos=table,hl_lines=[13,14]}
<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Log;

class ExampleTest extends TestCase
{

    protected function setUp(): void
    {
        parent::setUp();
        Log::debug('Start ' . __CLASS__);
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $this->assertTrue(true);
    }
}
```

## 参考
* <a href="https://readouble.com/laravel/8.x/ja/testing.html#creating-tests" target="_blank" rel="nofollow noopener">テスト: テストの準備 8.x Laravel</a>
