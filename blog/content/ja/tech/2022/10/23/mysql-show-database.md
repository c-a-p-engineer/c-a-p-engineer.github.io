---
title: "【Mysql】DBが存在することを確認する方法"
date: 2022-10-23T05:30:00+09:00
description: "Mysql でDBが存在することを確認する方法"
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

# 【Mysql】DBが存在することを確認する方法
Mysql でDBが存在することを確認する方法

## DB一覧
すべてのDBを出力する
```sql
SHOW DATABASES
```

## DBを指定する
DB名を指定して存在を確認する

```sql
SHOW DATABASES LIKE '[DB名]'
```

### ワイルドカードを使用する
普通のLIKEと同様に `%` を使用して前方一致検索などが可能です。
```sql
SHOW DATABASES LIKE '[DB名]%'
```

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/show-databases.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 13.7.5.15 SHOW DATABASES 構文</a>
