---
title: "【React + Webpack】You may need an appropriate loader to handle this file type 解決方法"
date: 2022-03-31T03:30:00+09:00
description: "React + Webpack の環境で You may need an appropriate loader to handle this file type の解決方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- React
categories: 
- React
image: images/thumbnail/React_Logo.svg
---

# 【React + Webpack】You may need an appropriate loader to handle this file type 解決方法
React + Webpack の環境で You may need an appropriate loader to handle this file type の解決方法メモ。


## エラー
ビルドすると以下のエラーが発生。
```
ERROR in ./src/index.css 1:5
Module parse failed: Unexpected token (1:5)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> body {
|   margin: 0;
|   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
 @ ./src/index.tsx 15:0-21

webpack 5.70.0 compiled with 1 error in 7589 ms
```
## 原因
Webpack がCSSを読み込めなくてエラーが発生。

## 対処方法

```
npm install --save-dev css-loader style-loader
```
* `css-loader`：Webpack がCSSをJavascriptに変換するloder
* `style-loader`：CSSをページに反映させるためのloder

```javascript:webpack.config.js
module.exports = {
  mode: 'production',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
};
```

これでCSSの読み込みと反映が出来るようになってエラーが解決します。

## 参考
<a href="https://github.com/shama/letswritecode/issues/8#issuecomment-367692271" target="_blank" rel="nofollow noopener">The issue for 'You may need an appropriate loader to handle this file type.' · Issue #8 · shama/letswritecode</a>
