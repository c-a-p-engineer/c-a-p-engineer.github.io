---
title: "【PHP】関数 empty は罠"
date: 2021-06-04T10:30:00+09:00
description: "PHPの関数 empty はとても使いやすく入力値の検査などに使いやすいですがこれが罠なんです。"
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

# 関数 empty は罠
PHPの関数 `empty` はとても使いやすく入力値の検査などに使いやすいですがこれが罠なんです。
・<a href="https://www.php.net/manual/ja/function.empty.php" target="_blank" rel="nofollow noopener">PHP: empty - Manual</a>

## empty の使いやすさ
PHPマニュアルにある `empty` の説明はこれだけです。
> empty — 変数が空であるかどうかを検査する

``` php:empty.php
<?php
echo '未定義' . PHP_EOL;
var_dump(empty($hoge));
echo PHP_EOL;

echo '入力なし（文字数0）' . PHP_EOL;
var_dump(empty(''));
echo PHP_EOL;

echo 'NULL' . PHP_EOL;
var_dump(empty(null));
echo PHP_EOL;

echo '値あり' . PHP_EOL;
var_dump(empty('値あり'));
echo PHP_EOL;
```

出力結果

```php
未定義
bool(true)

入力なし（文字数0）
bool(true)

NULL
bool(true)

値あり
bool(false)
```

このように変数が未定義、文字数0や `null` の場合に `true` を返します。
わざわざ、変数未定義チェック、`null` チェック、文字数チェックなどを行う必要がなくとても簡単にチェックをしてくれます。
これだけだと **入力値がないものをに対してtrue** を返す関数だと思ってしまいます。

## emptyの罠
今度は数値で確認してみます。

``` php:empty.php
<?php
echo '0' . PHP_EOL;
var_dump(empty(0));
echo PHP_EOL;

echo '1' . PHP_EOL;
var_dump(empty(1)));
echo PHP_EOL;

echo '-1' . PHP_EOL;
var_dump(empty(-1));
echo PHP_EOL;

echo '0000' . PHP_EOL;
var_dump(empty('0000'));
echo PHP_EOL;
```

出力結果

```php
0
bool(true)

1
bool(false)

-1
bool(false)

0000
bool(false)
```

何か挙動が怪しいです。
`0` で `true` (空)扱いになります。

### emptyの罠の原因
`empty` 関数について、内部で以下のように動いているためです。
表を見ていると `false` にも `true` や空の配列に `true` を返したりします。

|式|empty()|
|:----|:----|
|$x = "";|true|
|$x = null;|true|
|var $x;|true|
|$x が未定義|NULL|true|
|$x = array();|true|
|$x = array('a', 'b');|false|
|$x = false;|true|
|$x = true;|false|
|$x = 1;|false|
|$x = 42;|false|
|$x = 0;|true|
|$x = -1;|false|
|$x = "1";|false|
|$x = "0";|true|
|$x = "-1";|false|
|$x = "php";|false|
|$x = "true";|false|
|$x = "false";|false|


<a href="https://www.php.net/manual/ja/types.comparisons.php" target="_blank" rel="nofollow noopener">PHP: PHP 型の比較表 - Manual</a>

## 対策
対策としては `empty` の表を理解して使用する。

もしくはちゃんと意図した動作を明確に書くことです。
nullチェックでは `is_null`、文字数チェックでは `strlen`など行いたい処理に合わして明確に処理を書いてください。

個人的な見解ですが `empty` だけだと処理の意図が伝わりづらい事があるので出来るだけ処理を明確に書く方がメンテナンス性が高い気がします。