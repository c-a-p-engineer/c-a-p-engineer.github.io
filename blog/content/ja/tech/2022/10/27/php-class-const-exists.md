---
title: "【PHP】クラス定数の存在チェック"
date: 2022-10-30T01:00:00+09:00
description: "PHPでクラス定数の存在チェックをする方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】クラス定数の存在チェック
PHPでクラス定数の存在チェックをする方法

## defined を使う
`defined` 関数を使用することでチェックが可能です。
```php
<?php
// Sample
class Sample
{
    const CONST_SAMPLE = 'sample';
}

// クラスを直接指定
if ( defined( 'Sample::CONST_SAMPLE' ) ){
    echo 'Sample::CONST_SAMPLE defined';
}

// クラス名の変数
$className = Sample::class;
if ( defined( "$className::CONST_SAMPLE" ) ){
    echo '$className::CONST_SAMPLE defined';
}

// クラスオブジェクト
$classObj = new $className();
if ( defined( get_class($classObj).'::CONST_SAMPLE' ) ){
    echo '$classObj::CONST_SAMPLE defined';
}
```

## 参考
* <a href="https://www.php.net/manual/ja/function.defined.php" target="_blank" rel="nofollow noopener">PHP: defined - Manual</a>
* <a href="https://www.php.net/manual/ja/function.defined.php#120920" target="_blank" rel="nofollow noopener">PHP: defined - Manual#ASchmidt at Anamera dot net</a>