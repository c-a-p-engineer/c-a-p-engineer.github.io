---
title: "【Elixir】LiveView でファイルをアップロードする"
date: 2023-04-23T12:00:00+09:00
description: "Elixir で LiveView で簡単にファイルをアップロードする方法メモ"
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

# 【Elixir】LiveView でファイルをアップロードする
Elixir で LiveView で簡単にファイルをアップロードする方法メモ

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## サンプルコード
サンプルコードでは以下のことをできるようになっています。
* ファイルのアップロード
* アップロードのキャンセル
* ドラッグ & ドロップでのファイルアップ
* ファイルの簡単なチェック

単純に実装しようとすると結構なコストなのですが簡単に実装できてありがたいです。

### Liveview
アップロードの設定などは以下のページに記載があります。
<a href="https://hexdocs.pm/phoenix_live_view/0.18.18/uploads.html" target="_blank" rel="nofollow noopener">Uploads — Phoenix LiveView v0.18.18</a>

```lib/demo_web/live/file_upload/index.ex
defmodule DemoWeb.FileUploadLive.Index do
  use DemoWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    {
      :ok,
      socket
      # アップロード設定
      |> allow_upload(:image, accept: ~w(.jpg .jpeg .png))
    }
  end

  @impl true
  def handle_event("validate", _params, socket) do
    {:noreply, socket}
  end

  @impl true
  def handle_event("cancel-entry", %{"ref" => ref}, socket) do
    # アップロードキャンセル
    {:noreply, cancel_upload(socket, :image, ref)}
  end

  @impl true
  def handle_event("save", _params, socket) do
    uploaded_file =
      consume_uploaded_entries(socket, :image, fn %{path: path}, entry ->
        # ファイルアップロード処理
        # path はファイルがアップロードされた場所
        # entry はアップされたファイル情報
        File.cp!(path, entry.client_name)
        entry.client_name
      end)

    # アップロードしたファイルを表示
    IO.inspect(uploaded_file)

    {:noreply,
     socket
     |> put_flash(:info, "ファイルアップロード完了")
     |> redirect(to: "/")}
  end
end

```


### テンプレートファイル

```html:lib/demo_web/live/file_upload/index.html.heex..html
<form phx-change="validate" phx-submit="save">
    <!-- アップロードされたらファイルアップ箇所は非表示 -->
    <div class="columns is-centered" style={ if @uploads.image.entries != [], do: "display:none" }>
    <!-- ファイルをドラッグ & ドロップでもアップロードすることが可能 -->
      <div class="file is-boxed" phx-drop-target={ @uploads.image.ref }>
        <label class="file-label">
          <%= live_file_input @uploads.image, class: "file-input" %>
          <span class="file-cta">
            <span class="file-label p-6">
              Choose a file…
            </span>
          </span>
        </label>
      </div>
    </div>
    <%=
    # アップロードされたら表示
    for entry <- @uploads.image.entries do %>
      <figure>
        <%= live_img_preview entry %>
        <figcaption><%= entry.client_name %></figcaption>
      </figure>
      <%=
      # アップロードキャンセルボタン
      submit gettext("Cancel"), type: "button", phx_click: "cancel-entry", phx_value_ref: entry.ref %>

      <%=
      # エラー表示
      for err <- upload_errors(@uploads.image, entry) do %>
        <p class="alert alert-danger"><%= err %></p>
      <% end %>
    <% end %>
    <%= submit gettext("Save"), phx_disable_with: gettext("Saving...") %>
</form>

```

このだけで簡単にファイルのアップロードが可能になります。

## 参考
* <a href="https://hexdocs.pm/phoenix_live_view/0.18.18/uploads.html" target="_blank" rel="nofollow noopener">Uploads — Phoenix LiveView v0.18.18</a>