---
title: "【GitHub】Markdown でブロックをハイライトにする方法"
date: 2022-09-14T05:00:00+09:00
description: "GitHub 上の Markdown でブロックをハイライトにする方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
- GitHub Markdown
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【GitHub】Markdown でブロックをハイライトにする方法
GitHub 上の Markdown でブロックをハイライトにする方法メモ

## ブロックハイライト
現在は `Note`, `Warning` にのみ対応している模様です。
試しに　`Error` とやってみましたが色は変わりませんでした。

```md
> **Note**
> This is a note

> **Warning**
> This is a warning

> **Error**
> This is a Error
```

以下のようになります。
![github-markdown-note-warning](/tech/2022/09/14/github-markdown-note-warning/note-warning.png "github-markdown-note-warning") 

## 参考
* <a href="https://github.com/community/community/discussions/16925" target="_blank" rel="nofollow noopener">[Markdown] An option to highlight a &quot;Note&quot; and &quot;Warning&quot; using blockquote (Beta) · Discussion #16925 · community/community</a>