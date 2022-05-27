---
title: "【PHP】柔らかいプロパティの扱い __set __get の罠"
date: 2021-11-25T09:00:00+09:00
LastMod: 2021-11-26T09:00:00+09:00
description: "柔軟な PHP の柔らかいプロパティの扱いでマジックメソッド __set __get 罠"
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

# 【PHP】柔らかいプロパティの扱い __set __get の罠
柔軟な PHP の柔らかいプロパティの扱いでマジックメソッド `__set` `__get` の罠があります。
<a href="https://www.php.net/manual/ja/language.oop5.magic.php" target="_blank" rel="nofollow noopener">PHP: マジックメソッド - Manual</a>

## 確認環境
* PHP 7.3.0-8.0.13
  * https://3v4l.org/ 上で確認

## PHPはとても柔軟
PHP はとても柔軟な言語で以下のように宣言していないプロパティを実行しても柔軟に吸収をしてくれます。
```php
<?php
class Hoge{
}

$hoge = new Hoge();
$hoge->piyo = 'piyo';
var_dump($hoge);
```

出力結果
```
object(Hoge)#1 (2) {
  ["piyo"]=>
  string(4) "piyo"
}
```
## __get __setを使ってみる
マジックメソッドの `__get` `__set` を使用してみます。
* `__get` はクラスにないプロパティを取得する際に呼ばれます。
* `__set` はクラスにないプロパティを設定する際に呼ばれます。

```php
<?php
class Hoge
{
    public function __set($name, $value)
    {
        $this->$name = $value;
    }
    
    public function __get($name)
    {
        if(isset($this->$name)) {
            return $this->$name;
        }
        return null;
    }
}

$hoge = new Hoge();
$hoge->piyo = 'piyo';
var_dump($hoge);
```

出力結果
```php
object(Hoge)#1 (2) {
  ["piyo"]=>
  string(4) "piyo"
}
```

## __set __get の罠
マジックメソッドの `__get` `__set` を使用はなんにも問題ないように見えますが…
```php
<?php
class Hoge
{
    public function __set($name, $value)
    {
        $this->$name = $value;
    }
    
    public function __get($name)
    {
        if(isset($this->$name)) {
            return $this->$name;
        }
        return null;
    }
}

$hoge = new Hoge();
$hoge->piyo = 'piyo';
$hoge->fuga[0] = 'test';
var_dump($hoge);
```

こうすると `Notice` が出てきます。
どこかしら不具合が出る可能性が高くなるので気をつけてください。

この場合、先に `__get` が動いてしまい、存在しないクラスにないプロパティ `fuga` の配列を見ようとしてエラーが出ます。
おそらく**配列の場合は配列のキーを主体にしている**ためだと思います。

## とても柔らかくしたい
柔軟なやり取りを行いたい場合は `__get` `__set` を使わないようするのが一番だと思われます。
```php
<?php
class Hoge
{
}

$hoge = new Hoge();
$hoge->piyo = 'piyo';
$hoge->fuga[0] = 'test';
var_dump($hoge);
```

```php
object(Hoge)#1 (2) {
  ["piyo"]=>
  string(4) "piyo"
  ["fuga"]=>
  array(1) {
    [0]=>
    string(4) "test"
  }
}
```