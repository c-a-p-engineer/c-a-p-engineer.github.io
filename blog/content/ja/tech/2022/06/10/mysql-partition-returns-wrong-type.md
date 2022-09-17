---
title: "【Mysql】ERROR 1659 (HY000): The PARTITION function returns the wrong type エラーの解決"
date: 2022-06-10T03:30:00+09:00
description: "Mysql ERROR 1659 (HY000): The PARTITION function returns the wrong type エラーの解決メモ"
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

# 【Mysql】ERROR 1564 (HY000): The PARTITION function returns the wrong type エラーの解決
Mysql `ERROR 1564 (HY000): The PARTITION function returns the wrong type` エラーの解決メモ

## 原因
パーティション設定時に使用した関数の返却値の型がパーティションに設定できる型ではない。

## 解決方法
以下がパーティショニング可能な型になります。

関数を使用時に以下の型にする必要があります。
ただし、**関数と元の型の組み合わせによって以下のいずれかの型にならないことがあります**。

これ以外は **基本的には使用できません**。
* 整数型
    * TINYINT
    * SMALLINT
    * MEDIUMINT
    * INT (INTEGER)
    * BIGINT
* 日付
    * DATE
    * DATETIME
* 文字列
    * CHAR
    * VARCHAR
    * BINARY
    * VARBINARY

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/error-messages-server.html#error_er_field_type_not_allowed_as_partition_field" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: B.3 サーバーのエラーコードおよびメッセージ #エラー: 1659 SQLSTATE: HY000 (ER_FIELD_TYPE_NOT_ALLOWED_AS_PARTITION_FIELD)</a>