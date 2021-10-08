---
title: "【bash】パイプした時の各終了ステータスを確認する"
date: 2021-10-08T18:00:00+09:00
description: "BASH 利用児の"
draft: false
enableToc: true
enableTocContent: true
tags: 
- bash
categories: 
- bash
image: images/thumbnail/Gnu-bash-logo.svg
---

# パイプした時の各終了をステータスを確認するパイプステータス
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

最後のステータスだけ確認する方法はこちら
``` bash
echo $?
> 2
```