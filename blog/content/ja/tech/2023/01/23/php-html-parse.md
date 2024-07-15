---
title: "【PHP】DOMDocument を利用して HTMLを解析する "
date: 2023-01-23T18:30:00+09:00
description: "PHP で DOMDocument を利用して HTMLを解析する"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】DOMDocument を利用して HTMLを解析する
PHP で `DOMDocument` を利用して HTMLを解析する

今回はPHPの `DOMDocument` を利用してHTMLを解析してみます。
<a href="https://www.php.net/manual/ja/class.domdocument.php" target="_blank" rel="nofollow noopener">PHP: DOMDocument - Manual</a>

先に記載しておきますが **大変使いにくくかゆいところに手が届かないもの** になります。
簡単な解析程度には使用できますがタグの属性など取れないこともありますのでHTML解析ライブラリを使用することをオススメします。

## HTMLを解析する
指定のID、タグの情報を取得してみます。
``` php
<?php
$html = <<<HTML
<html>
    <head>
        <meta charset="utf-8">
        <title>タイトル</title>
    </head>
    <body>
        <h1>1</h1>
        <p id="row1" class="row">1行目</p>
        <p id="row2" class="row"><input type="text" value="2行目" /></p>
        <h2>2</h2>
        <p id="row3" class="row">3行目</p>
        <p id="row4" class="row"><input type="text" value="4行目" /></p>
    </body>
</html>
HTML;

$domDocument = new DOMDocument();
// HTML読み込み
$domDocument->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));

// ID で取得
$id = $domDocument->getElementById('row1');
// タグで取得
$tag = $domDocument->getElementsByTagName('input');

var_dump($id);
foreach ($tags as $tag){
    var_dump($tag);
}
```

## HTMLを配列化させる
``` php
<?php
$html = <<<HTML
<html>
    <head>
        <meta charset="utf-8">
        <title>タイトル</title>
    </head>
    <body>
        <h1>1</h1>
        <p id="row1" class="row">1行目</p>
        <p id="row2" class="row"><input type="text" value="2行目" /></p>
        <h2>2</h2>
        <p id="row3" class="row">3行目</p>
        <p id="row4" class="row"><input type="text" value="4行目" /></p>
    </body>
</html>
HTML;

$domDocument = new DOMDocument();
// HTML読み込み
$domDocument->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));

// XML オブジェクトに変換
$xmlString = $domDocument->saveXML();
$xmlObject = simplexml_load_string($xmlString);

// XMLオブジェクトを配列に変換
$result = json_decode(json_encode($xmlObject), true);

var_dump($result);
```

上記のPHPを実行すると下記のような解析になります。
**`p` タグのIDなどが消失するので使用する際は注意してください。**

```
array(2) {
  ["head"]=>
  array(2) {
    ["meta"]=>
    array(1) {
      ["@attributes"]=>
      array(1) {
        ["charset"]=>
        string(5) "utf-8"
      }
    }
    ["title"]=>
    string(12) "タイトル"
  }
  ["body"]=>
  array(3) {
    ["h1"]=>
    string(1) "1"
    ["p"]=>
    array(4) {
      [0]=>
      string(7) "1行目"
      [1]=>
      array(2) {
        ["@attributes"]=>
        array(2) {
          ["id"]=>
          string(4) "row2"
          ["class"]=>
          string(3) "row"
        }
        ["input"]=>
        array(1) {
          ["@attributes"]=>
          array(2) {
            ["type"]=>
            string(4) "text"
            ["value"]=>
            string(7) "2行目"
          }
        }
      }
      [2]=>
      string(7) "3行目"
      [3]=>
      array(2) {
        ["@attributes"]=>
        array(2) {
          ["id"]=>
          string(4) "row4"
          ["class"]=>
          string(3) "row"
        }
        ["input"]=>
        array(1) {
          ["@attributes"]=>
          array(2) {
            ["type"]=>
            string(4) "text"
            ["value"]=>
            string(7) "4行目"
          }
        }
      }
    }
    ["h2"]=>
    string(1) "2"
  }
}
```

## 参考
* <a href="https://www.php.net/manual/ja/class.domdocument.php" target="_blank" rel="nofollow noopener">PHP: DOMDocument - Manual</a>
