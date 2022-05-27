---
title: "【Electron】メニューバーを非表示にする方法"
date: 2021-05-08T19:30:00+09:00
description: "Electron でメニューバーを非表示にする方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Electron
categories: 
- Electron 
image: images/thumbnail/Electron_Software_Framework_Logo.svg
---

# メニューバーを非表示にする方法
Electron でメニューバーがデフォルトで表示されるため非表示にする方法

## 環境
* Ubuntu 20.04.2 LTS
* Node.js 14.16.0 LTS

## 通常
通常は下図のように上部にメニューバーが表示されます。
![メニューバー表示](/assets/blog/tech/2021/05/08/electron-nomenu/electron-menu.png "メニューバー表示") 

## メニューバー非表示
ソースは `Electron` の<a href="https://www.electronjs.org/docs/tutorial/quick-start#quick-start-guide" target="_blank" rel="nofollow noopener">Quick Start Guide | Electron</a>のものを使っています。

``` js:index.js {linenos=table, hl_lines=[12]}
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setMenu(null);

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

行12行目に `win.setMenu(null);` を追加してウィンドウのメニューに `null` を設定すれば良いだけです。

![メニューバー非表示](/assets/blog/tech/2021/05/08/electron-nomenu/electron-nomenu.png "メニューバー非表示") 