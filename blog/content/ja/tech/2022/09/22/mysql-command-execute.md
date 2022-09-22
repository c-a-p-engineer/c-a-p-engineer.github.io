---
title: "【Mysql】mysqlコマンドから直接SQLを実行する"
date: 2022-09-22T18:00:00+09:00
description: "Mysql で mysqlコマンドから直接SQLを実行するメモ"
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

# 【Mysql】mysqlコマンドから直接SQLを実行する
Mysql で mysqlコマンドから直接SQLを実行するメモ

## SQLを実行する
以下の `[SQL]` の部分に実行したいSQLを入れてください。
```
mysql -u[UserName] -p[Password] [DatabaseNmae] -e"[SQL]"
```

### 実行サンプル
以下のようにするとテーブル一覧を出力してくれます。
```
mysql -u[UserName] -p[Password] [DatabaseNmae] -e"show tables;"
```

### エスケープする
実行SQL内でダブルクォーテーションを使用する際には `\"` のようにエスケープを行ってください。
テーブル名に `sample` が付くテーブルを出力します。
```
mysql -u[UserName] -p[Password] [DatabaseNmae] -e"show tables like \"%sample%\";"
```

### 複数のSQLを実行する
セミコロン `;` で区切る事によって複数のSQLを実行することも可能です。
5秒スリープ後に次にテーブル一覧を出力します。
```
mysql -u[UserName] -p[Password] [DatabaseNmae] -e"select sleep(5);show tables;"
```

## 参考
* <a href="https://dev.mysql.com/doc/refman/5.6/ja/mysql-command-options.html#option_mysql_execute" target="_blank" rel="nofollow noopener">MySQL :: MySQL 5.6 リファレンスマニュアル :: 4.5.1.1 mysql のオプション #--execute</a>