---
title: "【PHP】ノーブレークスペース（\\u00a0）への対処"
date: 2021-05-20T11:00:00+09:00
description: "PHP でのノーブレークスペース（\\u00a0）への対処"
draft: false
enableToc: true
enableTocContent: true
tags: 
- HTML
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# ノーブレークスペース（\u00a0）への対処
`HTML` を解析するプログラムを書いていたら置換などが出来ない 空白（` `） を発見しました。

## 調査
該当の文字列のユニコードの値を取得するため `json` にしてました。

``` php:sample.php
$html = 'hoge piyo';
var_dump(json_encode($html, true));
```

※サンプルの空白は通常のスペースになっています。

``` php
string(14) "hoge\u00a0piyo"
```

これで文字列を特定出来ました。

### \\u00a0
このスペースは `ノーブレークスペース` というもので `HTML` の `&nbsp` の事。
* <a href="https://ja.wikipedia.org/wiki/%E3%83%8E%E3%83%BC%E3%83%96%E3%83%AC%E3%83%BC%E3%82%AF%E3%82%B9%E3%83%9A%E3%83%BC%E3%82%B9" target="_blank" rel="nofollow noopener">ノーブレークスペース - Wikipedia</a>

## 対処

### 文字列として対処
``` php:explode.php
$html = 'hoge piyo';

$exp = expload (`\u{00a0}`, $html);
var_dump($exp);
```

### 正規表現で対処
``` php:preg_split.php
$html = 'hoge piyo';

$exp = preg_split (`~\x{00a0}~siu`, $html);
var_dump($exp);
```