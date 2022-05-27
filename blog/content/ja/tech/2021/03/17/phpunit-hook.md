---
title: "PHPUnit テスト実行時に利用可能なフックインターフェイス"
date: 2021-03-17T18:00:00+09:00
description: "PHPUnit を拡張してテスト実行時にテストの成功や失敗、エラー、終了などをフックするインターフェイスを実装する"
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

# PHPUnit テスト実行時に利用可能なフックインターフェイス

PHPUnit を拡張してテスト実行時にテストの成功や失敗、エラー、終了などをフックするインターフェイスを実装する。

## phpunit.xmlに追加

```phpunit.xml``` にextensionを追加する
<a href="https://phpunit.readthedocs.io/ja/latest/configuration.html#appendixes-configuration-extensions" target="_blank" rel="nofollow noopener">TestRunner エクステンションの組み込み</a>

``` xml:phpunit.xml {linenos=table,hl_lines=[4,5]}
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/7.1/phpunit.xsd">
    <extensions>
        <!-- フック用ファイルのパス -->
        <extension class="Tests\Extension\TestHooksExtension"/>
    </extensions>
</phpunit>
```

## フック用ファイルの作成

PHPUnit 実行時のフックするためのファイル作成。
使用可能なフックインターフェイスを実装した例です。
<a href="https://phpunit.readthedocs.io/ja/latest/extending-phpunit.html#extending-phpunit-hooks" target="_blank" rel="nofollow noopener">利用可能なフックインターフェイス</a>

``` php:Tests\Extension\TestHooksExtension.php {linenos=table}
<?php

namespace Tests\Extension;

use PHPUnit\Runner\AfterIncompleteTestHook;
use PHPUnit\Runner\AfterLastTestHook;
use PHPUnit\Runner\AfterRiskyTestHook;
use PHPUnit\Runner\AfterSkippedTestHook;
use PHPUnit\Runner\AfterSuccessfulTestHook;
use PHPUnit\Runner\AfterTestErrorHook;
use PHPUnit\Runner\AfterTestFailureHook;
use PHPUnit\Runner\AfterTestHook;
use PHPUnit\Runner\AfterTestWarningHook;
use PHPUnit\Runner\BeforeFirstTestHook;
use PHPUnit\Runner\BeforeTestHook;

class TestHooksExtension implements  AfterIncompleteTestHook,
AfterRiskyTestHook,
AfterSkippedTestHook,
AfterSuccessfulTestHook,
AfterTestErrorHook,
AfterTestFailureHook,
AfterTestWarningHook,
BeforeFirstTestHook,
BeforeTestHook,
AfterTestHook,
AfterLastTestHook
{
    /**
     * @interface AfterIncompleteTestHook
     */
    public function executeAfterIncompleteTest(string $test, string $message, float $time): void{
        // AfterIncompleteTestHook
        // テスト未完成
    }

    /**
     * @interface AfterRiskyTestHook
     */
    public function executeAfterRiskyTest(string $test, string $message, float $time): void{
        // AfterRiskyTestHook
        // テスト危険
    }

    /**
     * @interface AfterSkippedTestHook
     */
    public function executeAfterSkippedTest(string $test, string $message, float $time): void{
        // AfterSkippedTestHook
        // テストスキップ
    }

    /**
     * @interface AfterSuccessfulTestHook
     */
    public function executeAfterSuccessfulTest(string $test, float $time): void{
        // AfterSuccessfulTestHook
        // テスト成功
    }

    /**
     * @interface AfterTestErrorHook
     */
    public function executeAfterTestError(string $test, string $message, float $time): void{
        // AfterTestErrorHook
        // テストエラー
    }

    /**
     * @interface AfterTestFailureHook
     */
    public function executeAfterTestFailure(string $test, string $message, float $time): void{
        // AfterTestFailureHook
        // テスト失敗
    }

    /**
     * @interface AfterTestWarningHook
     */
    public function executeAfterTestWarning(string $test, string $message, float $time): void{
        // AfterTestWarningHook
        // テスト警告
    }
}
```

上記ファイルを読み込ませた状態で実行すると各種イベントをフックできます。
そのため、例えばテスト終了後やエラー時にチャットに通知するなどが可能になります。
