---
title: "【Mysql】コマンドラインで入力中だったものを終了させる方法"
date: 2022-12-08T18:00:00+09:00
description: "Mysql でコマンドラインでtypoしたりして入力中だったものを途中で終了させる方法"
tags: []
categories: []
draft: false
legacySlug: mysql-cli-abort
image: "images/thumbnail/powered-by-mysql-167x86.png"
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
