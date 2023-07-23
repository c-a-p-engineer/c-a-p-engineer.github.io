---
title: "【Elixir】LiveView で使用するテンプレートファイルを変更する方法"
date: 2023-07-22T15:00:00+09:00
description: "Elixir LiveView で使用するテンプレートファイルを変更する方法"
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

# Elixir LiveView で使用するテンプレートファイルを変更する方法
Elixir の LiveView でテンプレートファイルを変更したい場合があります。
今回は対処方法についてまとめました。

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

## .heexファイル用ビューを追加
Viewを呼び出す用のファイルを定義します。

```elixir:lib/sample_web/views/page_view.ex
defmodule SampleWeb.PageView do
  use SampleWeb, :view
end

```

## テンプレートフォルダの設定
以下のファイルにテンプレートフォルダの root が定義されていますので確認してください。
僕の環境では `pattern` を追加しないとサブディレクトリを読み込んでくれませんでした。

```lib/sample_web.ex
      use Phoenix.View,
        root: "lib/sample_web/templates",
        pattern: "**/*", # サブディレクトリ用の設定
        namespace: SampleWeb
```

フォルダとファイルを生成
```bash
mkdir lib/sample_web/templates/live/sample
echo "sample 1" > lib/sample_web/templates/live/sample/sample_1.html.heex
echo "sample 2" > lib/sample_web/templates/live/sample/sample_2.html.heex
echo "sample default" > lib/sample_web/templates/live/sample/sample_default.html.heex
```

## 値によってテンプレートファイルを変更する
準備ができたので実際にLiveViewの処理を書きます。
`render/1` で使用するテンプレートファイルを振り分けます。

```elixir
defmodule SampleWeb.SampleLive do
  use SampleWeb, :live_view

  @impl true
  def mount(_param, _session, socket) do
    socket = assign(socket, :param, Enum.random(1..3))
    {:ok, socket}
  end

  def render(assigns) do
    # 条件によって使用するテンプレートファイルを変更する
    cond do
      assigns.param == 1 ->
        Phoenix.View.render(SampleWeb.PageView, "live/sample/sample_1.html", assigns)

      assigns.param == 2 ->
        Phoenix.View.render(SampleWeb.PageView, "live/sample/sample_2.html", assigns)

      true ->
        Phoenix.View.render(SampleWeb.PageView, "live/sample/sample_default.html", assigns)
    end
  end
end

```

これで値によって違うテンプレートファイルを呼び出すことが可能です。
