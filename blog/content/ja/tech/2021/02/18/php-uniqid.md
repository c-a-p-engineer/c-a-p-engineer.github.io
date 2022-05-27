---
title: "【PHP】uniqidの危険性"
date: 2021-02-18T09:00:00+09:00
description: "PHPではuniqidという一意のIDを生成するという意味の名を持つ関数が存在します。ですがこれを安易に使用するととても危険です。"
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

# uniqidの危険性
PHPでは ```uniqid``` という一意のIDを生成するという意味の名を持つ関数が存在します。
ですがこれを安易に使用するととても危険です。
<a href="https://www.php.net/manual/ja/function.uniqid.php" target="_blank" rel="nofollow noopener">PHP: uniqid - Manual</a>

## 確認環境
{{< alert theme="info" >}}
PHP Version:8.0.1
{{< /alert >}}

## どこが危険なの？
> 一意なIDを生成する

マニュアルを読んでいると下記のような説明があります。
{{< notice warning >}}
**警告**
この関数は、戻り値の一意性を保証するものではありません。 ほとんどのシステムは、NTP などでシステムクロックを調整するので、 システム時刻は絶えず変更されます。 したがって、この関数がプロセス/スレッドの一意の ID を返さない可能性があります。 一意性を高めるには、more_entropy を使用してください。
 {{< /notice >}}

### uniqidの生成方法
```uniqid``` のPHPのソース側を見てもらえればわかるのですが、IDを生成する際にマイクロ秒の値を使用しています。
<a href="https://github.com/php/php-src/blob/master/ext/standard/uniqid.c" target="_blank" rel="nofollow noopener">php-src/uniqid.c at master · php/php-src</a>

そのため、全く同じマイクロ秒で処理を行われた場合に一意のIDになりません。
実際にここに記載されている人はマシンスペックが凄いのか全て同じIDが出力されたようです。
<a href="https://www.php.net/manual/ja/function.uniqid.php#94959" target="_blank" rel="nofollow noopener">PHP: uniqid - Manual#hackan at gmail dot com</a>

## 本当に一意のID
簡単なのがUUIDを使う。
<a href="https://ja.wikipedia.org/wiki/UUID" target="_blank" rel="nofollow noopener">UUID - Wikipedia</a>

最近のFWではUUIDの生成をサポートしているので使用するのが良いでしょう。
LaravelではUUIDは ```Str::uuid()``` で生成出来ます。
<a href="htthttps://readouble.com/laravel/8.x/ja/helpers.html#method-str-uuid" target="_blank" rel="nofollow noopener">Str::uuid</a>
### 一意になるように作る

普通にこれだけを実行してもわかるのですが近似値になります。
マシンスペックが早く、ナノ秒単位で処理が行われたら同じ値になります。
``` php {linenos=table}
<?php
// Test
for($i = 0; $i < 20; $i++) {
    echo uniqid() . PHP_EOL;
}
```

サンプルとしてランダムな文字列、UUIDの生成の2種類を用意しました。

#### ランダムな文字列
先程の同じIDが出力されると例に出したリンクですがこの中で行っています。
<a href="https://www.php.net/manual/ja/function.uniqid.php#94959" target="_blank" rel="nofollow noopener">PHP: uniqid - Manual#hackan at gmail dot com</a>

``` php {linenos=table}
<?php
function uniqidReal($lenght = 13) {
    // uniqid gives 13 chars, but you could adjust it to your needs.
    if (function_exists("random_bytes")) {
        $bytes = random_bytes(ceil($lenght / 2));
    } elseif (function_exists("openssl_random_pseudo_bytes")) {
        $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
    } else {
        throw new Exception("no cryptographically secure random function available");
    }
    return substr(bin2hex($bytes), 0, $lenght);
}

// Test
echo "uniqid() \t uniqidReal()", PHP_EOL;
for($i = 0; $i < 20; $i++) {
    echo uniqid(), "\t", uniqidReal(), PHP_EOL;
}
```

試してみたましたが出力結果は以下のように ```uniqid``` 使用側は近似値、 作った```uniqidReal()``` はランダムになりました。
```
uniqid() 	 uniqidReal()
602ddd5025c24	e37315f1b880e
602ddd5025c35	63c429d4047b3
602ddd5025c3c	80ab5f4ec5a1b
602ddd5025c44	4a4ef9ac6a371
602ddd5025c4b	87fc41a8e0575
602ddd5025c52	f8a7f5196133f
602ddd5025c59	e7e91230587b9
602ddd5025c60	5992e6e7220d7
602ddd5025c67	7a17f778c1b8d
602ddd5025c6e	612ed5ab84cc3
602ddd5025c75	6a70ab07fca9d
602ddd5025c7c	96c24bc181230
602ddd5025c83	1978ad8de70e5
602ddd5025c8a	9a8d980520480
602ddd5025c91	1432de3d8f3e1
602ddd5025c98	e397181f3efd6
602ddd5025ca0	5eb5c937f9c8a
602ddd5025ca7	22b1011ea59d9
602ddd5025cae	2c8a42f06a5fb
602ddd5025cb5	a2a081d824f2d


```

