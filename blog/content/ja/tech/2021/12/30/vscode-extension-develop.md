---
title: "【VSCode】VSCodeのプラグイン開発を始める"
date: 2021-12-30T02:10:00+09:00
description: "VSCodeのプラグイン開発を始めるためのメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Visual Studio Code
categories: 
- VSCodeExtension
image: images/thumbnail/Visual_Studio_Code_1.35_icon.svg
image_description: 'Visual Studio Codeは、米国およびその他の国におけるMozillaFoundationの商標です。'
---

# 【VSCode】VSCodeのプラグイン開発を始める
VSCodeのプラグイン開発を始めるためのメモ

## 1. 環境の用意
私の場合は `Docker` と `.devcontainer` を使用しました。

`.devcontainer` はこちらのものを使用しました。
* <a href="https://github.com/masoncusack/nodejs-typescript-dev-container" target="_blank" rel="nofollow noopener">masoncusack /
nodejs-typescript-dev-container</a>

## 2. ジェネレーターインストール
最初に VSCode の拡張機能のジェネレーターをインストールします。
```shell
npm install -g yo generator-code
```

## 3. 雛形の作成
`yo code` とコマンドを打つと以下のように雛形の作成が始まります。
```shell
     _-----_     ╭──────────────────────────╮
    |       |    │   Welcome to the Visual  │
    |--(o)--|    │   Studio Code Extension  │
   `---------´   │        generator!        │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

? What type of extension do you want to create?
? What's the name of your extension?
? What's the identifier of your extension?
? What's the description of your extension?
? Initialize a git repository?
? Bundle the source code with webpack?
? Which package manager to use?
? Do you want to open the new folder with Visual Studio Code?
```

* ? What type of extension do you want to create?
    * 拡張機能のタイプ
* ? What's the name of your extension? 
    * 拡張機能名
* ? What's the identifier of your extension?
    * 拡張機能のID
* ? What's the description of your extension? 
    * 拡張機能の説明
* ? What's your publisher name?
    * 公開者
* ? Initialize a git repository?
    * git の初期化

## 4.プラグインの確認
テンプレートを作成すると `Hello,World` が表示されるプラグインが作られます。
テンプレートが作成されたディレクトリをルートディレクトリになるようにVSCodeを開きます。
1. `F5` を押すとデバックが実行され、デバック時に新たなVSCodeが開きます。
2. 開いたVSCode側で `Ctrl + Shift + P` でコマンドパレットを開きます。
3. `Hello World` と入力
4. `Hello, World` とダイアログが表示されます。

## 5. パッケージ化
1. パッケージ化をするためにパッケージを入れます。
```shell
npm i -D vsce
```

2. パッケージ化を実行
※`README.md` がデフォルトのままだと警告が出て止まります。
```shell
npx vsce package
```

3. パッケージをインストールする
出力されたパッケージを指定してVSCodeにインストールする事が可能です。
```
code --install-extension helloworld-0.0.1.vsix
```

## 参考情報
* <a href="https://code.visualstudio.com/api/get-started/your-first-extension" target="_blank" rel="nofollow noopener">Your First Extension | Visual Studio Code Extension API</a>
* <a href="https://zenn.dev/tomi/articles/2021-03-26-vscode-extension" target="_blank" rel="nofollow noopener">vscodeの拡張機能を作ってみた - Zenn</a>
