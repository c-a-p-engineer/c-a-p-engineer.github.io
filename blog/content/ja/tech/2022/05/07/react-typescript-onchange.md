---
title: "【React + TypeScript】イベントから型を指定して渡す方法"
date: 2022-05-07T15:30:00+09:00
description: "Material UI を使用している際 onChange イベント時にせっかく TypeScript を使用しているのに unknown の型指定しか出来なかったため、対策時のメモ"
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

# 【React + TypeScript】イベントから型を指定して渡す方法
`Material UI` を使用している際 `onChange` イベント時にせっかく `TypeScript` を使用しているのに `unknown` の型指定しか出来なかったため、対策時のメモ

## 環境
* React 5.0.0
* TypeScript 4.5.5
* Material UI 4.12.4

## onChangeイベントから受け取る（失敗例
`Material UI`のページの通りにすると `value: unknown` と型指定ができません。
<a href="https://mui.com/material-ui/react-select/" target="_blank" rel="nofollow noopener">React Select component - Material UI</a>

```javascript:src/App.tsx
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";

const App = () => {
  const [age, setAge] = React.useState("");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default App;
```

## 型を指定して渡す（成功例
`onChange={(e) => handleChange(e.target.value as string)}` と変更して `handleChange` 実行前に `string`型とすることで `unknown` を避けることができます。

```javascript:src/App.tsx
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";

const App = () => {
  const [age, setAge] = React.useState("");
  const handleChange = (value: string) => {
    setAge(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={(e) => handleChange(e.target.value as string)}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default App;
```

## 参考
* <a href="https://mui.com/material-ui/react-select/" target="_blank" rel="nofollow noopener">React Select component - Material UI</a>
* <a href="https://github.com/mui/material-ui/issues/16065" target="_blank" rel="nofollow noopener">[Select] `onChange` parameter has `unknown` type in `Select` component · Issue #16065 · mui/material-ui</a>
