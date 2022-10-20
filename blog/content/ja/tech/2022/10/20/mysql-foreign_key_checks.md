---
title: "【Mysql】外部キー制約を無効化する方法"
date: 2022-10-20T18:00:00+09:00
description: "Mysql でテーブルやデータを削除する時に外部キーのせいで簡単に出来ない時がそれを解決するために外部キー制約を無効化する方法"
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

# 【Mysql】外部キー制約を無効化する方法
Mysql でテーブルやデータを削除する時に外部キーのせいで簡単に出来ない時がそれを解決するために外部キー制約を無効化する方法

## 外部キー制約を無効化

以下のコマンドを使用すると外部キーチェックを無効化ができます。

```sql
-- 外部キーチェックの無効化
SET FOREIGN_KEY_CHECKS = 0;

-- 処理
-- TODO

-- 外部キーチェックを有効化
SET FOREIGN_KEY_CHECKS = 1;
```

## サンプル
実際に使用してみるためのサンプルです。
サンプルとして使用するテーブル。
```sql
CREATE TABLE parent (
    id INT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE child (
    id INT, 
    parent_id INT,
    INDEX par_ind (parent_id),
    FOREIGN KEY (parent_id) 
        REFERENCES parent(id)
        ON DELETE CASCADE
) ENGINE=INNODB;
```

### エラーになるパターン
`child` テーブルから `parent` テーブルへの外部キーがついているのでエラーが発生する。
```
DROP TABLE parent;
```

エラーが発生します。
```
SQLSTATE[HY000]: General error: 1824 Cannot drop table 'parent' referenced by a foreign key constraint 'child_ibfk_1' on table 'child'.
```
エラー内容は「外部キーが付いてるから削除ができない」です。
<a href="https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html#error_er_fk_cannot_drop_parent" target="_blank" rel="nofollow noopener">Error number: 3730; Symbol: ER_FK_CANNOT_DROP_PARENT; SQLSTATE: HY000</a>

### 外部キーチェックを無効化する
以下のように、一時的に外部キーチェックを無効化することによって削除が可能です。
```sql
-- 外部キーチェックの無効化
SET FOREIGN_KEY_CHECKS = 0;

-- 処理
DROP TABLE parent;

-- 外部キーチェックを有効化
SET FOREIGN_KEY_CHECKS = 1;
```

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/create-table-foreign-keys.html#idm46328677602768" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 13.1.17.2 外部キー制約の使用</a>
* <a href="https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html#error_er_fk_cannot_drop_parent" target="_blank" rel="nofollow noopener">Error number: 3730; Symbol: ER_FK_CANNOT_DROP_PARENT; SQLSTATE: HY000</a>
