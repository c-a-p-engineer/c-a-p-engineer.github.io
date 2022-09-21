---
title: "【Mysql】実行中のプロセスを検索する"
date: 2022-09-21T18:00:00+09:00
description: "processlist を使用し実行中のプロセスを見ることができますが、プロセス数が多いと対象のプロセスを探すのが困難になりますがそんなプロセスを確認する方法"
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

# 【Mysql】長時間実行しているプロセスを確認する
`processlist` を使用し実行中のプロセスを見ることができますが、プロセス数が多いと対象のプロセスを探すのが困難になりますがそんなプロセスを確認する方法。

## プロセスを検索する方法
`information_schema.PROCESSLIST` に対して `select` する事でプロセスの検索が可能です。
※ `SHOW FULL PROCESSLIST` と `SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST` は同等の結果になります。

たとえば下記は実行時間が60秒を超えたものの検索ができます。
```sql
SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST WHERE TIME > 59;
```

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/information-schema-processlist-table.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 21.15 INFORMATION_SCHEMA PROCESSLIST テーブル</a>