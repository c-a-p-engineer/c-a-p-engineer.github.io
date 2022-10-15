---
title: "【Mysql】ERROR 1248 (42000): Every derived table must have its own alias エラーの解決"
date: 2022-10-15T16:00:00+09:00
description: "Mysql ERROR 1248 (42000): Every derived table must have its own alias エラーの解決メモ"
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

# 【Mysql】ERROR 1248 (42000): Every derived table must have its own alias エラーの解決
Mysql `ERROR 1248 (42000): Every derived table must have its own alias` エラーの解決メモ

## エラー
以下のようなSQLを実行すると `ERROR 1248 (42000): Every derived table must have its own alias` が出てしまいます。
```sql
SELECT
    * 
FROM
    (SELECT * FROM information_schema.COLUMNS)
```

## 原因
テーブルにエイリアスがついてないことが原因です。

## 解決方法
テーブル名にエイリアス付けます。
ここでは `temp` を指定してみます。

``` sql {linenos=table,hl_lines=["10"]}
SELECT
  *
FROM
  (
    SELECT
      *
    FROM
  information_schema.COLUMNS
  )
temp
```

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/error-messages-server.html#error_er_derived_must_have_alias" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: B.3 サーバーのエラーコードおよびメッセージ #エラー: 1248 SQLSTATE: 42000 (ER_DERIVED_MUST_HAVE_ALIAS)</a>
