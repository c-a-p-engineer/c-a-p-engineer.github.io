---
title: "【PHPUnit】メソッド内で連続でPOST、GETなどの送信すると前のログイン情報を引き継いでしまう？"
date: 2021-06-01T10:00:00+09:00
description: "PHPUnitでメソッド内で連続でPOST、GETなどの送信すると前のログイン情報を引き継いでしまう？現象を確認しました。"
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

# 連続でPOST、GETなどの送信すると前のログイン情報を引き継いでしまう？
`PHPUnit` でメソッド内で連続で `POST`、`GET`などの送信すると前のログイン情報を引き継いでしまう？現象を確認しました。
テストの都合上 `PHPUnit` で1メソッド内で連続で `POST`、`GET` など行いました。
※通常ではログイン状態確認テストと未ログイン状態確認テストなど別に書くと思われますが特殊なケースです。

そうすると何故か以下のような現象を確認しました。
・未ログインで送信 → ログイン送信 → 未ログインで接続
・ログイン送信 → 未ログイン送信 → ログインで接続

なぜか最初に送信した状態をを引き継いでいました。

## 確認環境
* PHP 7.4
* PHPUnit 9,5
* Laravel 6.2

## 失敗コード
ログイン後のステータスコードを確認後に、ログインしてステータスを確認するというテストです。
以下のようなコードですと何故かログアウトされていませんでした。

``` php:Tests\Feature\Sample\SampleTest.php
<?php 

namespace Tests\Feature\Sample;

use PHPUnit\Framework\TestCase;

class SampleTest extends TestCase
{
    /**
     * @test
     */
    public function getTest()
    {
        
        // ログイン
        Auth::loginUsingId(1);
        // ユーザページ
        $response = $this->get('/user');
        // ユーザページなのでログインでは200
        $response->assertStatus(200);

        // ログアウト
        Auth::logout();
        // ユーザページ
        $response = $this->get('/user');
        // ユーザページなので未ログインでは403
        $response->assertStatus(403);
    }
}
```
何故かログアウトしてもログイン状態として判定されて `403` にならずに `200` になって失敗します。

## サンプルコード
何故かログアウトしてもログイン状態として判定されるため、色々考えてセッション破棄などもしましたがテストの中で保存しているようです。
ただこれを特定するのも時間がかかるため少々力技で解決しました。

``` php:Tests\Feature\Sample\SampleTest.php
<?php 

namespace Tests\Feature\Sample;

use PHPUnit\Framework\TestCase;

class SampleTest extends TestCase
{
    /**
     * @test
     */
    public function getTest()
    {
        
        // ログイン
        Auth::loginUsingId(1);
        // ユーザページ
        $response = $this->get('/user');
        // ユーザページなのでログインでは200
        $response->assertStatus(200);

        // 初期化
        $this->setUp();

        // ログアウト
        Auth::logout();
        // ユーザページ
        $response = $this->get('/user');
        // ユーザページなので未ログインでは403
        $response->assertStatus(403);
    }
}
```

`setUp()` を使用して初期化します。
こうすることによってテストの初期化が走ってどこかに残ったセッションのデータを破棄します。

## 参考
* <a href="https://phpunit.readthedocs.io/ja/latest/fixtures.html#teardown-setup" target="_blank" rel="nofollow noopener">4. フィクスチャ &mdash; PHPUnit latest Manual</a>