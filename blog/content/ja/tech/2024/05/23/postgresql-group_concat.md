---
title: 【PostgreSQL】MySQLのGROUP_CONCATと同様の機能を実現する STRING_AGG
date: 2024-05-23T01:00:00+09:00
description: PostgreSQLでMySQLのGROUP_CONCAT関数と同様の機能を実現する方法について説明します。STRING_AGG関数を利用する場合の問題点とその解決策を紹介し、サンプルコードを交えて具体的な使用方法を解説します。
draft: false
enableToc: true
enableTocContent: true
tags: 
- PostgreSQL
categories: 
- PostgreSQL
image: images/thumbnail/Postgresql_elephant.svg
---

# 【PostgreSQL】MySQLのGROUP_CONCATと同様の機能を実現する STRING_AGG

PostgreSQLでMySQLのGROUP_CONCAT関数と同様の機能を実現する方法について説明します。STRING_AGG関数を利用する場合の問題点とその解決策を紹介し、サンプルコードを交えて具体的な使用方法を解説します。

## GROUP_CONCATとは？

MySQLのGROUP_CONCAT関数は、特定のグループに属する複数の行の値を1つの文字列に連結する関数です。以下はその基本的な使用例です。

```sql
SELECT GROUP_CONCAT(column_name) FROM table_name GROUP BY group_column;
```

## PostgreSQLでの実現方法

PostgreSQLには直接的にGROUP_CONCATに対応する関数はありませんが、同様の機能をSTRING_AGG関数を用いて実現できます。以下にその基本的な使用例を示します。

```sql
SELECT STRING_AGG(column_name, ',') FROM table_name GROUP BY group_column;
```

## STRING_AGGでの注意点

STRING_AGGを使用する際の問題点として、NULL値を含む列を連結する場合に予期せぬ結果を生む可能性があります。この場合、NULL値を除外するためにCOALESCE関数を併用することが推奨されます。

## STRING_AGGの実用例

以下に具体的なテーブルとデータを使用した実例を示します。

### サンプルテーブルとデータ

```sql
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    sale_date DATE
);

INSERT INTO sales (product_name, sale_date) VALUES
('Product A', '2023-01-01'),
('Product B', '2023-01-02'),
('Product A', '2023-01-03'),
('Product B', '2023-01-04');
```

### STRING_AGGの使用例

```sql
SELECT product_name, STRING_AGG(sale_date::TEXT, ', ') AS sale_dates
FROM sales
GROUP BY product_name;
```

### 結果

```
 product_name |    sale_dates
--------------+-------------------
 Product A    | 2023-01-01, 2023-01-03
 Product B    | 2023-01-02, 2023-01-04
```

## NULL値の処理

NULL値を無視して連結するには、COALESCEを使います。

```sql
SELECT product_name, STRING_AGG(COALESCE(sale_date::TEXT, ''), ', ') AS sale_dates
FROM sales
GROUP BY product_name;
```

## まとめ

PostgreSQLでMySQLのGROUP_CONCATと同様の機能を実現するためには、STRING_AGG関数を使用します。

## 参考

- <a href="https://www.postgresql.org/docs/current/functions-aggregate.html" target="_blank" rel="nofollow noopener">PostgreSQL Documentation: STRING_AGG</a>

