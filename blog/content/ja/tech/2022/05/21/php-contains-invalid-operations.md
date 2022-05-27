---
title: "【PHP】PHP Fatal error: Constant expression contains invalid operations 解決方法"
date: 2022-05-21T13:30:00+09:00
description: "PHP Fatal error: Constant expression contains invalid operations が出たので解決方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】PHP Fatal error: Constant expression contains invalid operations 解決方法
`PHP Fatal error: Constant expression contains invalid operations` 解決方法メモ

## 現象
以下のようなコードの場合に `PHP Fatal error:  Constant expression contains invalid operations` というエラーが発生します。
```php
<?php
class Now {
    public $now = time();
}

$class = new Now();
var_dump($class->now);
```

## 原因
原因はプロパティ宣言時に `time()` を実行していることです。
> 宣言時に初期値を設定することもできますが、 初期値は 定数 値でなければなりません。
<a href="https://www.php.net/manual/ja/language.oop5.properties.php" target="_blank" rel="nofollow noopener">PHP: プロパティ - Manual</a>

なので **プロパティ宣言時に関数やクラス、メソッドの実行が出来ません。**

## 対処
対処としてはコンストラクタ内で初期値を代入することです。
これによってプロパティに関数やクラスの関数やクラス、メソッドの実行値が入ります。
```php
<?php
class Now {
    public $now;

    public function __construct(){
        // 初期値を代入
        $this->now = time();
    }
}

$class = new Now();
var_dump($class->now);
```
