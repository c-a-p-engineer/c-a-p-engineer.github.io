---
title: "【Electron】ウィンドウの大きさを設定、制限する"
date: 2021-05-30T15:30:00+09:00
description: "Electronでウィンドウの大きさを設定、制限する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Electron 
categories: 
- Electron 
image: images/thumbnail/Electron_Software_Framework_Logo.svg
---

# ウィンドウの大きさを設定、制限する
Electronのウィンドウの大きさを設定、制限する。
ウィンドウの最小の大きさ、最大の大きさを設定します。

## サンプルコード
ウィンドウ生成時に以下の用に `minWidth` などを入れることによりウィンドウの最小、最大の大きさを設定してウィンドウサイズの制限が可能です。

```js:index.js
const window  = new BrowserWindow({
// 初期表示
width: 500,
height: 500,

// ウィンドウサイズの最小
minWidth : 300,
minHeight: 300,

// ウィンドウサイズの最大
maxWidth : 800,
maxHeight : 800,
})
```

## 参考
* <a href="https://stackoverflow.com/questions/37330332/electron-browserwindow-min-height-and-width-not-working-after-hide-show-meth" target="_blank" rel="nofollow noopener">javascript - electron BrowserWindow min height and width not working after hide() show() methods - Stack Overflow</a>