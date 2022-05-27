---
title: "【Python】SQLAlchemy where in 検索を行う"
date: 2021-12-11T02:00:00+09:00
description: "PythonのSQLAlchemyでwhere句のinの検索を行う方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Python
- DB
- PostgreSQL
categories: 
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# 【Python】SQLAlchemy where in 検索を行う
PythonのSQLAlchemyでwhere句のinの検索を行う方法。

## 失敗
SQLAlchemyで配列をinで検索するとエラーが出ます。
```python
bind_ids = [1, 2, 3, 4]
query = "SELECT * FROM sampe_table t WHERE t.id IN (:ids;)"
conn.execute(sqlalchemy.text(query), ids=bind_ids)
```

## 成功
inの検索を行う場合は以下のようにすると成功します。
`in` → `= ANY` を使用してください。
```python
bind_ids = [1, 2, 3, 4]
query = "SELECT * FROM sampe_table t WHERE t.id = ANY(:ids);"
conn.execute(sqlalchemy.text(query), ids=bind_ids)
```

発行SQL
```sql
SELECT * FROM sampe_table t WHERE t.id = ANY(ARRAY[1,2,3,4]);
```

## 参考
* <a href="https://stackoverflow.com/questions/13190392/how-can-i-bind-a-list-to-a-parameter-in-a-custom-query-in-sqlalchemy" target="_blank" rel="nofollow noopener">python - How can I bind a list to a parameter in a custom query in SQLAlchemy? - Stack Overflow</a>

