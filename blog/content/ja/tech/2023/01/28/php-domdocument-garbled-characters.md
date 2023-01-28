---
title: "【PHP】DOMDocument で発生する文字化けの対策方法"
date: 2023-01-28T10:10:00+09:00
description: "PHP DOMDocument を利用した際に発生する文字化けの対策方法です。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# 【PHP】DOMDocument で発生する文字化けの対策方法
PHP DOMDocument を利用した際に発生する文字化けの対策方法です。

## 文字化けコード
```php
$domDocument = new DOMDocument();
$domDocument->loadHTML($html);
```

## 原因
`loadHtml` は渡された文字列を `ISO-8859-1` で解析するため。
<a href="https://www.php.net/manual/ja/domdocument.loadhtml.php#52251" target="_blank" rel="nofollow noopener">PHP: DOMDocument::loadHTML  - Manual</a>

## 文字化け対策
文字化け対策は2種類あります。

```php
# HTMLにエンコードをかける
$domDocument->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
```

```php
# HTMLにエンコードの指定を付与
$domDocument->loadHTML('<?xml encoding="utf-8" ?>' . $html);
```

## 参考
* <a href="https://www.php.net/manual/ja/domdocument.loadhtml.php#52251" target="_blank" rel="nofollow noopener">PHP: DOMDocument::loadHTML  - Manual</a>
