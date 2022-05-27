---
title: "【PHP】緩やかな比較"
date: 2021-02-21T11:00:00+09:00
description: "PHPの緩やかな比較な比較はバグのもとになりやすいのでご注意ください。"
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

# PHP の緩やかな比較
PHP は比較演算子の ```==``` を使用した際に緩やかな比較を行います。
この緩やかな比較はとても間違いやすくて曖昧になりやすいため気をつけて使わなければいけません。

比較する際に数値の ```0``` と 数字の ```'0'``` を比較して ```true``` になるようになっています。
これはとてもありがたいのですが、バグの元になりやすいです。
<a href="https://www.php.net/manual/ja/types.comparisons.php#types.comparisions-loose" target="_blank" rel="nofollow noopener">PHP: PHP 型比較表 - Manual</a>

## == による緩やかな比較表
|         | true  | false | 1     | 0     | -1    | "1"   | "0"   | "-1"  | null  | array() | "php" | ""    | 
| ------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ------- | ----- | ----- | 
| true    | true  | false | true  | false | true  | true  | false | true  | false | false   | true  | false | 
| false   | false | true  | false | true  | false | false | true  | false | true  | true    | false | true  | 
| 1       | true  | false | true  | false | false | true  | false | false | false | false   | false | false | 
| 0       | false | true  | false | true  | false | false | true  | false | true  | false   | true  | true  | 
| -1      | true  | false | false | false | true  | false | false | true  | false | false   | false | false | 
| "1"     | true  | false | true  | false | false | true  | false | false | false | false   | false | false | 
| "0"     | false | true  | false | true  | false | false | true  | false | false | false   | false | false | 
| "-1"    | true  | false | false | false | true  | false | false | true  | false | false   | false | false | 
| null    | false | true  | false | true  | false | false | false | false | true  | true    | false | true  | 
| array() | false | true  | false | false | false | false | false | false | true  | true    | false | false | 
| "php"   | true  | false | false | true  | false | false | false | false | false | false   | true  | false | 
| ""      | false | true  | false | true  | false | false | false | false | true  | false   | false | true  | 

とても分かりづらい表になっています。

## 条件式の注意
条件式では緩やかな比較を知らず識らずのうちに使用する人が多いです。

### if
例えばif文なのですが ```bool``` 型なら良いのですがこういったif文に意識せずに使うと事故の元になります。
とりあえず実際に曖昧な比較を行って見ます。

``` php {linenos=table}
<?php
$hoges = [
    true,
    false,
    1,
    0,
    -1,
    "1",
    "0",
    "-1",
    null,
    array(),
    "php",
    "",
];

foreach ( $hoges as $value ){
    $result = null;
    if ( $value ) {
        $result = true;
    } else {
        $result = false;
    }

    var_dump($value, $result);
    echo '----' . PHP_EOL;
}
```

実行結果
{{< expand "if 実行結果" >}}
``` bash
bool(true)
bool(true)
----
bool(false)
bool(false)
----
int(1)
bool(true)
----
int(0)
bool(false)
----
int(-1)
bool(true)
----
string(1) "1"
bool(true)
----
string(1) "0"
bool(false)
----
string(2) "-1"
bool(true)
----
NULL
bool(false)
----
array(0) {
}
bool(false)
----
string(3) "php"
bool(true)
----
string(0) ""
bool(false)
----
```
{{< /expand >}}

とてもわかりづらいものになりました。
これは間違いやすく保守性が悪くなります。
また**行いたい処理の意図**としての可読性が落ちます。
（文字数は確かに減りますが…

```if($hoge)``` は基本的に ```bool``` 型以外では使うことはおすすめしません。

### switch
switchに関してはさらに辛い状況です。
こちらは緩やかな比較しか出来ないので気をつけてください。

``` php {linenos=table}
<?php
$hoges = [
    true,
    false,
    1,
    0,
    -1,
    "1",
    "0",
    "-1",
    null,
    array(),
    "php",
    "",
];

foreach ( $hoges as $value ){
    switch ($value) {
        case "php":
            var_dump($value, 'php');
            echo '----' . PHP_EOL;
            break;
        case true:
            var_dump($value, true);
            echo '----' . PHP_EOL;
            break;
        case false:
            var_dump($value, false);
            echo '----' . PHP_EOL;
            break;
        default:
            echo 'default' . PHP_EOL;
            break;
    }
}
```

実行結果
{{< expand "switch 実行結果" >}}
``` bash {linenos=table,hl_lines=[1-2]}
bool(true)
string(3) "php"
----
bool(false)
bool(false)
----
int(1)
bool(true)
----
int(0)
bool(false)
----
int(-1)
bool(true)
----
string(1) "1"
bool(true)
----
string(1) "0"
bool(false)
----
string(2) "-1"
bool(true)
----
NULL
bool(false)
----
array(0) {
}
bool(false)
----
string(3) "php"
string(3) "php"
----
string(0) ""
bool(false)
----
```
{{< /expand >}}

あえて ```"php"``` という条件にしてみましたが案の定全然違う条件に引っかかりました。
```bool(true)``` が ```"php"``` の条件に引っかかります。

## 注意
緩やかな比較を意図せず使用するとバグのもとになるので気をつけてください。
厳密な比較を行いたい場合は ```===``` を使用してください。
ただし、今度は数値と数字の違いなどに気をつける必要が出てきます。
