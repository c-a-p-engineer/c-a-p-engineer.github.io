---
title: "【bash】Git のローカルブランチが最新か判定するbashスクリプト"
date: 2021-05-17T09:00:00+09:00
description: "Git のローカルブランチが最新か判定するbashスクリプト"
draft: false
enableToc: true
enableTocContent: true
tags: 
- git
- bash
categories: 
- bash
image: images/thumbnail/Gnu-bash-logo.svg
---

# ローカルブランチが最新か判定するbashスクリプト
Git のローカルブランチが最新か判定するbashスクリプト

## bash

`cd /git/repo` は実際に調べたいディレクトリをしていしてください。

``` bash:git_pull.sh {linenos=table}
#!/bin/sh

cd /git/repo

changed=0
git remote update && git status -uno | grep -q 'Your branch is behind' && changed=1
if [ $changed = 1 ]; then
    # 更新
    git pull
    echo "Updated successfully";
else
    # 最新
    echo "Up-to-date"
fi
```

これを `cron` に設定することで自動的に最新にすることが出来ます。

## 参考
* <a href="https://stackoverflow.com/questions/3258243/check-if-pull-needed-in-git" target="_blank" rel="nofollow noopener">bash - Check if pull needed in Git - Stack Overflow</a>