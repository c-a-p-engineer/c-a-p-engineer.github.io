---
title: "【PHP】composer dump-autoload 「A non-empty PSR-4 prefix must end with a namespace separator」エラー解決"
date: 2022-06-23T12:00:00+09:00
description: "composer dump-autoload 実行時に「A non-empty PSR-4 prefix must end with a namespace separator」エラーが発生した際の解決メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- php
- composer
categories: 
- php
image: images/thumbnail/php.png
---

# 【PHP】composer dump-autoload 「A non-empty PSR-4 prefix must end with a namespace separator」エラー解決
`composer dump-autoload` 実行時に `A non-empty PSR-4 prefix must end with a namespace separator` エラーが発生した際の解決メモ

## 現象
`composer dump-autoload` を実行した際に下記のエラーが出てくる。

```shell
$ composer dump-autoload

Generating autoload files

  [InvalidArgumentException]
  A non-empty PSR-4 prefix must end with a namespace separator.
```

## 原因
`A non-empty PSR-4 prefix must end with a namespace separator.`
このエラー文のまま、「`PSR-4` の末尾に名前空間用の区切り文字（\）がない」というのが原因でした。


## 解決
`composer.json` の `autoload -> psr-4` の末尾に区切り文字を入れることで解決できます。

```json {linenos=table,hl_lines=[4]}
{
    "autoload": {
        "psr-4": {
            "App\\": "app"
        }
    },
}
```

`composer.json` を修正したら `composer dump-autoload` を実行。
```shell
composer dump-autoload
```
