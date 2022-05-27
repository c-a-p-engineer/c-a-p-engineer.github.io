---
title: "【VSCode】SQLTools を使用してSQLを自動的に整形する"
date: 2021-12-23T02:00:00+09:00
description: "VSCode でSQLを自動的に整形するためのメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Visual Studio Code
categories: 
- エディタ
image: images/thumbnail/Visual_Studio_Code_1.35_icon.svg
image_description: 'Visual Studio Codeは、米国およびその他の国におけるMozillaFoundationの商標です。'
---

# 【VSCode】SQLTools を使用してSQLを自動的に整形する
VSCode でSQLを自動的に整形するためのメモ

## 1. SQLTools インストール
まずはSQLToolsをダウンロードします。
<a href="v" target="_blank" rel="nofollow noopener">SQLTools - Visual Studio Marketplace</a>

DBドライバを入れておけばよりSQLファイルを直接DBに接続して実行することが可能です。
<a href="https://vscode-sqltools.mteixeira.dev/#supported-drivers" target="_blank" rel="nofollow noopener">SQLTools #Supported Drivers</a>

## 2.setting.json
SQLToolsの設定を行う。
<a href="https://vscode-sqltools.mteixeira.dev/settings" target="_blank" rel="nofollow noopener">SQLTools - Settings Properties</a>

```json:.vscode/settings.json
{
    // SQLTools接続情報
    "sqltools.connections": [
    {
        "name": "MySQL",
        "server": "localhost",
        "driver": "MySQL",
        "port": 3306,
        "database": "test_db",
        "username": "root",
        "askForPassword": false,
        "password": "root",
        "connectionTimeout": 15
    }
    ],
    // SQLTools フォーマット
    "sqltools.format": {
        "language": "sql",
        "indentSize": 2,
        "reservedWordCase": "lower",
        "linesBetweenQueries": 1
    },
    // フォーマッター設定
    "[sql]": {
        "editor.defaultFormatter": "mtxr.sqltools"
    },
    // 保存時フォーマット設定
    "editor.formatOnSave": true
}
```

## 3. SQLを自動整形
どうのように整形されるか試してみます。
```sql:sample.sql
SELECT a, b FROM t CROSS JOIN t2 on t.id = t2.id_t;

SELECT DISTINCT name, ROUND(age/7) field1, 18 + 20 AS field2, 'some string' FROM foo;

-- here is a comment
# another comment

UPDATE "log" SET "time" = '2020-02-01 09:00:00' WHERE "id" = 1 RETURNING "time";

CREATE TABLE foo (id INTEGER PRIMARY KEY,name VARCHAR(200) NOT NULL);

ALTER TABLE supplier MODIFY supplier_name char(100) NOT NULL;

select t.column1 Кириллица_cyrilic_alias
  , t.column2 Latin_alias
from db_table t
where a >= some_date1  -- from
and a <  some_date2  -- to
and b >= some_date3  -- and
and b <  some_date4  -- where, select etc.
and 1 = 1;
```
保存後は以下のようになります。

```sql:sample.sql
select a,
    b
from t
    cross join t2 on t.id = t2.id_t;
select distinct name,
    ROUND(age / 7) field1,
    18 + 20 as field2,
    'some string'
from foo;
-- here is a comment
# another comment
update "log"
set "time" = '2020-02-01 09:00:00'
where "id" = 1
returning "time";
create table foo (
    id INTEGER primary key,
    name VARCHAR(200) not null
);
alter table supplier
modify supplier_name char(100) not null;
select t.column1 Кириллица_cyrilic_alias,
    t.column2 Latin_alias
from db_table t
where a >= some_date1 -- from
    and a < some_date2 -- to
    and b >= some_date3 -- and
    and b < some_date4 -- where, select etc.
    and 1 = 1;
```

## 参考情報
* <a href="https://vscode-sqltools.mteixeira.dev/" target="_blank" rel="nofollow noopener">SQLTools</a>
