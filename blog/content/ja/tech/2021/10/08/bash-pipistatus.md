---
title: "【bash】パイプした時の各終了ステータスを確認する"
date: 2021-10-08T18:00:00+09:00
description: "bash 利用時に | を利用してパイプする時がありますが、これがエラーになるとどこで落ちているかわからない時があります。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- bash
categories: 
- bash
image: images/thumbnail/Gnu-bash-logo.svg
---

# 【bash】パイプした時の各終了ステータスを確認する
`bash` 利用時に `|` を利用してパイプする時がありますが、これがエラーになるとどこで落ちているかわからない時があります。
`PIPESTATUS` を利用して確認します。

## サンプル

### 実行
``` bash
exit 0 | exit 1 | exit 2
```

### 確認方法

各パイプのステータスの確認
```
echo  ${PIPESTATUS[@]}
> 0 1 2
```

指定の位置のパイプのステータスを取得（0～
```
echo  ${PIPESTATUS[1]}
> 1
```

最後のステータスだけ確認する方法はこちら
この方法はパイプを使用してなくても可能です。
``` bash
echo $?
> 2
```