---
title: "【Mysql】コマンドラインで入力中だったものを終了させる方法"
date: 2022-12-08T18:00:00+09:00
description: "Mysql でコマンドラインでtypoしたりして入力中だったものを途中で終了させる方法"
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

# 【Mysql】コマンドラインで入力中だったものを終了させる方法
Mysql でコマンドラインでtypoしたりして入力中だったものを途中で終了させる方法

## 途中終了させる方法
Mysql のコマンドラインで途中終了させるには `\c` を入力すると終了します。
```sql
mysql>select * from sampel
    ->where
    ->\c
```

間違ったら、そのままいったん実行する人も居るかと思いますがSQLのエラーが吐かれてしまうしまうのでこの方法が安全です。

