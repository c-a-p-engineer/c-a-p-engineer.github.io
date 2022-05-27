---
title: "【Mysql】テーブルの件数を取得する際に TABLE_ROWS と COUNT の違いの注意点"
date: 2022-05-21T05:30:00+09:00
description: "テーブルのデータ量が多く、COUNT だと時間が掛かるため、INFORMATION_SCHEMATABLES.TABLE_ROWS から件数を確認してみたのですが、これが実際の件数と違うので注意が必要です。"
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

# 【Mysql】テーブルの件数を取得する際に TABLE_ROWS と COUNT の違いの注意点
テーブルのデータ量が多く、COUNT だと時間が掛かるため、`INFORMATION_SCHEMATABLES.TABLE_ROWS` から件数を確認してみたのですが、これが実際の件数と違うので注意が必要です。

## 現象
`information_schema.table_rows` の値と `count` した件数が違う。

`information_schema.table_rows` から行数を取得。
```sql
SELECT
  table_name,
  table_rows
FROM
  information_schema.tables
WHERE
  table_schema = 'db_name'
  AND table_name = 'tbl_name';
```

|  table_name  |  table_rows  |
| ---- | ---- |
|  tbl_name  |  12345  |


`select count(*)` から行数を取得。
```sql
SELECT COUNT(*) FROM tbl_name;
```

| table_name | COUNT(*) |
| ---- | ---- |
| tbl_name | 12999 |

上記のように `table_rows` と `count` で違いが生じます。

## 原因
`table_rows` と `count` の差異の原因は以下のためです。
> TABLE_ROWS
> 行数。 MyISAM などの一部のストレージエンジンは、正確な数を格納します。 InnoDB などのほかのストレージエンジンの場合、この値は概算であり、実際の値と 40% から 50% まで異なる可能性があります。 このような場合、正確な数を取得するには SELECT COUNT(*) を使用します。
<a href="https://dev.mysql.com/doc/refman/8.0/ja/information-schema-tables-table.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 26.38 INFORMATION_SCHEMA TABLES テーブル</a>

## 対処
対処方法としては最適化です。
以下いずれかの対処で `table_rows` が正確なものになることを確認しました。

### INDEXの最適化
**読み取りロックが発生します。**
```sql
ANALYZE TABLE tbl_name;
```

### テーブルの最適化
どちらかを実行するだけでテーブルの最適化が行われます。
**テーブルロックが発生するので注意してください。**
```sql
OPTIMIZE TABLE tbl_name;
```

```sql
ALTER TABLE tbl_name ENGINE INNODB;
```

### 自動的に最適化されるタイミング
<a href="http://nippondanji.blogspot.com/2010/09/innodb.html" target="_blank" rel="nofollow noopener">漢(オトコ)のコンピュータ道: 大人のためのInnoDBテーブルとの正しい付き合い方。</a>
> * 前回インデックス統計情報を更新してから、テーブルの行数全体の1/16が更新された。
> * 前回インデックス統計情報を更新してから、20億行以上更新された。


## auto_increment を利用する方法
別の手として該当のテーブルに `auto_increment` が設定されている場合且つ物理削除を行われていないのであれば、`auto_increment` を取得すれば現在の行数として扱えるかと思います。

```sql
SELECT
  table_name,
  auto_increment-1
FROM
  information_schema.tables
WHERE
  table_schema = 'db_name'
  AND table_name = 'tbl_name';
```
※ `auto_increment` は `1` から始まるので `-1` する。

| table_name | auto_increment-1 |
| ---- | ---- |
| tbl_name | 13210 |

## 参考
* <a href="https://dev.mysql.com/doc/refman/8.0/en/information-schema-tables-table.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 26.3.38INFORMATION_SCHEMATABLESテーブル</a>
* <a href="http://nippondanji.blogspot.com/2010/09/innodb.html" target="_blank" rel="nofollow noopener">漢(オトコ)のコンピュータ道: 大人のためのInnoDBテーブルとの正しい付き合い方。</a>