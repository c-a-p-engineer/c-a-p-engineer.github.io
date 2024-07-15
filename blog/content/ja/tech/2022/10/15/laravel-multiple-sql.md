---
title: "【Laravel】複数のSQLを一括実行する DB::unprepared"
date: 2022-10-15T16:30:00+09:00
description: "Laravel で複数のSQLを一括実行する DB::unprepared を使用する"
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

# 【Laravel】複数のSQLを一括実行する DB::unprepared
Laravel で複数のSQLを一括実行する `DB::unprepared` を使用する

## DB::unprepared を使用する
`DB::Insert` などを使用する場合、1つのSQL文ずつしか流せません。
複数のSQL文を実行するとエラーになります。
そこで `DB::unprepared` を使用します。
```php
$sql = file_get_contents(database_path('dump.sql'));
DB::unprepared($sql);
```

これによりDBのdumpファイルから一括でDBの生成などが可能です。

### 注意点
エラーを発するのは1つ目のSQLだけのようです。
以下のような2つ目以降のSQLがエラーになってもエラーが出ないので注意してください。
```php
$sql = <<<SQL
-- 1つ目のSQL
SELECT
    * 
FROM
    information_schema.COLUMNS;
-- 2つ目のSQL（存在しないテーブル
SELECT
    * 
FROM
    temp;
SQL;

DB::unprepared($sql);
```

2つ目のSQLは存在しないテーブルを指定していますがこれではエラーが出ません。
