---
title: "【Mysql】#hy000you can't specify target table 'hoge' for update in from clause の解決方法"
date: 2022-04-10T02:30:00+09:00
description: "Mysql の #hy000you can't specify target table 'hoge' for update in from clause の解決方法"
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

# 【Mysql】#hy000you can't specify target table 'hoge' for update in from clause の解決方法
MysqlでSQLを実行したら`#hy000you can't specify target table 'hoge' for update in from clause` というエラーが出たので解決方法メモ。

## エラー
以下のようなSQLを実行すると `#hy000you can't specify target table 'hoge' for update in from clause` というエラーが出てきます。
```sql
UPDATE
    SET name = 'hoge'
FROM
    hoge
WHERE
    column1 IN(
        SELECT
            column1
        FROM
            hoge
        ORDER BY
            created_at DESC
        LIMIT 1
    )
```

## 原因
Mysqlのサブクエリで更新対象と同じテーブルを使用することが出できいとのこと。
> テーブルを更新し、さらにサブクエリーで同じテーブルから選択することはできません。 
<a href="https://dev.mysql.com/doc/refman/5.6/ja/update.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 13.2.11 UPDATE 構文</a>

おそらく、更新対象のサブクエリ内のテーブルの条件によっては無限ループのような事が発生し得るので制御してると思われます。

## 解決方法
サブクエリの中でさらにサブクエリを使用して `select` 文をラップします。
こうすることによって更新が可能になります。
``` sql {linenos=table,hl_lines=["11-19"]}
UPDATE
SET
    name = 'hoge'
FROM
    hoge
WHERE
    column1 IN(
        select
            column1
        from
            (
                SELECT
                    column1
                FROM
                    hoge
                ORDER BY
                    created_at DESC
                LIMIT 1
            ) tmp
    )
```

## 参考
<a href="https://dev.mysql.com/doc/refman/5.6/ja/update.html" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 13.2.11 UPDATE 構文</a>
