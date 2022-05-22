---
title: "【PHP】PHP Fatal error: Uncaught TypeError: Unsupported operand types 解決方法"
date: 2022-05-21T13:30:00+09:00
description: "PHP Fatal error: Uncaught TypeError: Unsupported operand types が出たので解決方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】Fatal error: Uncaught TypeError: Unsupported operand types 解決方法
`PHP Fatal error: Constant expression contains invalid operations` 解決方法メモ

## 現象
以下のようなコードの場合に `PHP Fatal error: Uncaught TypeError: Unsupported operand types` というエラーが発生します。
```php
<?php
$i = '';
echo $i + 1;
```

## 原因
型が合わないというエラーです。
今回の原因は `int` と `string` を足し算しようとしてるためです。
ちなみに今回のエラーは `7.2` 系から出るようになったようです。

`7.1` なら以下のエラーが出ていた模様。
```
Notice: A non well formed numeric value encountered in %s on line %d
Warning: A non-numeric value encountered in %s on line %d
```
<a href="https://www.php.net/manual/ja/migration71.other-changes.php" target="_blank" rel="nofollow noopener">PHP: プロパティ - Manual</a>

`5` 系から `7.0` 系の場合はエラーが出ずに暗黙的に `0` に変換されて `1` と表示されていた模様。

## 対処
対処としては `int` 型に変換すればいいだけです。
本来、**業務などなら数値チェックを行う必要**があると思いますので単純に型を変換すれば良いだけではない気はきます。
```php
<?php
$i = '';
echo (int)$i + 1;
```
