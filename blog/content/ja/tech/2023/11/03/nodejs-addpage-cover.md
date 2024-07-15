---
title: 【Node】PDFに表紙ページを追加して画像を貼り付ける
date: 2023-11-03T17:20:00+09:00
description: 技術同人としてPDFを作ったのですが表紙用の画像うまく貼り付けることができなかったので自作してみました。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Node.js
categories: 
- Node.js
image: images/thumbnail/Node.js_logo.svg
---

# 【Node】PDFに表紙ページを追加して画像を貼り付ける
技術同人としてPDFを作ったのですが表紙用の画像うまく貼り付けることができなかったので自作してみました。
今回はJavaScriptとPDF-Libライブラリを使用して、画像をPDFの新しいページの中央に配置する簡単なステップを紹介します。

## 必要なツール

- Node.js 18

- `pdf-lib` パッケージ
- `fs` モジュール
- `path` モジュール

## npm install

必要なパッケージをインストールします。
```bash
npm install pdf-lib
```

## サンプルコード

```javascript
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function addImageToPDF() {
  // 既存のPDFファイルを読み込む
  const pdfPath = path.join(__dirname, './target.pdf');
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // 表紙用の画像ファイルを読み込む
  const imagePath = path.join(__dirname, './sample.png');
  const imageBytes = fs.readFileSync(imagePath);
  const image = await pdfDoc.embedPng(imageBytes);

  // 既存のPDFのページサイズを取得
  const existingPage = pdfDoc.getPages()[0];
  const { width: pdfWidth, height: pdfHeight } = existingPage.getSize();

  // 新しいページを先頭に追加
  const newPage = pdfDoc.insertPage(0, [pdfWidth, pdfHeight]);

  // 画像のサイズを取得
  const imgWidth = image.width;
  const imgHeight = image.height;

  // 画像とページのアスペクト比を比較して、リサイズするスケールを計算
  const scaleWidth = pdfWidth / imgWidth;
  const scaleHeight = pdfHeight / imgHeight;
  const scale = Math.min(scaleWidth, scaleHeight);

  const newImgWidth = imgWidth * scale;
  const newImgHeight = imgHeight * scale;

  // 画像がページの中央に配置されるように座標を計算
  const x = (pdfWidth - newImgWidth) / 2;
  const y = (pdfHeight - newImgHeight) / 2;

  // 画像を新しいページに挿入
  newPage.drawImage(image, {
    x: x,
    y: y,
    width: newImgWidth,
    height: newImgHeight
  });

  // PDFを保存
  const pdfBytesModified = await pdfDoc.save();
  fs.writeFileSync(pdfPath, pdfBytesModified);
}

addImageToPDF().catch(console.error);

```


### コードのポイント

- `insertPage()` メソッドは、新しいページをPDFに挿入するのに使います。
- 画像を中央に配置するには、ページサイズと画像サイズのアスペクト比を考慮し、適切な`x`、`y`座標を計算します。
- `drawImage()` メソッドは、計算された座標に画像を配置します。

### まとめ
この方法を使えば、プログラミングの知識がある方なら簡単にPDFへの画像の中央配置が可能です。
レポート作成や電子出版に役立ててください。
