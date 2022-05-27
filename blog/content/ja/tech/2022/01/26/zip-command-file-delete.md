---
title: "Zipコマンドで特定のファイルを削除する"
date: 2022-01-22T18:00:00+09:00
description: "Zipコマンドで特定のファイルを削除するメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Linux
categories: 
- Linux
image: images/thumbnail/linux.png
---

# Zipコマンドで特定のファイルを削除する
Zipコマンドで特定のファイルを削除するメモ

## コマンド
圧縮されたファイルから特定のファイルを削除するコマンドは `--delete` or `-d` を付けることで可能です。

```shell
# ZIP化
zip -r function.zip ./*

# 不要ファイルを削除
zip --delete function.zip "*temp_dir*" "*temp*"```
```

色んなファイルをZIPに圧縮する場合、一々除外オプションを付けるより最後にこのコマンドを使って削除する方が楽です。

## 参考
* <a href="https://superuser.com/questions/600385/remove-single-file-from-zip-archive-on-linux" target="_blank" rel="nofollow noopener">
Remove single file from zip archive on Linux - Super User</a>
