---
title: "【PHP】サブフォルダ内のファイルをまとめて取得する"
date: 2021-03-20T10:00:00+09:00
description: "PHP サブフォルダ内のファイルをまとめて取得する"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# PHP サブフォルダ内のファイルを纏めて取得する
PHP サブフォルダ内のファイルをまとめて取得する。

## ファイルの取得
以下の2つを使用します。
* <a href="https://www.php.net/manual/ja/class.recursivedirectoryiterator.php" target="_blank" rel="nofollow noopener">RecursiveIteratorIterator - Manual - PHP</a>
再帰的なイテレータの反復処理に使用します。 

* <a href="https://www.php.net/manual/ja/class.recursivedirectoryiterator.php" target="_blank" rel="nofollow noopener">RecursiveDirectoryIterator - Manual - PHP</a>
RecursiveDirectoryIterator は、 ファイルシステムのディレクトリを再帰的に反復処理するためのインターフェイスです。 

``` php:sample.php {linenos=table}
<?php
use FilesystemIterator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

function listFiles($dir){
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator(
            $dir,
            FilesystemIterator::SKIP_DOTS
            | FilesystemIterator::KEY_AS_PATHNAME
            | FilesystemIterator::CURRENT_AS_FILEINFO
        ), RecursiveIteratorIterator::LEAVES_ONLY
    );
 
    $list = [];
    foreach($iterator as $pathname => $info){
        $list[] = $pathname;
    }
    return $list;
}

//検索するディレクトリ
$dir = __DIR__;
var_dump(listFiles($dir));
```

実行結果
``` bash
array(4) {
  [0]=>
  string(9) "/hoge.txt"
  [1]=>
  string(14) "/hoge/hoge.txt"
  [2]=>
  string(9) "/piyo.txt"
  [3]=>
  string(14) "/piyo/piyo.txt"
}
```

* ``FilesystemIterator::SKIP_DOTS`` は ```.```, ```..``` をスキップします。
* ```FilesystemIterator::KEY_AS_PATHNAME``` で 配列の ```key``` にパス名が入るようになります。
* ```FilesystemIterator::CURRENT_AS_FILEINFO``` を設定すると ```$info``` に <a href="https://www.php.net/manual/ja/class.splfileinfo.php" target="_blank" rel="nofollow noopener">SplFileInfo</a>が入ります。
そうすると ```$info->getATime()``` を行うとファイルの最終アクセス時刻を取得することなど出来ます。