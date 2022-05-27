---
title: "【PHP】mkdir でファイル作成時に複数階層を一気に作る"
date: 2021-07-29T08:00:00+09:00
description: "PHPで mkdir でファイルを作成する際に複数階層のディレクトリを一気に作る方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】mkdir でファイル作成時に複数階層を一気に作る
PHPで mkdir でファイルを作成する際に複数階層のディレクトリを一気に作る方法メモ

## サンプルコード
これだけで可能です。
```php
<?php
mkdir('/test1/test2', 0777, true);
```

第一引数の `$directory` に作成したディレクトリを指定。
第三引数の `$recursive` に `true` を指定すると途中のディレクトリがない場合に作成してくれます。
```php
mkdir(
  string $directory,
  int $permissions = 0777,
  bool $recursive = false,
  resource $context = ?
): bool
```


## 参考
* <a href="https://www.php.net/manual/ja/function.mkdir.php" target="_blank" rel="nofollow noopener">PHP: mkdir - Manual</a>
