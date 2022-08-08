---
title: "【Laravel】Command を Contoroller や Command から実行する方法"
date: 2022-08-09T08:00:00+09:00
description: "Laravel で Command を Contoroller や Command から実行する方法メモ"
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

# 【Laravel】Command を Contoroller や Command から実行する方法
Laravel で Command を Contoroller や Command から実行する方法メモ。
諸事情で Controller や 別Command から実行するためのメモです。

## Command 呼び出し方法
以下の3つの方法があります。
* `exec()`
* `$this->call()`
* `Artisan::call()`


### Artisan::call()
Laravelの公式に記載されています。
<a href="https://readouble.com/laravel/8.x/ja/artisan.html#programmatically-executing-commands" target="_blank" rel="nofollow noopener">Laravel 8.x Artisanコンソール#プログラムからのコマンド実行</a>

ControllerやCommandから実行することが可能で返り値を受け取ることもできます。
この方法を利用すると**呼び出された側のコメントなどの出力がされません**。
```php
use \Artisan;

$result = Artisan::call('command:sample', [
    '--argument' => 'hoge',
]);
dd($result);
```

### $this->call()
Laravelの公式に記載されています。
<a href="https://readouble.com/laravel/8.x/ja/artisan.html#calling-commands-from-other-commands" target="_blank" rel="nofollow noopener">Laravel 8.x Artisanコンソール#他コマンドからのコマンド呼び出し</a>

**Commandからのみしか利用ができません。**
この方法を利用すると**呼び出された側のコメントなどの出力がされます**。
```php
$result = $this->call('command:sample', [
    '--argument' => 'hoge',
]);
dd($result);
```

### exec
`exec` はコマンドを実行する関数です。
<a href="https://www.php.net/manual/ja/function.exec.php" target="_blank" rel="nofollow noopener">PHP: exec - Manual</a>

ただし、そのため引数を適当に渡したりするとOSコマンドインジェクションなどの危険性があるのでオススメしません。
また `exec` の場合はLaravelを1から実行するため他の方法と比べて遅くなります。
```php
exec('php artisan command:sample --argument=hoge')
```