---
title: "【Vue】Viteのホットリロードが動かない時の対応方法"
date: 2022-12-08T00:30:00+09:00
description: "Dokcerで Vite + Vue3 + TypeScript で構成したフロントエンドがホットリロードが動かない時の対処法メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Vue
categories: 
- Vue
image: images/thumbnail/vue.svg
---

# 【Vue】Viteのホットリロードが動かない時の対応方法
Dokcerで Vite + Vue3 + TypeScript で構成したフロントエンドがホットリロードが動かない時の対処法メモ

## 環境情報
* Docker
* Vite 3.2.38
* Vue 3.0.9

## 対処方法
`vite.config.ts` にホットリロードの設定を追記する。
```ts:vite.config.ts {linenos=table,hl_lines=["3-7"]}
export default defineConfig({
  plugins: [vue()],
  server: {
    watch: {
      usePolling: true
    }
  }
})
```

## 参考
* <a href="https://qiita.com/kaazzo/items/53388e83d9587f50f856" target="_blank" rel="nofollow noopener">WSL2上のコンテナでの開発時にviteのホットリロードが効かない事象への対処法 - Qiita</a>
