---
title: "【Linux】プロセスを一括でkillする"
date: 2021-04-24T08:00:00+09:00
description: "Linuxのプロセスを一括でkillする方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Linux
- Linuxコマンド
categories: 
- Linux
image: images/thumbnail/linux.png
---

# Linuxのプロセスを一括でkillする方法
テストなどをしていると無駄なプロセスが立ち上がり続ける事があります。
大量のプロセスが発生した時に `ps` コマンドで一々プロセスID調べて `kill` するのも手間なので特定のプロセス名を指定して一括 `kill` する方法です。

## 一括kill
まずは `ps` を実行してコマンド名を調べましょう。
``` bash
ps
```

PSの実行結果
``` bash
  PID   TTY      TIME      CMD
  17    pts/1    00:00:00 bash
  82    pts/1    00:00:00 ps
  27935 pts/1    00:00:00 /usr/sbin/httpd
  27936 pts/1    00:00:00 /usr/sbin/httpd
  27937 pts/1    00:00:00 /usr/sbin/httpd
  27938 pts/1    00:00:00 /usr/sbin/httpd
  27939 pts/1    00:00:00 /usr/sbin/httpd
  27940 pts/1    00:00:00 /usr/sbin/httpd
```

ここでプロセス名を指定して一括 `kill` します。
この場合は `httpd` と指定すれば立ち上がっている `httpd` のプロセスを一括で `kill` してくれます。
``` bash
pgrep [プロセス名] | xargs kill
```