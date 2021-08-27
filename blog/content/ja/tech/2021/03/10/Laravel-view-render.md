---
title: "Laravel View の文字列取得"
date: 2021-03-10T18:00:00+09:00
description: "Laravel の View 文字列を取得する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Laravel
categories: 
- Laravel
image: images/thumbnail/laravel-l-slant.png
---

# Laravel View の文字列取得
Laravel で View の文字列を取得したい時の対応
※Laravel 6.2 で確認

## サンプルソース

``` php
<?php
$viewStr = View::make('home')->render();
```

指定のセクションを取得
``` php
<?php
$viewStr = View::make('home')->renderSections()['content'];
```