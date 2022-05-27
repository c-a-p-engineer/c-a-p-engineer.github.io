---
title: "【Git】git で自動的に prune する"
date: 2021-12-31T15:50:00+09:00
description: "不要になったブランチを取り除くために prune を自動的に行う設定メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# 【Git】git で自動的に prune する
不要になったブランチを取り除くために `prune` を自動的に行う設定メモ
`prune` は Gitで削除されたリポジトリをローカルから取り除くためのコマンドです。

## pull 時に手動で行う
一応 pull時に手動 prune する方法
```shell
git pull --prune
```

## Git 全体に設定
Gitに設定して `fetch` する際に自動的に削除
```
git config --global fetch.prune true
```

## 特定リポジトリにのみ有効化する
```
git config remote.origin.prune true
```

## Git Bash 以外でも prune させる
この設定がないと `TortoiseGit` などのGit GUIツールで動かないことがあるようです。
```
git config --global gui.pruneDuringFetch true
```

## 参考情報
* <a href="https://stackoverflow.com/questions/18308535/automatic-prune-with-git-fetch-or-pull" target="_blank" rel="nofollow noopener">Automatic prune with Git fetch or pull - StackOverflow</a>
