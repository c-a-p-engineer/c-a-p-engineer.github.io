---
title: "【Mysql】float, double型でテーブルのパーティションが切れない"
date: 2022-06-10T03:00:00+09:00
description: "Mysql で float, double型でテーブルのパーティションが切れなかったため解決した方法のメモ"
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

# 【Mysql】float, double型でテーブルのパーティションが切れない
Mysql で float, double型でテーブルのパーティションが切れなかったため解決した方法のメモ

* <a href="https://dev.mysql.com/doc/refman/8.0/ja/partitioning-columns.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 24.2.3 COLUMNS パーティショニング</a>

## パーティショニング可能な型
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

## パーティショニングの型の例外
パーティショニングを行う際に特定の関数を使用できます。
* <a href="https://dev.mysql.com/doc/refman/8.0/ja/partitioning-limitations-functions.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 24.6.3 関数に関連するパーティショニング制限</a>

一部の列のこれらを使用することで**整数値**を返却することでパーティショニングが可能になります。

## テーブルを作ってみる

### double の型でパーティションを切る（失敗
下記のSQLを実行すると失敗します。
```sql
CREATE TABLE `sample` ( 
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT ,
    `num` double (6, 4) DEFAULT 0 NOT NULL ,
    PRIMARY KEY (`id`, `num`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4
PARTITION BY RANGE (num)( 
    PARTITION p0 VALUES LESS THAN (10),
    PARTITION p1 VALUES LESS THAN (20),
    PARTITION p2 VALUES LESS THAN (30),
    PARTITION p3 VALUES LESS THAN MAXVALUE
);
```

実行すると以下のエラーが出てきます。

```
#HY000Field 'num' is of a not allowed type for this type of partitioning
```

`num` のcolumnをパーティションのレンジの基準に出来ないというエラーです。

### 小数点を含む値を使用するなら decimal
小数点を含む値を使用するなら `float`, `double` を使用しないで `decimal` を使用しましょう。
またパーティションを指定する際は整数型しか指定出来ないため `TRUNCATE` をして小数部を落としましょう。
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

### パーティションの確認
パーティション通りにデータが入っているか確認します。

```sql
SELECT
    TABLE_SCHEMA
    , PARTITION_NAME
    , PARTITION_ORDINAL_POSITION
    , TABLE_ROWS 
FROM
    INFORMATION_SCHEMA.PARTITIONS 
WHERE
    TABLE_NAME = 'sample';
```

結果を見る限り想定通りにデータが入れられています。

|TABLE_SCHEMA|PARTITION_NAME|PARTITION_ORDINAL_POSITION|TABLE_ROWS|
|:---|:---|:---|:---|
|sample|p0|1|1|
|sample|p1|2|2|
|sample|p2|3|2|
|sample|p3|4|3|

### 問題点 実行計画を確認
実行計画を確認してみましょう。

```sql
EXPLAIN PARTITIONS SELECT * FROM `sample` WHERE num > 20;
```

|id|select_type|table|partitions|type|possible_keys|key|key_len|ref|rows|Extra|
|---:|:---|:---|:---|:---|:---|:---|:---|:---|---:|:---|
|1|SIMPLE|sample|p0,p1,p2,p3|index||PRIMARY|11||8|Using where; Using index|

本来なら `num > 20` で指定しているので `partitions` が `p3,p4` になるはずなのですが、実行計画上想定の動きはしません。

条件を `num = 20` に変更してみます。

```sql
EXPLAIN PARTITIONS SELECT * FROM `sample` WHERE num = 20;
```

|id|select_type|table|partitions|type|possible_keys|key|key_len|ref|rows|Extra|
|---:|:---|:---|:---|:---|:---|:---|:---|:---|---:|:---|
|1|SIMPLE|sample|p2|index||PRIMARY|11||2|Using where; Using index|

等号で指定すると想定通りパーティションが指定されます。

この事から `decimal` の型でパーティションは指定すること自体可能だが **不等号での条件ではパーティションをフルスキャンする可能性** があります。
そのため、速度を要求されるテーブルで行う場合は要検証が必要になりますのでご注意ください。

## 参考
* <a href="https://dev.mysql.com/doc/refman/8.0/ja/partitioning-columns.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 24.2.3 COLUMNS パーティショニング</a>
* <a href="https://dev.mysql.com/doc/refman/8.0/ja/partitioning-limitations-functions.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 24.6.3 関数に関連するパーティショニング制限</a>