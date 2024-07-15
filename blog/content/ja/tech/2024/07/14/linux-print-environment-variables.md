---
title: "【Linux】Linuxで環境変数を一括表示する方法"
date: 2024-07-14T11:40:00+09:00
description: "環境変数は、システムやアプリケーションに設定情報を提供する重要な要素です。"
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

# 【Linux】Linuxで環境変数を一括表示する方法

環境変数は、システムやアプリケーションに設定情報を提供する重要な要素です。Linuxでは、環境変数を簡単に確認するためのコマンドがいくつか用意されています。この記事では、Linux環境で環境変数を一括して表示する方法について説明します。

## printenv コマンド
`printenv`コマンドは、環境変数を一括して表示するためのもっともシンプルな方法の1つです。

```sh
printenv
```

このコマンドを実行すると、すべての環境変数が名前と値のペアで表示されます。

## `env` コマンド
`env`コマンドも、現在のシェルセッションに設定されているすべての環境変数を表示します。

```sh
env
```

`env`コマンドは、環境変数の一覧を表示するだけでなく、特定の環境変数を一時的に設定してコマンドを実行する場合にも使用されます。

## `set` コマンド
`set`コマンドは、環境変数だけでなくシェル変数も含めてすべての変数を表示します。環境変数に加えて、シェルのローカル変数も表示されるため、より詳細な情報を確認することができます。

```sh
set
```

## フィルタリング

特定の環境変数のみを表示したい場合は、`grep`コマンドを組み合わせて使用できます。

### 例: `PATH`という名前の環境変数のみを表示する

```sh
printenv | grep PATH
```

## まとめ
- **printenv**: 環境変数をシンプルに表示する。
- **env**: 環境変数の一覧を表示する。
- **set**: 環境変数とシェル変数の両方を表示する。
- **grep**: 特定の環境変数をフィルタリングして表示する。

これらのコマンドを使い分けることで、Linux環境における環境変数の確認が簡単になります。日常的なシステム管理やトラブルシューティングに役立ててください。

## 参考

- <a href="https://www.gnu.org/software/coreutils/manual/html_node/printenv-invocation.html" target="_blank" rel="nofollow noopener">GNU Coreutils: printenv</a>
- <a href="https://www.gnu.org/software/coreutils/manual/html_node/env-invocation.html" target="_blank" rel="nofollow noopener">GNU Coreutils: env</a>
- <a href="https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html" target="_blank" rel="nofollow noopener">GNU Bash Manual: Shell Builtin Commands</a>
