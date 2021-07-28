---
title: "PHPUnit のテスト用のテストサンプル"
date: 2021-03-19T15:00:00+09:00
description: "PHPUnit のテスト用のテストサンプル。PHPUnit の Error や Warning など色んなテスト結果出力させます。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- PHPUnit
- テスト
categories: 
- PHP
image: images/thumbnail/php.png
---

# PHPUnit のテスト用のテストサンプル

以前の <a href="/blog/2021-03-17-phpunit-hook/" target="_blank">PHPUnit テスト実行時に利用可能なフックインターフェイス</a> のテスト用のテストサンプルを作りました。
これは PHPUnit のフックインターフェイスのテスト用のテストサンプル。
PHPUnit の Error や Warning など色んなテスト結果出力させます。

## 確認環境
* PHP 7.4
* PHPUnit 9.5

## テストファイル作成
以下のテスト結果が発生するようにしています。
* 成功（Success）
* 未実装（Incomplete）
* 危険（Risky）
* スキップ（）
* エラー（Error）
* 失敗（Failure）
* 警告（Warning）

``` php:Tests/ExampleTest.php {linenos=table}
<?php

namespace Tests;

use Exception;
use PHPUnit\Framework\Assert;

class ExampleTest extends TestCase
{
    /**
     * 成功テスト
     * 
     * @test
     */
    public function testSuccess(){
        $this->assertTrue(true);
    }

    /**
     * 未完成テスト
     * 
     * @test
     */
    public function testIncomplete(){
        $this->markTestIncomplete('Incomplete');
    }

    /**
     * 危険テスト
     * 
     * @test
     */
    public function testRisky(){
        $this->markAsRisky();
    }

    /**
     * スキップテスト
     * 
     * @test
     */
    public function testSkipp(){
        $this->markTestSkipped('Skipp');
    }

    /**
     * エラーテスト
     * 
     * @test
     */
    public function testError(){
        throw new Exception('Error');
    }

    /**
     * 失敗テスト
     * 
     * @test
     */
    public function testFailure(){
        $this->assertTrue(false);
    }

    /**
     * 警告テスト
     * 
     * @test
     */
    public function testWarning(){
        Assert::assertXmlStringEqualsXmlFile('example.file', null);
    }
}
```

## PHPUnit実行

``` bash:実行コマンド
phpunit Tests/ExampleTest.php
```

``` bash
.IRSEFW                                                             7 / 7 (100%)

Time: 00:10.407, Memory: 12.00 MB

There was 1 error:

1) Tests\ExampleTest::testError
Exception: error

/var/www/php/tests/ExampleTest.php:52

--

There was 1 warning:

1) Tests\Example::testWarning
assertNotIsWritable() is deprecated and will be removed in PHPUnit 10. Refactor your code to use assertIsNotWritable() instead.

--

There was 1 failure:

1) Tests\ExampleTest::testFailure
Failed asserting that false is true.

/var/www/php/tests/ExampleTest.php:61

--

There was 1 risky test:

1) Tests\ExampleTest::testRisky
This test did not perform any assertions

/var/www/php/tests/ExampleTest.php:33

ERRORS!
Tests: 7, Assertions: 3, Errors: 1, Failures: 1, Warnings: 1, Skipped: 1, Incomplete: 1, Risky: 1.
```


これで色んな種別の結果が出てきます。