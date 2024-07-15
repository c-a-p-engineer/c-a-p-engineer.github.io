---
title: "【Mysql】ERROR 1659 (HY000): Field 'num' is of a not allowed type for this type of partitioning エラーの解決"
date: 2022-06-10T03:30:00+09:00
description: "Mysql ERROR 1659 (HY000): Field 'num' is of a not allowed type for this type of partitioning エラーの解決メモ"
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

# 【Mysql】ERROR 1659 (HY000): Field 'num' is of a not allowed type for this type of partitioning エラーの解決
Mysql `ERROR 1659 (HY000): Field 'num' is of a not allowed type for this type of partitioning` エラーの解決メモ

## 原因
列がパーティションに指定できる型ではない。

## 解決方法
解決方法は2つ。
1. パーティショニング可能な型にする。
2. 関数を使用してパーティショニング可能な型に変換する。

### パーティショニング可能な型
以下がパーティショニング可能な型になります。
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

### パーティショニングを行う際に特定の関数を使用する
パーティショニングを行う際に特定の関数を使用できます。
* <a href="https://dev.mysql.com/doc/refman/8.0/ja/partitioning-limitations-functions.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 24.6.3 関数に関連するパーティショニング制限</a>

パーティショニングする際に関数を使用してパーティショニング可能な型に変換することで指定することが可能です。

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/error-messages-server.html#error_er_field_type_not_allowed_as_partition_field" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: B.3 サーバーのエラーコードおよびメッセージ #エラー: 1659 SQLSTATE: HY000 (ER_FIELD_TYPE_NOT_ALLOWED_AS_PARTITION_FIELD)</a>