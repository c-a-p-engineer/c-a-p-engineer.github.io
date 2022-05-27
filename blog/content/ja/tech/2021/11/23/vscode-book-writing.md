---
title: "VSCodeで同人誌の技術本執筆環境を作った"
date: 2021-11-23T14:00:00+09:00
description: "VSCodeで同人誌の技術本執筆環境を作った。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Visual Studio Code
categories: 
- エディタ
image: images/thumbnail/Visual_Studio_Code_1.35_icon.svg
image_description: 'Visual Studio Codeは、米国およびその他の国におけるMozillaFoundationの商標です。'
---

# VSCodeで同人誌の技術本執筆環境を作った
技術本執筆をしたいと思っていましたが、中々執筆環境をどうしようか悩んでいろいろなツールを試してましたが、VSCodeで執筆環境お整えてみました。

## 環境構築
<a href="https://github.com/c-a-p-engineer/vscode-md2pdf" target="_blank" rel="nofollow noopener">VSCode執筆環境用リポジトリ</a>を作成しておりますのでこちらを利用するのも良いかも知れません。

VSCodeに以下のプラグインのインストールを行います。
* <a href="https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf&ssr=false#review-details" target="_blank" rel="nofollow noopener">Markdown PDF</a>
Markdown → PDF 変換
* <a href="https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced" target="_blank" rel="nofollow noopener">Markdown Preview Enhanced</a>
Markdownプレビュー
* <a href="https://marketplace.visualstudio.com/items?itemName=analytic-signal.preview-pdf" target="_blank" rel="nofollow noopener">PDF Preview</a>
PDF プレビュー
* <a href="https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio" target="_blank" rel="nofollow noopener">Draw.io Integration</a>
`Draw.io` 画像制作用
* <a href="https://marketplace.visualstudio.com/items?itemName=ICS.japanese-proofreading" target="_blank" rel="nofollow noopener">テキスト校正くん</a>
テキスト校正用

## 設定
VSCodeの設定ファイルは以下のようにしてすると `.md` 保存時に自動的に `pdf` ファイルを自動的に出力してくれるようになります。
細かい設定に方法にツイては各プラグインのページを見てください。
```.vscode\settings.json
    /*
     * Markdown PDF
     */
    // 改行
    "markdown-pdf.breaks": true,
    // css
    "markdown-pdf.styles": [
        "./css/style.css",
    ],
    // 余白
    "markdown-pdf.margin.top": "2cm",
    "markdown-pdf.margin.bottom": "3.5cm",
    "markdown-pdf.margin.right": "2cm",
    "markdown-pdf.margin.left": "2cm",
    // 保存時自動変換
    "markdown-pdf.convertOnSave": true,
    // 出力フォルダ
    "markdown-pdf.outputDirectory": "./output/",
    // header/footer 表示
    "markdown-pdf.displayHeaderFooter": true,
    // 自動変換除外ファイル
    "markdown-pdf.convertOnSaveExclude": [
        "README.md",
    ],

    /*
     * Markdown Preview Enhanced
     */
     // 改行設定
    "markdown.preview.breaks": true
```

## 参考
* <a href="https://qiita.com/reona396/items/8ad9a4ca59f10257e073" target="_blank" rel="nofollow noopener">VS CodeとMarkdownで書いた技術同人誌に導入したCSS組版 - Qiita</a>
