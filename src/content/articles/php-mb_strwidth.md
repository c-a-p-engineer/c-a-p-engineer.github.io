---
title: "【PHP】半角、全角を判断して文字幅を計算する　mb_strwidth"
date: 2022-05-28T14:30:00+09:00
description: "PHPで半角、全角を判断して文字幅を計算する mb_strwidth の使用方法。"
tags: []
categories: []
draft: false
legacySlug: php-mb_strwidth
image: "images/thumbnail/php.png"
---

# 【PHP】半角、全角を判断して文字幅を計算する　mb_strwidth
PHPで半角、全角を判断して文字幅を計算する mb_strwidth の使用方法。
<a href="https://www.php.net/manual/ja/function.mb-strwidth.php" target="_blank" rel="nofollow noopener">PHP: mb_strwidth - Manual</a>

## mb_strwidth を使用する
`mb_strwidth` を使用すると文字幅の計算ができます。
```php
mb_strwidth(string $string, ?string $encoding = null): int
```

## サンプル
英数字、半角カナ、全角文字、絵文字にも対応しています。
```php
<?php
var_dump(
    mb_strwidth('a'),                 // int(1)
    mb_strwidth('1'),                 // int(1)
    mb_strwidth("１"),                // int(2)
    mb_strwidth("あ"),                // int(2)
    mb_strwidth("ｱ"),                 // int(1)
    mb_strwidth("🥞"),               // int(2)
    mb_strwidth("パンケーキ🥞が3つ"), // int(17)
);
```

`mb_strwidth` の第二引数は省略すると内部の文字エンコーディングを使用します。
そのためエンコーディングがずれていると正確に取得できない事があります。

`mb_strwidth('SJISの文字列', 'SJIS-WIN')` などのよう第二引数を指定して対応が可能です。

## 注意点
以下の範囲外の文字列に関しては半角文字になるようなので記号など一部半角文字列として判定される可能性があります。
> 全角文字は次のとおりです。 U+1100-U+115F、 U+11A3-U+11A7、 U+11FA-U+11FF、 U+2329-U+232A、 U+2E80-U+2E99、 U+2E9B-U+2EF3、 U+2F00-U+2FD5、 U+2FF0-U+2FFB、 U+3000-U+303E、 U+3041-U+3096、 U+3099-U+30FF、 U+3105-U+312D、 U+3131-U+318E、 U+3190-U+31BA、 U+31C0-U+31E3、 U+31F0-U+321E、 U+3220-U+3247、 U+3250-U+32FE、 U+3300-U+4DBF、 U+4E00-U+A48C、 U+A490-U+A4C6、 U+A960-U+A97C、 U+AC00-U+D7A3、 U+D7B0-U+D7C6、 U+D7CB-U+D7FB、 U+F900-U+FAFF、 U+FE10-U+FE19、 U+FE30-U+FE52、 U+FE54-U+FE66、 U+FE68-U+FE6B、 U+FF01-U+FF60、 U+FFE0-U+FFE6、 U+1B000-U+1B001、 U+1F200-U+1F202、 U+1F210-U+1F23A、 U+1F240-U+1F248、 U+1F250-U+1F251、 U+20000-U+2FFFD、 U+30000-U+3FFFD。 他のすべての文字は半角の文字です。
