---
title: "7zip を利用してドラッグ & ドロップで簡単にzip圧縮をさせる方法"
date: 2021-07-26T01:30:00+09:00
description: "時々、ファイルを色々と圧縮したいのですが手動でzip圧縮するのが辛いので対応してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- ツール
- Windows
categories: 
- ツール
image: images/thumbnail/file_icon_text_zip.png
---

# 7zip を利用してドラッグ & ドロップで簡単にzip圧縮をさせる方法
時々、ファイルを色々と圧縮したいのですが手動でzip圧縮するのが辛いので対応してみました。

## 前提
* Windows<br>※Windows10以外では確認しておりません。
* 7zip<br>インストールは <a href="https://sevenzip.osdn.jp/download.html" target="_blank" rel="nofollow noopener">ダウンロード | 7zip</a> からお願いします。

## ソースコード
メモ帳やエディタを開いてbatファイルを作成します。

```bat:zip.bat {linenos=table, hl_lines=[2]}
@echo off
set ZIP_PATH="C:\Program Files\7-Zip\7z.exe"
for %%f in (%*) do (
  %ZIP_PATH% a -tzip %%f.zip %%f
)
```

2行目の `ZIP_PATH` はご自分がインストールした `7z` のパスを指定してください。

## 使ってみる
ZIP化したいフォルダやファイルを選択して作成した `zip.bat` に落とすと元ファイルと同一場所に `***.zip` というファイルを順次作成してくれます。

## 参考
* <a href="https://mseeeen.msen.jp/batch-file-that-can-be-compressed-to-7z-by-drag-and-drop/" target="_blank" rel="nofollow noopener">ドラッグ＆ドロップで7zに圧縮できるバッチファイル</a>
