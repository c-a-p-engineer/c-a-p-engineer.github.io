---
title: "【TypeScript】axios の接続先のbaseurlなどの設定を行う"
date: 2022-12-11T02:00:00+09:00
description: "axios を使用する際に接続先のbaseurlなどの設定を行う方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- TypeScript
categories: 
- TypeScript
image: images/thumbnail/Typescript_logo_2020.svg
---

# 【TypeScript】axios の接続先のbaseurlなどの設定を行う
`axios` を使用する際に接続先のbaseurlなどの設定を行う方法。

## サンプル
僕の場合ですが、`AxiosBaseService.ts` を作成してそこで `axios` の共通設定を行います。
場合によっては `AxiosXXXXService.ts` を作成して接続先ごとに設定を変えられるような作りにしています。
```ts:src/services/AxiosBaseService.ts
import axios from "axios";

axios.defaults.baseURL = "http:\\localhost:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default axios
```

使用する際は `AxiosBaseService.ts` を `import` して使用します。
```ts:src/sample.ts
import Axios from './services/AxiosBaseService.ts'
Axios.get(`/sample`);
```

## 参考
* <a href="https://axios-http.com/docs/config_defaults" target="_blank" rel="nofollow noopener">Config Defaults | Axios Docs</a>
