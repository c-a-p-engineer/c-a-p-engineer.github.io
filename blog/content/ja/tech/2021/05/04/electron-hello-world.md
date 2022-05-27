---
title: "【Electron】Hello,World! を表示するまで"
date: 2021-05-04T08:30:00+09:00
LastMod: 2021-05-04T02:30:00+09:00
description: "Electron で Hello,World! を表示するまでを行っていきます。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Electron
categories: 
- Electron 
image: images/thumbnail/Electron_Software_Framework_Logo.svg
---

# Hello,World!
`Electron` で `Hello,World!` を出力するまでを行っていきます。
`Electron` 公式のチュートリアルを見て進めていきます。
<a href="https://www.electronjs.org/docs/tutorial/quick-start#quick-start-guide" target="_blank" rel="nofollow noopener">Quick Start Guide | Electron</a>

## 環境
* Ubuntu 20.04.2 LTS
* Node.js 14.16.0 LTS

## Hello,World!

### フォルダ構成

```
my-electron-app/
├── package.json
├── main.js
├── preload.js
└── index.html
```

### コマンド実行

``` bash
mkdir my-electron-app && cd my-electron-app
npm init -y
npm install -D electron
```

### ファイル作成

起動用のjs作成
``` js:main.js {linenos=table}
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

メインのHTML画面の作成
``` html:index.html {linenos=table}
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        We are using Node.js <span id="node-version"></span>,
        Chromium <span id="chrome-version"></span>,
        and Electron <span id="electron-version"></span>.
    </p>
</body>
</html>
```

起動時に読み込むjs作成
``` js:preload.js {linenos=table}
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
```

### package.json編集
`package.json` を以下のようにファイルを修正します。
``` json:package.json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

### 実行
以下のコマンドにて実行できます。
``` bash
npm start
```

![Hello,World!](/assets/blog/tech/2021/05/04/electron-hello-world/electron-hello-world.png "Hello,World!") 

実行時に `--no-sandbox` というエラーが出たら以下のリンクの対処を行ってください。
<a href="/blog/2021-05-01-electron-error-no-sandbox" target="_blank">【Electron】Running as root without --no-sandbox is not supported. エラーのの対処法</a>