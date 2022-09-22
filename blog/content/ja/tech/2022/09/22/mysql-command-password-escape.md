---
title: "【Mysql】mysqlコマンドを実行する際、パスワードに記号が入っている際の対応方法"
date: 2022-09-22T18:00:00+09:00
description: "Mysql で mysqlコマンドを実行する際、パスワードに記号が入っている際の対応方法メモ"
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

# 【Mysql】mysqlコマンドを実行する際にパスワードに記号が入っている際の対応方法
Mysql で mysqlコマンドを実行する際、パスワードに記号が入っている際の対応方法メモ。

## パスワードに記号が入っている
mysqlコマンドを実行する際、パスワードに記号が入ってると以下のようにエラーが発生します。
パスワードには `p@ssword` としています。
```
$ mysql -u[UserName] -pp@assword

Warning: Using a password on the command line interface can be insecure.
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)
```

## シングルクォーテーションで囲む
シングルクォーテーション `'` で囲む事によって記号でも問題なく接続が可能になります。
```
$ mysql -u[UserName] -p'p@assword'
```
