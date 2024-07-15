---
title: "【Mysql】ERROR 1136 (21S01): Column count doesn't match value count at row のエラー解決方法"
date: 2022-09-17T17:00:00+09:00
description: "Mysql ERROR 1136 (21S01): Column count doesn't match value count at row のエラーの解決メモ"
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

# 【Mysql】ERROR 1136 (21S01): Column count doesn't match value count at row エラーの解決
Mysql `ERROR 1136 (21S01): Column count doesn't match value count at row` エラーの解決メモ

## 原因
INSERTに指定された列と値の数と一致しないのが原因です。

## 解決方法
列数と値の数を一致させる。
そのためINSERT文の指定した列と値に過不足があるか見直しをすれば解決します。

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/error-messages-server.html#error_er_wrong_value_count_on_row" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: B.3 サーバーのエラーコードおよびメッセージ #エラー: 1136 SQLSTATE: 21S01 (ER_WRONG_VALUE_COUNT_ON_ROW)</a>