---
title: "【TypeScript + Webpack】TypeScript emitted no output エラー解決"
date: 2022-03-30T02:30:00+09:00
description: "TypeScript & Webpack 環境で TypeScript emitted no output のエラーが出たので解決方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- TypeScript
categories: 
- TypeScript
image: images/thumbnail/TypeScript_logo.svg
---

# 【TypeScript + Webpack】TypeScript emitted no output エラー解決
TypeScript & Webpack 環境で TypeScript emitted no output のエラーが出たので解決方法メモ。

## エラー
TypeScript & Webpack の環境でビルドをした際に以下のエラーが発生。
```
ERROR in ./src/index.tsx
Module build failed (from ./node_modules/ts-loader/index.js):
Error: TypeScript emitted no output for /src/app/frontend/src/index.tsx.
    at makeSourceMapAndFinish (/src/app/frontend/node_modules/ts-loader/dist/index.js:52:18)
    at successLoader (/src/app/frontend/node_modules/ts-loader/dist/index.js:39:5)
    at Object.loader (/src/app/frontend/node_modules/ts-loader/dist/index.js:22:5)
```

## 原因
`tsconfig.json` の `noEmit` が `true` となっていたことが原因です。
TypeScript からファイルが出力されず、Webpackでまとめることが出来なかったようです。

## 解決方法
`tsconfig.json` から `noEmit` を削除すればビルドに成功します。

## 参考
* <a href="https://stackoverflow.com/a/55304691" target="_blank" rel="nofollow noopener">Webpack with typescript getting TypeScript emitted no output error - Stack Overflow</a>
* <a href="https://github.com/TypeStrong/ts-loader/issues/767" target="_blank" rel="nofollow noopener">Typescript emitted no output · Issue #767 · TypeStrong/ts-loader</a>
