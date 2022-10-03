---
title: "【Mysql】UNIXタイムスタンプ <=> 日時 変換方法"
date: 2022-10-04T01:20:00+09:00
description: "UNIXタイムスタンプ <=> 日時 変換方法メモ"
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

# 【Mysql】UNIXタイムスタンプ <=> 日時 変換方法
UNIXタイムスタンプ <=> 日時 変換方法メモ

## 日時 => UNIXタイムスタンプ
`UNIX_TIMESTAMP` に日時を入れるとUNIXタイムスタンプに変換されます。
```sql
SELECT UNIX_TIMESTAMP('2022/10/04 01:20:00');
```

## UNIXタイムスタンプ => 日時
`FROM_UNIXTIME` にUNIXタイムスタンプを入れると日時に変換されます。
```sql
SELECT FROM_UNIXTIME(1664814000);
```

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/date-and-time-functions.html#function_from-unixtime" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 12.7 日付および時間関数 #FROM_UNIXTIME</a>
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/date-and-time-functions.html#function_unix-timestamp" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 12.7 日付および時間関数 #UNIX_TIMESTAMP</a>