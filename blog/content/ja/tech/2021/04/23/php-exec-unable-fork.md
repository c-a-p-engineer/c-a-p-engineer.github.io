---
title: "【PHP】Warning: exec(): Unable to fork の対処"
date: 2021-04-23T12:00:00+09:00
description: "PHP で exec() 使用時に Warning: exec(): Unable to fork 使用時のエラー対処方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# Warning: exec(): Unable to fork の対処
PHP で `exec()` 使用時に `Warning: exec(): Unable to fork` が発生することがあります。
その対処方法です。

## 原因
原因はいくつか理由があります。

* 権限がない
* プロセス数上限

## 対処方法

### 権限付与
例えば `exec('rm -r hoge.txt')` 実行時に `hoge.txt` を削除する権限がない場合に発生します。
そのため権限を変更して対応するが可能です。

また、指定のコマンドへのパスが通ってない可能性もありますので確認が必要です。

### プロセス数上限（Linux）
以下のコマンドでプロセス数の上限を調べることが可能です。
``` bash
ulimit -u
```
`unlimited` と表示されたら無制限です。

プロセス数の上限が設定されていたら今度は現在実行されているプロセス数を調べます。

以下のコマンドにてプロセスの確認が出来ます。
``` bash
ps aux
```

指定したプロセス名だけ表示する
``` bash
ps aux | grep [プロセス名]
```

不要なプロセスを見つけたらプロセスを `kill` しましょう。

``` bash
kill [プロセスID]
```

## 参考
* <a href="https://cloud6.net/so/php/1218923" target="_blank" rel="nofollow noopener">php - 警告:exec():PHPでforkできません - ITツールウェブ</a>
* <a href="https://teratail.com/questions/99949" target="_blank" rel="nofollow noopener">CakePHP - CakePHP3からrmコマンドを実行したら警告エラーが出てファイルが削除されない｜teratail</a>