#### UUIDの生成
UUIDの生成サンプル
<a href="https://www.php.net/manual/ja/function.uniqid.php#120123" target="_blank" rel="nofollow noopener">PHP: uniqid - Manual#Andrew Moore</a>

``` php {linenos=table}
<?php
class UUID {
  public static function v3($namespace, $name) {
    if(!self::is_valid($namespace)) return false;

    // Get hexadecimal components of namespace
    $nhex = str_replace(array('-','{','}'), '', $namespace);

    // Binary Value
    $nstr = '';

    // Convert Namespace UUID to bits
    for($i = 0; $i < strlen($nhex); $i+=2) {
      $nstr .= chr(hexdec($nhex[$i].$nhex[$i+1]));
    }

    // Calculate hash value
    $hash = md5($nstr . $name);

    return sprintf('%08s-%04s-%04x-%04x-%12s',

      // 32 bits for "time_low"
      substr($hash, 0, 8),

      // 16 bits for "time_mid"
      substr($hash, 8, 4),

      // 16 bits for "time_hi_and_version",
      // four most significant bits holds version number 3
      (hexdec(substr($hash, 12, 4)) & 0x0fff) | 0x3000,

      // 16 bits, 8 bits for "clk_seq_hi_res",
      // 8 bits for "clk_seq_low",
      // two most significant bits holds zero and one for variant DCE1.1
      (hexdec(substr($hash, 16, 4)) & 0x3fff) | 0x8000,

      // 48 bits for "node"
      substr($hash, 20, 12)
    );
  }

  public static function v4() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',

      // 32 bits for "time_low"
      mt_rand(0, 0xffff), mt_rand(0, 0xffff),

      // 16 bits for "time_mid"
      mt_rand(0, 0xffff),

      // 16 bits for "time_hi_and_version",
      // four most significant bits holds version number 4
      mt_rand(0, 0x0fff) | 0x4000,

      // 16 bits, 8 bits for "clk_seq_hi_res",
      // 8 bits for "clk_seq_low",
      // two most significant bits holds zero and one for variant DCE1.1
      mt_rand(0, 0x3fff) | 0x8000,

      // 48 bits for "node"
      mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
  }

  public static function v5($namespace, $name) {
    if(!self::is_valid($namespace)) return false;

    // Get hexadecimal components of namespace
    $nhex = str_replace(array('-','{','}'), '', $namespace);

    // Binary Value
    $nstr = '';

    // Convert Namespace UUID to bits
    for($i = 0; $i < strlen($nhex); $i+=2) {
      $nstr .= chr(hexdec($nhex[$i].$nhex[$i+1]));
    }

    // Calculate hash value
    $hash = sha1($nstr . $name);

    return sprintf('%08s-%04s-%04x-%04x-%12s',

      // 32 bits for "time_low"
      substr($hash, 0, 8),

      // 16 bits for "time_mid"
      substr($hash, 8, 4),

      // 16 bits for "time_hi_and_version",
      // four most significant bits holds version number 5
      (hexdec(substr($hash, 12, 4)) & 0x0fff) | 0x5000,

      // 16 bits, 8 bits for "clk_seq_hi_res",
      // 8 bits for "clk_seq_low",
      // two most significant bits holds zero and one for variant DCE1.1
      (hexdec(substr($hash, 16, 4)) & 0x3fff) | 0x8000,

      // 48 bits for "node"
      substr($hash, 20, 12)
    );
  }

  public static function is_valid($uuid) {
    return preg_match('/^\{?[0-9a-f]{8}\-?[0-9a-f]{4}\-?[0-9a-f]{4}\-?'.
                      '[0-9a-f]{4}\-?[0-9a-f]{12}\}?$/i', $uuid) === 1;
  }
}

// Usage
// Named-based UUID.
$v3uuid = UUID::v3('1546058f-5a25-4334-85ae-e68f2a44bbaf', 'SomeRandomString');
$v5uuid = UUID::v5('1546058f-5a25-4334-85ae-e68f2a44bbaf', 'SomeRandomString');

// Pseudo-random UUID
$v4uuid = UUID::v4();

// Output
echo 'UUID:v3:' . $v3uuid . PHP_EOL;
echo 'UUID:v4:' . $v4uuid . PHP_EOL;
echo 'UUID:v5:' . $v5uuid . PHP_EOL;
```

## 最後に
PHPマニュアルを見てこういった罠に気をつけてください。