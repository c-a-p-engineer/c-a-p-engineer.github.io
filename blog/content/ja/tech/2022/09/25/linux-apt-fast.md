---
title: "【Linux】apt-get の高速コマンド apt-fast 導入する"
date: 2022-09-25T17:00:00+09:00
description: "apt-get の高速コマンド apt-fast を導入するメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Linux
categories: 
- Linux
image: images/thumbnail/linux.png
---

# 【Linux】apt-get の高速コマンド apt-fast 導入する
`apt-get` の高速コマンド `apt-fast` を導入するメモ

## apt-fast 導入
### apt-fastを含むリポジトリを追加
```
add-apt-repository ppa:apt-fast/stable
```

ここで以下のようなエラーが出る場合。
```
bash: add-apt-repository: command not found
```

以下をインストールすることで解決できます。
```
apt-get install software-properties-common
```

### apt-fast インストール
`apt-fast` インストール
```
apt install apt-fast
```

`apt-fast` の設定ファイルは `/etc/apt-fast.conf`　に保存されます。
設定値の中には同時接続数などがあります。

### apt-fast を使用する
`apt-get` で使用していた箇所を `apt-fast` にして使用ができます。
