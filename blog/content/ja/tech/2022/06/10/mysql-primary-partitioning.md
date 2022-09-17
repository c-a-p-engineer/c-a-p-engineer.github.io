---
title: "【Mysql】ERROR 1503 (HY000): A PRIMARY KEY must include all columns in the table's partitioning function エラーの解決"
date: 2022-06-10T03:30:00+09:00
description: "Mysql ERROR 1503 (HY000): A PRIMARY KEY must include all columns in the table's partitioning function エラーの解決メモ"
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

# 【Mysql】ERROR 1503 (HY000): A PRIMARY KEY must include all columns in the table's partitioning function エラーの解決
Mysql `ERROR 1503 (HY000): A PRIMARY KEY must include all columns in the table's partitioning function` エラーの解決メモ

## 原因
パーティショニングを行う列はプライマリキーに含めていないため。

## 解決方法
パーティショニングを行う列をプライマリキーのものに変更する。
もしくはパーティショニングを行う列をプライマリキーに含めることで対応可能です。

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/error-messages-server.html#error_er_unique_key_need_all_fields_in_pf" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: B.3 サーバーのエラーコードおよびメッセージ #エラー: 1503 SQLSTATE: HY000 (ER_UNIQUE_KEY_NEED_ALL_FIELDS_IN_PF)</a>