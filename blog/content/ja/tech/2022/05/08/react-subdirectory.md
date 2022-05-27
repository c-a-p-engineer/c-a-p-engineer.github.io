---
title: "【React】サブディレクトリでReactを公開する"
date: 2022-05-08T18:00:00+09:00
description: "Reactをサブディレクトリ上で公開したい場合はビルドしたものを配置するだけではできません。Reactをサブディレクトリで公開する方法。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- React
categories: 
- React
image: images/thumbnail/React_Logo.svg
---

# 【React】サブディレクトリでReactを公開する
Reactをサブディレクトリ上で公開したい場合はビルドしたものを配置するだけではできません。
Reactをサブディレクトリで公開する方法。

## 原因
原因は通常通りにビルドすると `/static/` でファイルを読み込んでしまうため、ルートディレクトリ上に配置する必要があります。

## 解決

### package.json
`package.json` に `homepage` を追加する。
```json:package.json {linenos=table,hl_lines=[5]}
{
  "name": "app",
  "version": "0.1.0",
  "private": true,
  "homepage": "./",
  // 省略
}
```

### react-router-dom を使用している場合
`react-router-dom` を使用している場合だと上記対応だけでは不十分になります。
`https://c-a-p-engineer.github.io/dev-tool/` の `dev-tool` に配置する例です。

`package.json` に `homepage` を追加する。
```json:package.json {linenos=table,hl_lines=[5]}
{
  "name": "app",
  "version": "0.1.0",
  "private": true,
  "homepage": "/dev-tool",
  // 省略
}
```

`BrowserRouter` に `basename` を追加します。
これでURLのベースの設定を行えます。
```javascript:src/App.tsx {linenos=table,hl_lines=[10]}
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import JsonFormatPage from "./components/pages/JsonFormatPage";
import SqlFormatPage from "./components/pages/SqlFormatPage";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter basename="/dev-tool/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/json-format" element={<JsonFormatPage />} />
          <Route path="/sql-format" element={<SqlFormatPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
```