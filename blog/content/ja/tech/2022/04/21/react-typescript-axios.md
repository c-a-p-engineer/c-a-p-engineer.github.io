---
title: "【React + TypeScript】axiosを使ってAPIに接続する"
date: 2022-04-21T01:00:00+09:00
description: "【React + TypeScript】axiosを使ってAPIに接続するメモ"
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

# 【React + TypeScript】axios を使って API に接続する
axiosを使ってAPIに接続するメモ。
<a href="https://github.com/axios/axios" target="_blank" rel="nofollow noopener">axios</a>

## axios インストール
`axios` をインストールします。
```
npm install axios
```

## Get
サンプルは当ブログの記事を取得するようにしています。
```typescript:App.tsx
import axios from "axios";
import { useEffect, useState } from "react";

type Artical = {
  id: number;
  title: string;
  uri: string;
  description: string;
  section: string;
  tags: string[];
}

async function getArticals(): Promise<Artical[]> {
  try {
    // URL
    const url = "https://c-a-p-engineer.github.io/index.json";

    const response = await axios.get<Artical[]>(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return []
  }
}

export default function App() {
  const [articals, setArticals] = useState<[] |Artical[]>([]);

  useEffect(() => {
    (async () => {
      const articals = await getArticals();
      setArticals(articals);
    })();
  }, []);

  return (
    <div className="App">
    <h1>Blog Articals</h1>
      <ul>
        {articals.map((artical: Artical) => (
          <li key={artical.id.toString()}>{artical.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

```typescript:index.tsx
import { render } from "react-dom";
import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```

## Post
ちなみにpost時は以下のようになります。
※サンプルなので実際にコピペしても登録などはされません。
```typescript
async function getArticals(): Promise<Artical> {
  try {
    // URL
    const url = "https://c-a-p-engineer.github.io/index.json";
    const response = await axios.post<Artical>(url, {
          // POSTデータ
          title: "タイトル";
          description: "説明";
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return []
  }
}
```

## 参考
<a href="https://codesandbox.io/s/phc0l?file=/src/App.tsx:674-850" target="_blank" rel="nofollow noopener">React Typescript Axios</a>
