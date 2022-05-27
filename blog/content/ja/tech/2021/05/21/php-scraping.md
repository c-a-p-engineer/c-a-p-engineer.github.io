---
title: "【PHP】PHPを使って簡単にスクレイピングしてみる"
date: 2021-05-21T13:00:00+09:00
description: "PHP を使用して簡単にスクレイピングをしてみる"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# PHP を使用して簡単にスクレイピングをしてみる
データの解析のため、PHPにスクレイピングをさせてみました。

## サンプル
サンプルは Google から `png` 形式の画像を抜き出しを行っています。
``` php:scraping.php
<?php

use DOMDocument;
use DOMXPath;

// HTML読み込み
$html = file_get_contents('https://www.google.com/');
$dom = new DOMDocument('1.0', 'UTF-8');
$html = mb_convert_encoding($html, "HTML-ENTITIES", 'auto');
@$dom->loadHTML($html);

// 要素を検索
$xpath = new DOMXPath($dom);

// 画像タグのsrcにpngを含むものを検索（DOMNodeListを取得）
$contents = $xpath->query('//img[contains(@src, "png")]');

// 取得したDOMNodeListをforeach
// $value = DOMElement
foreach($contents as $value){
    // HTMLとして表示
    echo 'HTML';
    echo $value->ownerDocument->saveXML($value) . PHP_EOL;

    // HTML内の文字列を出力（HTMLタグは除去）
    echo 'string';
    echo $value->nodeValue . PHP_EOL;
}
```

取得結果
```
HTML
"<img alt="Google" height="92" src="/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png" style="padding:28px 0 14px" width="272" id="hplogo"/>"
String
""
```

HTMLが取得できました。
今回は画像タグで　`<img />` のためHTML内には文字列がありません。

## 解説
`DOMDocument` でHTMLを読み込み
→`DOMXPath` で要素を検索し `DOMNodeList` を取得
→ `DOMNodeList` に含まれている `DOMElement` を展開、解析など

これで簡単にスクレイピング出来ますね。
例えば `aタグ` を検索 → `href` からリンクを辿って指定のサイトのデータを抜き出す事なども可能です。

## 参考
* <a href="https://www.php.net/manual/ja/domxpath.query.php" target="_blank" rel="nofollow noopener">PHP: DOMDocument - Manual</a>
* <a href="https://www.php.net/manual/ja/class.domdocument.php" target="_blank" rel="nofollow noopener">PHP: DOMXPath::query - Manual</a>
* <a href="https://www.php.net/manual/ja/class.domnodelist" target="_blank" rel="nofollow noopener">PHP: DOMNodeList - Manual</a>
* <a href="https://www.php.net/manual/ja/class.domelement.php" target="_blank" rel="nofollow noopener">PHP: DOMElement - Manual</a>
* <a href="https://qiita.com/yuki2006/items/1f96450fc744769872c5" target="_blank" rel="nofollow noopener">XPathで指定したテキストがある次の要素を取得する方法 - Qiita</a>
