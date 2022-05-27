---
title: "【Mysql】CREATE TABLE はトランザクションが効かないで暗黙的にコミットされる"
date: 2022-05-07T02:00:00+09:00
description: "Mysql でCREATE TABLE はトランザクションが効かないで暗黙的にコミットされる"
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

# 【Mysql】CREATE TABLE はトランザクションが効かないで暗黙的にコミットされる
Mysqlでは `CREATE TABLE` はトランザクションが効かないで暗黙的にコミットされる。

一部のステートメントでは暗黙的にコミットされトランザクションが効かなくなるとのことです。
<a href="https://dev.mysql.com/doc/refman/8.0/ja/implicit-commit.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 13.3.3 暗黙的なコミットを発生させるステートメント</a>

## CREATE TABLE はトランザクションが効かない
`InnoDB` では `CREATE TABLE` を使用すると1つのトランザクションとして処理され、その時点で `COMMIT` され `ROLLBACK` されません。
そのため、`CREATE TABLE` を実行するとトランザクションが終了されます。

## 例外
例外として一時テーブル作成 `CREATE TEMPORARY TABLE` 、テーブル削除 `DROP TEMPORARY TABLE` に対してコミットは発生しないとのことです。

## 参考
* <a href="https://dev.mysql.com/doc/refman/8.0/ja/implicit-commit.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 13.3.3 暗黙的なコミットを発生させるステートメント</a>
