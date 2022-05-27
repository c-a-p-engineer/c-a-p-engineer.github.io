---
title: "Windows で Docker failed to initialize の対処方法"
date: 2021-10-13T22:00:00+09:00
description: "Docker起動時に Docker failed to initialize というダイアログが出てきた時の対処方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# Windows で Docker failed to initialize の対処方法
Windows で Docker起動時に `Docker failed to initialize` というダイアログが出てきた時の対処方法メモ

## 対処方法
`%appdata%\Docker` のフォルダを削除する事で起動しました。
具体的には `C:\Users\{ユーザ名}\AppData\Roaming\Docker` のフォルダです。

## 参考
* <a href="https://github.com/docker/for-win/issues/3088" target="_blank" rel="nofollow noopener">Docker failed to initialize · Issue #3088 · docker/for-win</a>
