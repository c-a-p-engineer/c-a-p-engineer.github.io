---
title: "【React + TypeScript】state が反映されないときは useEffect を使用する"
date: 2022-05-13T01:00:00+09:00
description: "state が反映されないときは useEffect を使用する"
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

# 【React + TypeScript】state が反映されないときは useEffect を使用する
`React` で `state` が反映されないときは `useEffect` を使用する。

## useEffect を使用する
`React` の `useEffect` を使用する。
<a href="https://ja.reactjs.org/docs/hooks-effect.html" target="_blank" rel="nofollow noopener">副作用フックの利用法 - React</a>

### 失敗例
まずはうまく更新されない時の失敗例です。
単純に左と右に入れられた数字を足し合わせるものになっています。

```javascript:src/App.tsx
import React, { useState } from "react";

const App = () => {
  // 左
  const [left, setLeft] = useState<int>();
  const changeLeft = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeft(event.target.value);
    setAns(parseInt(left) + parseInt(right));
  };

  // 右
  const [right, setRight] = useState<int>();
  const changeRight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRight(event.target.value);
    setAns(parseInt(left) + parseInt(right));
  };

  // 答え
  const [ans, setAns] = useState<int>();

  return (
    <div>
      <p>Input</p>
      <input type="number" value={left} onChange={changeLeft} /> + 
      <input type="number" value={right} onChange={changeRight} />
      <p>Anser</p>
      <span>{left} + {right} = {ans}</span>
    </div>
  );
};

export default App;
```

こうするとなぜか `{ans}` が遅れて更新されてしまいます。

### 原因
原因としては `state` の値が更新されるのは関数の実行後のためになります。
値を更新したつもりでも実際は値が更新されていないため即時に反映が行われません。

### useEffectを使用する
`useEffect` を使用することで簡単に解決ができます。

```javascript:src/App.tsx {linenos=table,hl_lines=["18-21"]}
import React, { useState, useEffect } from "react";

const App = () => {
  // 左
  const [left, setLeft] = useState<int>();
  const changeLeft = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeft(event.target.value);
  };

  // 右
  const [right, setRight] = useState<int>();
  const changeRight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRight(event.target.value);
  };

  // 答え
  const [ans, setAns] = useState<int>();
  useEffect(() => {
    // 答えを設定
    setAns(parseInt(left) + parseInt(right));
  }, [left, right]);

  return (
    <div>
      <p>Input</p>
      <input type="number" value={left} onChange={changeLeft} /> +
      <input type="number" value={right} onChange={changeRight} />
      <p>Anser</p>
      <span>
        {left} + {right} = {ans}
      </span>
    </div>
  );
};

export default App;
```

`useEffect` の第二引数に値を指定すれば該当の値をフックしてくれます。
これで即時に反映を行ってくれます。

## 参考
<a href="https://ja.reactjs.org/docs/hooks-effect.html" target="_blank" rel="nofollow noopener">副作用フックの利用法 - React</a>
