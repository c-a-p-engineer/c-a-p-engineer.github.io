---
title: "【Docker】Docker Desktop で VPN を使用しているとwsl2でエラーが出る"
date: 2021-11-09T02:00:00+09:00
description: "Docker Desktop で VPN を使用しているとwsl2でエラーが出る"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/docker.png
---

# 【Docker】Docker Desktop VPN を使用しているとwsl2でエラーが出る
Docker Desktop で VPN を使用しているとwsl2でエラーが出る。

## 現象
Docker Desktop を `Hyper-v` から `wsl2` に切り替え。
切り替えて再起動後に Docker Desktop がエラーを出すようになりました。

## 原因
VPN を設定している事が原因でした。

## 対策
対策は以下のコマンドを使用してネットワーク情報を初期化します。

```
wsl --shutdown
netsh winsock reset
```

## 参考
* <a href="https://github.com/microsoft/WSL/issues/5351#issuecomment-645298068" target="_blank" rel="nofollow noopener">Error The attempted operation is not supported for the type of object referenced when using virtual network adapter on wsl2 · Issue #5351 · microsoft/WSL</a>