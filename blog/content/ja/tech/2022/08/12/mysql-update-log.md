---
title: "【Mysql】テーブル更新時間を確認する"
date: 2022-08-12T18:30:00+09:00
description: "Mysql でテーブル更新時間を確認する方法メモ"
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

# 【Mysql】テーブル更新時間を確認する
Mysql でテーブル更新時間を確認する方法メモ。
Mysql で該当のテーブルが使われているか確認したいと思い、更新されている値を取得する方法を探しました。

## パーティションの変更時間を利用する
パーティションには作成時間、変更時間、チェック時間が保存されています。
それを利用することで最終更新時間を取得できます。

※エンジンによってできないようなのでご注意ください。
```sql
SELECT
    TABLE_NAME          -- テーブル名
    , PARTITION_NAME    -- パーティション名
    , CREATE_TIME       -- パーティション 作成時間
    , UPDATE_TIME       -- パーティション 更新時間
    , CHECK_TIME        -- パーティション チェック時間
FROM
    INFORMATION_SCHEMA.PARTITIONS 
WHERE
    TABLE_SCHEMA = 'database_name';
```

## 参考
* <a href="https://dev.mysql.com/doc/refman/8.0/ja/information-schema-partitions-table.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 8.0 リファレンスマニュアル :: 26.21 INFORMATION_SCHEMA PARTITIONS テーブル</a>
