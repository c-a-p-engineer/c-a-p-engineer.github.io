---
title: "【Mysql】ERROR 1526 (HY000): Table has no partition for value エラーの解決"
date: 2022-06-15T12:30:00+09:00
description: "Mysql ERROR 1526 (HY000):Table has no partition for value エラーの解決メモ"
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

# ERROR 1526 (HY000): Table has no partition for value エラーの解決
Mysql `ERROR 1526 (HY000): Table has no partition for value` エラーの解決メモ

## 原因
パーティションの範囲外の値が指定されている。

## 解決方法
パーティションの範囲の範囲を増やすことで対応できます。

## サンプル
### テーブル作成
`num < 30` の値を指定のパーティションに入れてくれます
```sql
CREATE TABLE `sample` ( 
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT ,
    `num` decimal (6, 4) DEFAULT 0 NOT NULL ,
    PRIMARY KEY (`id`, `num`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4
PARTITION BY RANGE (FLOOR (`num`))( 
    PARTITION p0 VALUES LESS THAN (10),
    PARTITION p1 VALUES LESS THAN (20),
    PARTITION p2 VALUES LESS THAN (30)
);
```

### データを入れる（エラー
作成したテーブルにデータを入れてみます。
こうすると `35`, `40` とパーティションの範囲外の30以上の値はエラーになります。
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

### パーティションを追加（解決
`30` 以上の値が入るパーティションを追加します。
```sql
ALTER TABLE `sample` ADD PARTITION (PARTITION pmax VALUES LESS THAN (MAXVALUE));
```
※ `MAXVALUE` を指定すると列の最大値以下の値を指定ができます。

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/error-messages-server.html#error_er_no_partition_for_given_value" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: B.3 サーバーのエラーコードおよびメッセージ #エラー: 1526 SQLSTATE: HY000 (ER_NO_PARTITION_FOR_GIVEN_VALUE)</a>
