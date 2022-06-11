---
title: "【Linux】実行中のジョブをターミナルの接続が切れても終了させないように出来る「disown」"
date: 2022-06-12T12:30:00+09:00
description: "実行中のジョブをターミナルの接続が切れても終了させないように出来る disown の使い方"
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

# 【Linux】実行中のジョブを終了させない「disown」
実行中のジョブを終了させない `disown` の使い方。
実行したプログラムが思ったより時間がかかり終わらないけど~~帰りたい~~ターミナルを閉じたい時に使えます。

## disown の使い方
1. コマンドを実行
2. `Ctrl + z` でコマンドを中断
3. `jobs` で該当のジョブを確認
4. `bg` で該当のジョブをバックグランド化（該当のジョブ番号を指定
5. `disown` でターミナル接続を切っても実行（該当のジョブ番号を指定

```shell
# 1. コマンドを実行
sh -c 'echo "start `date`" && sleep 100 && echo "end `date`"' > disown.log
# 2. Ctrl + z で中断
# 3. jobs で該当のジョブを確認
[1]+  Stopped                 sh -c 'echo "start `date`" && sleep 100 && echo "end `date`"' > disown.log
# 4. bg でバックグランド処理（該当のジョブ番号を指定
bg %1
# 5. disown でターミナル接続を切っても実行（該当のジョブ番号を指定
disown %1
```
* `disown`, `bg` ジョブ番号なしだとカレントジョブに対して行います

### ちょっと応用
末尾に `&` を付けて最初からバックグランド実行させてからも出来ます。
```shell
# 1. コマンドを実行
sh -c 'echo "start `date`" && sleep 100 && echo "end `date`"' > disown.log &
# 2. jobs で該当のジョブを確認
[1]+  Stopped                 sh -c 'echo "start `date`" && sleep 100 && echo "end `date`"' > disown.log &
# 3. bg でバックグランド処理（該当のジョブ番号を指定
bg %1
# 4. disown でターミナル接続を切っても実行（該当のジョブ番号を指定
disown %1
```