---
title: "【PHP】RSSを取得・解析する"
date: 2021-07-10T16:30:00+09:00
description: "PHPを使用して RSS を取得、解析します。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# RSSを取得、解析する
PHPを使用して RSS を解析します。
RSSの取得先は<a href="https://b.hatena.ne.jp/" target="_blank" rel="nofollow noopener">はてなブックマーク</a> を使用しています。

## RSS取得
RSS の XML を取得して PHP の配列にするだけの処理です。

``` php
<?php
// URL
$url = "http://b.hatena.ne.jp/search/tag?q=プログラミング&sort=popular&mode=rss";

// RSS（XML）を取得
$rss = simplexml_load_file($url);

// 一度JSONを経由してPHPの配列化
$json = json_decode(json_encode($rss), true);
var_dump($json);
```

これだけで可能です。
ただ注意が必要で取得したものが1つだけの場合、配列化する際に `$json['item']['title']` になってしまいます。
これに複数ある場合は `$json['item'][0]['title']` のようになります。

メソッド化、関数化する際に以下のようにすれば統一された形になります。
``` php {linenos=table,hl_lines=["11-14"]}
<?php
// URL
$url = "http://b.hatena.ne.jp/search/tag?q=プログラミング&sort=popular&mode=rss";

// RSS（XML）を取得
$rss = simplexml_load_file($url);

// 一度JSONを経由してPHPの配列化
$json = json_decode(json_encode($rss), true);

if(!is_null($json['item']['title'] ?? null)){
    // 1件のみの場合は配列化
    $json['item'] = [0 => $json['item']];
}

var_dump($json);
```

## 参考
* <a href="https://qiita.com/suesan/items/a02c893b5d391cee1a86" target="_blank" rel="nofollow noopener">はてブの検索結果をRSSフィードとしてslackに垂れ流す - Qiita</a>