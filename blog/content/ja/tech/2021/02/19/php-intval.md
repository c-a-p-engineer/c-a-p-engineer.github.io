---
title: "【PHP】int型でオーバーフロー"
date: 2021-02-19T12:00:00+09:00
description: "PHPは動的型付けのため、数値がオーバーフローを起こさないと考えられています。ただし、条件によっては発生するので危険なため覚えておくのが良いでしょう。"
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

# PHP の int最大値
PHP の int型の最大値は32bit環境では2147483647、64bit環境では9223372036854775808となります。
プログラム言語によりますが int型で宣言されているものが int型の桁数を超えた場合にオーバーフローが発生します。
でも、PHPは動的型付け言語のためint型の最大値を超えた場合は自動的に float型になります。

## 確認環境
{{< alert theme="info" >}}
PHP Version:8.0.1
{{< /alert >}}

## 通常の動作
``` php {linenos=table}
<?php
// 桁数が多いため32bit版での説明
$max = PHP_INT_MAX; // 2147483647
var_dump($max);
var_dump($max + 1);
```

実行結果
```
int(2147483647)
float(2147483648) 
```

実行すると自動的に float型に切り替わってしまいます。
ですがPHPでもオーバーフローが発生する場合があるのです。
ちなみに**PHP_INT_MAX**はその環境での int型最大値を取得してくれます。

## オーバーフロー
オーバーフローするパターンです。

### 配列キー
配列の数値キーが int型最大値を超えた場合、オーバーフローします。

``` php {linenos=table}
<?php
$hoge = array(PHP_INT_MAX => "MAX", PHP_INT_MAX + 1 => "OVER FLOW");
var_dump($hoge);
```

実行結果
```
array(2) {
	[2147483647]=> string(3) "MAX"
	[-2147483648]=> string(9) "OVER FLOW"
}
```

結果は上記の通りになってしまいます。
なので配列の数値キーを使う場合はお気をつけ下さい。

### intval関数
intval関数を使用した際に、int型の最大値を超えた float型の値を、強制的に int型にするため発生します。
<a href="https://www.php.net/manual/ja/function.uniqid.php" target="_blank" rel="nofollow noopener">PHP: intval - Manual</a>

``` php {linenos=table}
<?php
var_dump(intval(PHP_INT_MAX));
var_dump(intval(PHP_INT_MAX + 1));
```

実行結果
```
int(2147483647)
int(-2147483648)
```

結果はオーバーフローしてしまいます。
強制的に int型にした時にオーバーフローが発生してしまいます。

## 注意
パターンによってはオーバーフローも発生することがあるのでご注意ください。
