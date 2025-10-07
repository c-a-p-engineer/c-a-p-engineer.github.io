---
title: 【Elixir】Phoenix 独自に定義したJavaScriptを実行する方法
date: 2023-09-08T01:40:00+09:00
description: Elixir Phoenixで独自に定義したJavaScriptを実行する方法メモ。
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

# 【Elixir】Phoenix 独自に定義したJavaScriptを実行する方法
Elixir Phoenixで独自に定義したJavaScriptを実行する方法メモ。
なぜか僕の環境ではちょっと面倒だったのでメモしました。

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

## JavaScriptの定義
まずは適当にJavaScriptの関数を定義します。

```js:assets/js/custom.js
// モーダル表示する関数
window.addEventListener("custom:test", (event) => {
    console.log("custom:test")
    console.log(event.detail)
})
```

`app.js` に上記のファイルを `import` します。

```js:assets/js/app.js
// 以下を追加
import "./custom.js"
```

## 画面側
テンプレートファイルにテスト用ボタンを追加します。
```html
<button
    type="button"
    phx-click={JS.dispatch("custom:test", [ detail: %{hoge: "fuga"} ] )}>
    テストボタン
</button>
```

JavaScriptの実行は `Phoenix.LiveView.JS` の `dispatch` を使用します。
<a href="https://hexdocs.pm/phoenix_live_view/0.19.5/Phoenix.LiveView.JS.html" target="_blank" rel="nofollow noopener">Phoenix.LiveView.JS</a>

## 実行
実行してボタンをクリックすると下記の用に実行されます。
`event.detail` で渡された変数が使用できます。
```js
custom:test
{
    hoge: 'fuga',
    dispatcher: button
}
```

## 参考
* <a href="https://hexdocs.pm/phoenix_live_view/0.19.5/Phoenix.LiveView.JS.html#module-custom-js-events-with-js-dispatch-1-and-window-addeventlistener" target="_blank" rel="nofollow noopener">Custom JS events with JS.dispatch/1 and window.addEventListener</a>
