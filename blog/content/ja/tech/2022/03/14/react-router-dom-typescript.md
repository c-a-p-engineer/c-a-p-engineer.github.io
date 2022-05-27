---
title: "【React + TypeScript】 react-router-dom を使ってルーティングを実装する"
date: 2022-03-14T02:00:00+09:00
description: "【React + TypeScript】 react-router-dom を使ってルーティングを実装するためのメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- React
- TypeScript
categories: 
- React
- TypeScript
image: images/thumbnail/React_Logo.svg
---

# 【Git】 複数のコミットを rebase を使って1つにまとめる
【React + TypeScript】 `react-router-dom` を使ってルーティングを実装する

## 前提

* node 14.17.5
* react-router-dom 6.2.2

公式のチュートリアルを参考に進めます。
（公式のチュートリアルは `React` のため少々記載とは異なります。
* <a href="https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md" target="_blank" rel="nofollow noopener">React Router | Tutorial</a>

## 1.プロジェクト作成
```
npx create-react-app [プロジェクト名] --template typescript
```

## 2.react-router-dom インストール
```
cd [プロジェクト名]
npm install react-router-dom@6
```

## 3.ファイルの作成
各ページ用のファイルを作成します。
```
mkdir routes
touch routes/Expenses.tsx
touch routes/Invoices.tsx
```

## 4.ファイル修正

### ルーティングページ
```typescript:routes/Expenses.tsx
export default function Expenses() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Expenses</h2>
    </main>
  );
}
```

```typescript:routes/Invoices.tsx
export default function Invoices() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Invoices</h2>
    </main>
  );
}
```

### TOP画面
```typescript:App.tsx
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </div>
  );
}
```

### ルーティング設定
```typescript:index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/Expenses";
import Invoices from "./routes/Invoices";

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      // path URL
      // element 画面
      <Route path="/" element={<App />} />
      <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} />

      // 上記のパスに当てはまらない場合
      <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```


## 5.実行
```
# probably this
npm start

# or this
npm run dev
```

これで起動して画面が出ればOK。
あとは画面を増やしたり404ページを外出ししてあげたりなど工夫していけば良いでしょう。

## 参考
* <a href="https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md" target="_blank" rel="nofollow noopener">React Router | Tutorial</a>
