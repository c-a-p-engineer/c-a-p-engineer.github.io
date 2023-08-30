---
title: "【Elixir】LiveView の render が発火しない時の対処方法"
date: 2023-08-31T03:00:00+09:00
description: "Elixir LiveView の render が発火しないという現象が発生してちょっと泣きを見たのでメモ"
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

# 【Elixir】LiveView の render が発火しない時の対処方法
Elixir LiveView の `render` が発火しないという現象が発生してちょっと泣きを見たのでメモ。
`render` で使用するテンプレートの切り替えを行っていたのですが発火してくれなくて画面が更新されなくて数時間奮闘するハメに…

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

## render のイベント発火タイミング
ここに記載があります。
<a href="https://hexdocs.pm/phoenix_live_view/0.19.5/Phoenix.LiveView.html#module-life-cycle" target="_blank" rel="nofollow noopener">Phoniex LiveView#Life-cycle</a>

* 初期ロード: `mount/2` 関数が呼ばれた後、最初のHTMLが生成される。
* `assigns` 変更: `assigns` のデータが変更された場合。
* `handle_event/3`: イベントハンドラが呼ばれた後。
* `send_update/2`: 明示的に更新を要求する場合。

今回、僕がハマったのは `assigns` を変更したのにイベントが発火しませんでした。

## 問題のコード
問題が発生したのは下記のコードです。
下記のコードは `assigns` の中の `:id` のデータを消すためのコードです。
```elixir
  @impl true
  def handle_event("delete", _params, socket) do
    {
      :noreply,
      %{socket | assigns: Map.delete(socket.assigns, :id)}
    }
  end
```

## 原因
`assigns` のデータの削除だけでは `render` が発火しない模様です。
更新や登録では発火するのを確認しました。

## 対処方法
対処方法自体は簡単です。
適当なダミーデータを入れることより `render` の強制発火ができます。
これにより画面の更新が行われます。

```
  @impl true
  def handle_event("delete", _params, socket) do
    # 適当なダミーデータを入れて強制的に `render` を発火させる
    socket = socket.assign(socket, :dummy, System.system_time(:millisecond))}
    {
      :noreply,
      %{socket | assigns: Map.delete(socket.assigns, :id)}
    }
  end
```
