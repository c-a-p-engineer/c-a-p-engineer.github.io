---
title: "【Python】PostgreSQL使用時に文字列をエスケープする方法"
date: 2021-12-11T01:00:00+09:00
description: "PythonでPostgreSQL使用時に文字列をエスケープする方法メモ"
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

# 【Python】PostgreSQL使用時に文字列をエスケープする方法
PythonでPostgreSQL使用時に文字列をエスケープする方法メモ

## SQLエスケープ
`psycopg2` を使用します。

`psycopg2` を入れるには `pip install psycopg2` でインストールが出来ます。

```python
from psycopg2.extensions import adapt

# SQLエスケープ
def sql_escape(param):
    # 無名関数化
    escape = lambda param: adapt(str(param).encode('utf-8').decode('latin-1'))

    # リスト対応
    if isinstance(param, list):
        param = map(escape, param)
        return ",".join(map(str, param))

    # 辞書型対応
    if isinstance(param, dict):
        param = map(escape, param)
        return (" , ".join(param.values()))

    # その他
    return escape(param)

# エスケープ対象文字列
param = " ' \ "
# エスケープ
string = str(sql_escape(param))
# 表示
print(string)
```

出力結果
```shell
$ python main.py
' '' \\ '
```

サンプルのシングルクォーテーションとバックスラッシュはエスケープされてシングルクォーテーションで囲まれます。

## 参考
* <a href="https://www.psycopg.org/docs/extensions.html#psycopg2.extensions.adapt" target="_blank" rel="nofollow noopener">psycopg2.extensions – Extensions to the DB API - Psycopg 2.9.2 documentation</a>

