---
title: "【Mysql】テーブルバックアップ方法"
date: 2021-10-13T22:00:00+09:00
description: "Mysql で簡単にテーブルのバックアップをする方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Mysql
- DB
categories: 
- Mysql
image: images/thumbnail/powered-by-mysql-167x86.png
image_description: 'MySQLは、Oracleの米国およびその他の国における商標または登録商標です。'
---

# Mysqlテーブルバックアップ方法
Mysql で簡単にテーブルのバックアップをする方法。
これさえ、あればテーブルのバックアップを簡単に取っておくことが出来ます。

## サンプル
```sql
-- テーブルの構造コピー
CREATE TABLE [バックアップ先テーブル名] LIKE [バックアップ元テーブル名];
 
-- データコピー
INSERT INTO [バックアップ先テーブル名] SELECT * FROM [バックアップ元テーブル名];
```

## 参考
* <a href="https://dev.mysql.com/doc/refman/8.0/ja/create-table-like.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 13.1.20.3 CREATE TABLE ... LIKE ステートメント</a>
* <a href="https://dev.mysql.com/doc/refman/8.0/ja/insert-select.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 13.2.6.1 INSERT ... SELECT ステートメント</a>
