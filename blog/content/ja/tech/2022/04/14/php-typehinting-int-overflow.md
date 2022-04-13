---
title: "【PHP】引数にint型を指定しているとint型を超えた値を渡すとエラーになる"
date: 2022-04-13T02:50:00+09:00
description: "PHPで関数やメソッドにint型を指定しているとint型を超えた値を渡すとエラーになります。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
series: 
- PHPの罠
image: images/thumbnail/php.png
---

# 【PHP】引数にint型を指定しているとint型を超えた値を渡すとエラーになる
PHPで関数やメソッドにint型を指定しているとint型を超えた値を渡すとエラーになります。
`Argument #1 ($x) must be of type int, float given,` の原因と解決方法。

## エラーが発生しない
PHPは動的型付けなので引数がint型を指定されていてもstringやfloatをint型にして対応してくれます。
```php
<?php
function addition (int $x, int $y)
{
    echo $x + $y . PHP_EOL;
}

// int
addition(1, 2);
// string
addition("1", "2");
// float
addition(1.1, 2.2);
```

## エラーが発生するパターン
`int` 型を超える値を渡します。
```php
<?php
function addition (int $x, int $y)
{
    echo $x + $y . PHP_EOL;
}

// error
addition(PHP_INT_MAX + 1, 2);
```

そうすると以下のエラーが出ます。
```
PHP Fatal error:  Uncaught TypeError: addition(): Argument #1 ($x) must be of type int, float given,
```
これはint型を超えていてint型に変換できず、floatで渡されたと解釈された結果エラーが出ます。

## 解決方法
解決方法としては関数の引数の方をfloat型にすれば解決できます。
ただしどうしてもint型でなければいけない場合でint型を超える値が入ってしまう場合は引数を渡す前にチェックしてください。
```php
<?php
function addition(float $x, float $y)
{
    echo $x + $y . PHP_EOL;
}

addition(PHP_INT_MAX + 1, 2);
```

## 参考
* <a href="https://qiita.com/hnw/items/1edda557d8c144f0cd20" target="_blank" rel="nofollow noopener">PHP7調査(5)整数型の引数のオーバーフローがエラーになった - Qiita</a>
