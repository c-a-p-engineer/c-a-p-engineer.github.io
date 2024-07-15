---
title: "【GitHub】GitHub Actions ファイルの存在チェック"
date: 2022-07-05T20:00:00+09:00
description: "GitHub Actions でファイルの存在チェックする方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】GitHub Actions ファイルの存在チェック
GitHub Actions でファイルの存在チェックする方法。

## ファイル存在チェック


### オプション
|変数|必須|説明|デフォルト|
|----|----|----|----|
|`files`|○|存在確認するためのファイルとディレクトリ（カンマ区切り）<br> [glob paterns](https://github.com/isaacs/node-glob).||
|`ignore_case`|x|ファイル名の大文字小文字の見分け|`true`|
|`follow_symbolic_links`|x|シンボリックリンクを対象にする|`true`|
|`allow_failure`|x|存在しなければエラーを出す|`false`|


### サンプル
`package.json, LICENSE, README.md` の存在をチェックする。
存在する場合は `files_exists` に `true`、存在しない場合は `false` が入る。

下記サンプルは `steps.check_files.outputs.files_exists` に変数が入る。
<a href="https://docs.github.com/ja/actions/using-jobs/defining-outputs-for-jobs" target="_blank" rel="nofollow noopener">Defining outputs for jobs - GitHub Docs</a>

```yml:.github/Workflow/file_exists.yml
name: "File existence check"

on: [push, pull_request]

jobs:
  file_existence:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v1

      - name: Check file existence
        id: check_files
        uses: andstor/file-existence-action@v1
        with:
          files: "package.json, LICENSE, README.md"

      - name: File exists
        if: steps.check_files.outputs.files_exists == 'true'
        # Only runs if all of the files exists
        run: echo All files exists!
```

## 参考
* <a href="https://github.com/marketplace/actions/file-existence" target="_blank" rel="nofollow noopener">File Existence · Actions · GitHub Marketplace</a>
* <a href="https://docs.github.com/ja/actions/using-jobs/defining-outputs-for-jobs" target="_blank" rel="nofollow noopener">Defining outputs for jobs - GitHub Docs</a>
