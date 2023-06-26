---
title: "【Elixir】Phoenix push_event を活用してJavaScriptを実行する"
date: 2023-06-26T18:50:00+09:00
description: "Elixir push_event を活用してJavaScriptを実行する"
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

# 【Elixir】Phoenix push_event を活用してJavaScriptを実行する
ElixirのPhoenixフレームワークでは、サーバーからクライアントへのイベントをプッシュするための`push_event`という機能が提供されています。
これを利用することで、サーバー側からクライント側のJavaScriptに対してイベントを発行し、特定の操作を行うことが可能になります。
`push_event` を活用してJavaScriptを実行してみます。

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

## サーバーサイドのコード
まず、サーバーサイドで `push_event` を使用してイベントを発行します。
以下の例では、初期表示発の際に、`"alert"`というイベントをクライアントにプッシュしています。

```elixir
defmodule SampleWeb.Live.Index do
  use SampleWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    {
      :ok,
      |> push_event("alert", %{msg: "テスト"})
    }
  end
end
```

## クライアントサイドのコード
次に、クライアントサイドで`push_event`から発行されたイベントを受け取ります。
以下のJavaScriptコードは、`"alert"`イベントを受け取ったときに、メッセージを表示します。

```javascript:assets/js/app.js
let liveSocket = new LiveSocket(...);
window.addEventListener(`phx:alert`, (e) => {
  alert(e.detail.msg)
})
```

このように、Phoenixの`push_event`を使用することで、サーバーからクライアントへの通信が可能になります。


## 参考
* <a href="https://hexdocs.pm/phoenix_live_view/0.19.3/js-interop.html#handling-server-pushed-events" target="_blank" rel="nofollow noopener">Handling server-pushed events </a>