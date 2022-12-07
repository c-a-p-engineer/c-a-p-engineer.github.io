---
title: "【Laravel】大量INSERTする際に chunk を使おう"
date: 2022-12-08T01:40:00+09:00
description: "Laravel で大量INSERTする際にエラーが出たり、遅くなったりします。そういう時は chunk を使用します。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
- Laravel
categories: 
- Laravel
image: images/thumbnail/laravel-l-slant.png
---

# 【Laravel】大量INSERTする際に chunk を使おう
Laravel で大量INSERTする際にエラーが出たり、遅くなったりします。そういう時は `chunk` を使用します。

できるだけ大量データを入れる際は `chunk` を使用してください。
僕の経験では一括で入れようとするとDBがエラーを起こしたり、挿入によるテーブルロックでDBが遅くなったりします。

## 確認環境情報
* PHP 8.1
* Laravel9

## サンプル
サンプルは1万件のデータを500件ずつに分割してデータ挿入を行います。
```php
<?php
$inserts = [];

// テスト用データの作成
for($i = 0; $i < 10000; $i++){
    $inserts[] = [
        'id' => $i,
        'value' => str()->random(16),
    ]
}

$insertData = collect($inserts);
// 500件ずつデータを入れる
foreach ($insertData->chunk(500) as $chunk) {
   Sample::insert($chunk->toArray());
}
```

## 参考
* <a href="https://stackoverflow.com/questions/51487769/how-to-insert-big-data-on-the-laravel" target="_blank" rel="nofollow noopener">How to insert big data on the laravel? - Stack Overflow</a>
