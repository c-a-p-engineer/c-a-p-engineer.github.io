---
title: "【Linux】接続を切っても処理を継続させる「nohup」"
date: 2022-06-11T10:00:00+09:00
description: "Linuxに接続している状態でコマンド実行した際にネットワークなど何らかの理由で切られる危険性があり、対策として nohup を使用して接続が切られても処理を継続させる方法を取りました。"
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

# 【Linux】接続を切っても処理を継続させる方法
Linuxに接続している状態でコマンド実行した際にネットワークなど何らかの理由で切られる危険性があり、対策として `nohup` を使用して接続が切られても処理を継続させる方法を取りました。
ターミナルと閉じたり接続が切れると実行していた処理が中断されます。
~~なので帰りたいけど帰れない~~
そのためLinux上で数時間以上掛かる処理ならこれを使用するのが得策です。

## nohup の使い方
```
nohup [command] & 
```

* `nohup`
  * 接続が切られても実行
  * 出力がある場合はカレンドディレクトリに `nohup.out` が作られる
* `&`
  * バックグランド処理

## nohupを使ってみる

以下のコマンドを使用すると100秒間 `sleep` されます。
一度ターミナルの接続を切ってからも生きている事を確認できます。
```
nohup sleep 100 &
```

### 複数のコマンドを実行する
複数コマンドを実行して `nohup.out` に開始と終了の時刻を追加してみます。
これでわざわざ実行中に接続しなくてもプロセスが実行終了したことを確認出来ます。
```
nohup sh -c 'echo "start nohup `date`" && sleep 100 && echo "end nohup `date`"' &
```

### nohup のログ
`nohup` のログは `nohup.out` に吐かれて困るのでログを指定します。
標準出力は `nohup.log`、エラー出力は `error.log` に出力するようにします。
```
nohup sh -c 'echo "start nohup `date`" && sleep 100 && echo "end nohup `date`"' > nohup.log 2> error.log &
``
