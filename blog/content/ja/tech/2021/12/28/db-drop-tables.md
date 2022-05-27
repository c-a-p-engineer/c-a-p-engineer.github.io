---
title: "【DB】テーブルを簡単に一括削除する方法"
date: 2021-12-27T01:30:00+09:00
description: "データベースでテーブルを簡単に一括削除する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- DB
categories: 
- DB
image: images/thumbnail/db.png
---

# 【DB】テーブルを簡単に一括削除する方法
データベースでテーブルを簡単に一括削除する方法

## SQL

### スキーマで一括削除
特定のスキーマのテーブルを全て削除します。
```sql
drop schema public cascade;
create schema public;
```

他のスキーマも消す場合はスキーマ毎に削除してください。

### データベースを作り直す
データベースごと削除して再作成します。
```sql
drop database DATABASE_NAME;
create database DATABASE_NAME;
```

## 参考情報
* <a href="https://stackoverflow.com/questions/3327312/how-can-i-drop-all-the-tables-in-a-postgresql-database" target="_blank" rel="nofollow noopener">How can I drop all the tables in a PostgreSQL database? - Stack Overflow</a>
