---
title: 【Elixir】サーバーから特定要素のイベントを実行する
date: 2023-09-11T19:00:00+09:00
description: Elixir Phoenix でサーバーから特定の要素のイベントを実行する方法のメモ
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

# 【Elixir】Phoenix 独自に定義したイベントを実行する方法
Elixir Phoenix でサーバーから特定の要素のイベントを実行する方法のメモ。

`push_event` と組み合わせて特定の要素に設定されたイベントを実行します。
<a href="https://hexdocs.pm/phoenix_live_view/0.19.5/Phoenix.LiveView.html#push_event/3">Phoenix.LiveView.html#push_event/3</a>

たとえばダイアログを出して入力後にダイアログを閉じたいとかの時に使用できます。

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

## テンプレート
まずは簡単にテンプレート側を書いてみます。
```html
<button id="show" phx-click={JS.show(to: "#sample")} type="button">表示</button>
<button id="hidden" phx-click={JS.hide(to: "#sample")} type="button">非表示</button>
<div id="sample">
    <button phx-click="event" type="button">非表示</button>
</div>
```

## イベントハンドラー
liveview側を書きます。

イベントハンドラーの実行部分だけになります。
```elixir
  @impl true
  def handle_event("event", _params, socket) do
    {
      :noreply,
      socket
      |> put_flash(:info, "閉じる！")
      |> push_event("js-exec", %{
        # イベントを実行する対象（クエリセレクタ）
        to: "#hidden",
        # イベントを実行する要素名
        attr: "phx-click"
      })
    }
  end
```

## JavaScriptにイベントを追加
`app.js` に以下のイベントリスナーを追加。

```js:assets/js/app.js
// 特定のイベントを実行する
window.addEventListener("phx:js-exec", ({detail}) => {
  // クエリセレクター
  document.querySelectorAll(detail.to).forEach(el => {
      // 要素のイベントを実行
      liveSocket.execJS(el, el.getAttribute(detail.attr))
  })
})
```

## 参考
* <a href="https://hexdocs.pm/phoenix_live_view/js-interop.html#handling-server-pushed-events" target="_blank" rel="nofollow noopener">Handling server-pushed events</a>
* <a href="https://fly.io/phoenix-files/server-triggered-js/" target="_blank" rel="nofollow noopener">Triggering JS from the server in LiveView: showing a spinner</a>
