---
title: "【React + TypeScript】useState を利用してリアルタイムに入力値を反映させる"
date: 2022-05-02T12:00:00+09:00
description: "useState を利用してリアルタイムに入力値を反映させるメモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- React
- TypeScript
categories: 
- React
image: images/thumbnail/React_Logo.svg
---

# 【React + TypeScript】useState を利用してリアルタイムに入力値を反映させる
`useState` を利用してリアルタイムに入力値を反映させるメモ

## useState を使用する
React の `useState` を使用する。
<a href="https://ja.reactjs.org/docs/hooks-state.html" target="_blank" rel="nofollow noopener">ステートフックの利用法 - React</a>

### onChangeイベントを使用して値を設定する
`Onchange` のイベントを使用して変更時に値を設定します。
```javascript:src/App.tsx
import React, { useState } from "react";

const App = () => {
  // useState
  const [input, setInput] = useState<string>();

  // onChange Event
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <p>Input</p>
      <input name="input" type="text" value={input} onChange={changeInput} />
      <br />
      <p>{input}</p>
    </div>
  );
};

export default App;
```

### 直接値を設定する
`onChange`イベントから直接 `setInput`を呼び値を設定します。
関数化しないのでこちらの方が簡略化はできます。
```javascript:src/App.tsx
import React, { useState } from "react";

const App = () => {
  // useState
  const [input, setInput] = useState<string>();

  return (
    <div>
      <p>Input</p>
      <input
        name="input"
        type="text"
        value={input}
        onChange={(event) => setInput(event.currentTarget.value)}
      />
      <br />
      <p>{input}</p>
    </div>
  );
};

export default App;
```

## 参考
<a href="https://ja.reactjs.org/docs/hooks-state.html" target="_blank" rel="nofollow noopener">ステートフックの利用法 - React</a>
