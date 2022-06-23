---
title: "composer メモリオーバー対策"
date: 2021-03-11T09:00:00+09:00
description: "PHP の composer 使用時のメモリオーバー対策"
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

# composer メモリオーバー対策
```composer``` を使用するとたまに使用可能メモリを超えた場合にメモリオーバーエラーが発生します。
その時の対処方法のメモ。

## エラー
``` bash
composer install
PHP Fatal error:  Allowed memory size of 2097152 bytes exhausted (tried to allocate 1974272 bytes) in Unknown on line 0
```

## メモリ制限解除
```composer``` には ```COMPOSER_MEMORY_LIMIT``` という環境変数があるので ```COMPOSER_MEMORY_LIMIT=-1``` を付けると ```composer``` のメモリ制限がなくなります。

``` bash
COMPOSER_MEMORY_LIMIT=-1 composer install
```