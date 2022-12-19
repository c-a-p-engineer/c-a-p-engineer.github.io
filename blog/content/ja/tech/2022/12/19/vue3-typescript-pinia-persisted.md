---
title: "【Vue3 + Typescript】Pinia のデータを永続化する方法"
date: 2022-12-20T00:30:00+09:00
description: "Vue3 & Typescript 環境で Pinia のデータを永続化する方法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Vue
categories: 
- Vue
image: images/thumbnail/vue.svg
---

# 【Vue3 + Typescript】pinia のデータを永続化する方法
Vue3 & Typescript 環境で Pinia のデータを永続化する方法メモ

## 環境情報
* Docker
* Vite 3.2.38
* Vue 3.0.9
* TypeScript 3.0.9
* Pinia 3.0.9

## pinia のデータを永続化する
今回 <a href="https://github.com/prazdevs/pinia-plugin-persistedstate" target="_blank" rel="nofollow noopener">prazdevs/pinia-plugin-persistedstate</a> を使用します。

### インストール
こちらに記載してる方法でインストールを進めていきます。
<a href="https://prazdevs.github.io/pinia-plugin-persistedstate/guide/" target="_blank" rel="nofollow noopener">Getting Started | pinia-plugin-persistedstate</a>

```
npm i pinia-plugin-persistedstate
```

`main.ts` にプラグインを追加します。
``` ts:main.ts {linenos=table,hl_lines=["2-5"]}
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

### 使用方法
使用方法は簡単で永続化するストアに `persist: true` のオプションを追加するだけです。

* option store の書き方
```ts
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      someState: 'hello pinia',
    }
  },
  persist: true,
})
```

* setup store の書き方
```ts
import { defineStore } from 'pinia'

export const useStore = defineStore(
  'main',
  () => {
    const someState = ref('hello pinia')
    return { someState }
  },
  {
    persist: true,
  },
)
```

## 他の永続化ライブラリ
僕は使用しませんでしたが他に以下のようなライブラリがあるようです。
* <a href="https://github.com/iendeavor/pinia-plugin-persistedstate-2" target="_blank" rel="nofollow noopener">iendeavor/pinia-plugin-persistedstate-2</a>
* <a href="https://github.com/Seb-L/pinia-plugin-persist" target="_blank" rel="nofollow noopener">Seb-L/pinia-plugin-persist</a>

## 参考
* <a href="https://prazdevs.github.io/pinia-plugin-persistedstate/guide/" target="_blank" rel="nofollow noopener">Getting Started | pinia-plugin-persistedstate</a>