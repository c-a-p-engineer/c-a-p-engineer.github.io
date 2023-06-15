---
title: "【Elixir】Phoenixでのエラー解決: Stateful ComponentsのHTML Root Tag"
date: 2023-06-16T01:20:00+09:00
description: "ライブコンポーネント作成時に出たエラーの解決方法について調べてみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Elixir
- Phoenix
categories: 
- Elixir
image: images/thumbnail/Official_Elixir_logo.png
image_description: 'Elixir ロゴ ©José Valim <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="nofollow noopener">CC 表示-継承 4.0</a>'
---

# 【Elixir】Phoenixでのエラー解決: Stateful ComponentsのHTML Root Tag
ライブコンポーネント作成時に出たエラーの解決方法について調べてみました。

```
error on render/1 with id of "demo". Stateful components must have a single static HTML tag at the root
```

このエラーは、Stateful component (状態を保持するコンポーネント) が一つの静的なHTMLタグをルート（最上位）に持たなければならないという規則に違反している時に発生します。
これは、LiveViewでstatefulコンポーネントを扱う際の基本的なルールです。
これにより、Phoenixはコンポーネントのライフサイクルを正しく管理し、必要な更新を適切に行うことができます。

## 原因
基本的にコンポーネントの`render/1`関数が複数のルート要素をレンダリングしようとしている場合に発生します。

```elixir
def render(assigns) do
  ~L"""
  <input type="text" name="name" />
  <button>Send</button>
  """
end
```

この場合、`<input type="text" name="name" />`と`<button>Send</button>`の2つのルート要素があります。

## 解決方法

エラーを解消するには、すべてのマークアップを単一のルート要素でラップします。以下にその修正版を示します：

```elixir
def render(assigns) do
  ~L"""
  <div>
    <input type="text" name="name" />
    <button>Send</button>
  </div>
  """
end
```

このように修正することで、`<div>`が唯一のルート要素となり、内部に他の要素がネストされます。

## まとめ
Elixir Phoenixを使った開発で上記のエラーに遭遇した場合、必ずコンポーネントのルートには単一のHTML要素が存在することを確認してください。
これは、PhoenixがLiveViewコンポーネントのライフサイクルを管理するための基本的な要件です。

これでエラーが解消し、開発がスムーズに進むことを願っています。
