---
title: "【Elixir】Ectoで個別にエラーを追加する方法"
date: 2024-03-13T19:00:00+09:00
description: "ElixirのEctoで個別にエラーを追加する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Elixir
categories: 
- Elixir
image: images/thumbnail/Official_Elixir_logo.png
image_description: 'Elixir ロゴ ©José Valim <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="nofollow noopener">CC 表示-継承 4.0</a>'
---

# 【Elixir】Ectoで個別にエラーを追加する方法

ElixirのEctoで個別にエラーを追加する方法。
ちょっと面倒な時にやる僕が個人的にやっている方法。

## 確認環境
* Elixir 1.14.2
* Phoenix 1.6.3

## Ectoスキーマの準備

まず、Ectoスキーマを定義します。この例では具体的なフィールドは定義しませんが、必要に応じて追加してください。

```elixir
defmodule Demo.Param do
  use Ecto.Schema
  import Ecto.Changeset

  embedded_schema do
    # 実際のフィールド定義をここに記述
  end
end
```

## エラーメッセージの追加

次に、特定の条件が満たされたときにエラーメッセージを追加します。これは、`Ecto.Changeset.add_error/3`関数を使用して行われます。

```elixir {linenos=table,hl_lines=[20]}
defmodule DemoWeb.Demo.Index do
  use DemoWeb, :live_view

  @impl true
  def mount(params, session, socket) do
    {
      :ok,
      socket
      |> assign(
        :changeset,
        Demo.Param.changeset(%Demo.Param{}, %{})
      )
    }
  end

  # バリデーション
  @impl true
  def handle_event("bulk-send", %{"param" => %{"test" => test}}, socket) do
    changeset = Demo.Schema.changeset(%Demo.Schema{}, %{})

    # エラー条件
    changeset = 
      if length(bulk_plans) > 0 do
        Ecto.Changeset.add_error(changeset, :message, "エラー")
      else
        changeset
      end
    # Actionの変更
    changeset = %{changeset | action: :validate}

    {:noreply,
     socket |> assign(:send_changeset, changeset)}
  end
end
```

## 参考
* <a href="https://hexdocs.pm/ecto/Ecto.Changeset.html#add_error/3" target="_blank" rel="nofollow noopener">Ecto.Schema Primitive types</a>
