---
title: "【Mysql】指定したパーティションのみを検索する"
date: 2022-09-16T18:00:00+09:00
description: "Mysqlで指定したパーティションのみを検索する方法メモ"
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

# 【Mysql】指定したパーティションのみを検索する
Mysqlで指定したパーティションのみを検索する方法メモ。

## パーティションを指定して検索する
以下の方法で指定したパーティションのみの検索が可能です。
```sql
SELECT
    * 
FROM
    [TABLE_NAME] PARTITION ([PARTITION_NAME]);
```

## サンプルテーブルの作成
```sql
CREATE TABLE `sample` ( 
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT ,
    `num` decimal (6, 4) DEFAULT 0 NOT NULL ,
    PRIMARY KEY (`id`, `num`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4
PARTITION BY RANGE (FLOOR (`num`))( 
    PARTITION p0 VALUES LESS THAN (10),
    PARTITION p1 VALUES LESS THAN (20),
    PARTITION p2 VALUES LESS THAN (30),
    PARTITION p3 VALUES LESS THAN MAXVALUE
);
```

### データを入れる
作成したテーブルにデータを入れてみます。
```sql
INSERT INTO `sample` (`num`) 
values (5)
, (10)
, (15)
, (20)
, (25)
, (30)
, (35)
, (40);
```

### 実行
パーティションを指定してSQLを実行してみます。
```sql
SELECT
    * 
FROM
    sample PARTITION (p0);
```

実行結果
|id|num|
|---:|---:|
|1|5.0000|

条件がない状態ですが全件出ずに指定のパーティションのデータのみ出てきます。

### 応用編
複数のパーティションを同時に検索する場合は以下のようにカンマ区切りで指定することが可能です。
```sql
SELECT
    * 
FROM
    sample PARTITION (p0, p3)
```

実行結果
|id|num|
|---:|---:|
|1|5.0000|
|6|30.0000|
|7|35.0000|
|8|40.0000|

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/partitioning-selection.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 19.5 パーティション選択</a>
