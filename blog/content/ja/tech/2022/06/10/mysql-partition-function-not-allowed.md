---
title: "【Mysql】ERROR 1564 (HY000): This partition function is not allowed エラーの解決"
date: 2022-06-10T03:30:00+09:00
description: "Mysql ERROR 1564 (HY000): This partition function is not allowed エラーの解決メモ"
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

# 【Mysql】ERROR 1564 (HY000): This partition function is not allowed エラーの解決
Mysql `ERROR 1564 (HY000): This partition function is not allowed` エラーの解決メモ

## 原因
パーティション設定時に使用できる関数以外が指定されている。

## 解決方法
パーティショニングを行う際には以下のリンクの関数を使用する。
* <a href="https://dev.mysql.com/doc/refman/8.0/ja/partitioning-limitations-functions.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 24.6.3 関数に関連するパーティショニング制限</a>

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/error-messages-server.html#error_er_partition_function_is_not_allowed" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: B.3 サーバーのエラーコードおよびメッセージ #エラー: 1564 SQLSTATE: HY000 (ER_PARTITION_FUNCTION_IS_NOT_ALLOWED)</a>