---
title: "【Elixir】Phoenix Liveview のファイルアップロードのテスト方法"
date: 2023-11-28T01:00:00+09:00
description: "Elixir Phoenix の Liveview のファイルアップロードのテスト方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Elixir
- Phoenix
categories: 
- Elixir
image: images/thumbnail/Official_Elixir_logo.png
---

# 【Elixir】Phoenix Liveview のファイルアップロードのテスト方法
Elixir Phoenix の Liveview のファイルアップロードのテスト方法

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## 対象のコード

テストをする対象のコードはこちらになります。

### Elixirファイル
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

    {:noreply,
     socket
     |> put_flash(:info, "ファイルアップロード完了")
     |> redirect(to: "/")}
  end
end

```


### テンプレートファイル

```html:lib/demo_web/live/file_upload/index.html.heex..html
<form id="post-form" phx-change="validate" phx-submit="save">
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

## テスト

実際のテスト処理を書きます。

### 前準備

テストの前にファイルアップロードに使用する画像を用意します。

ファイルアップロード用のディレクトリの作成とフェニックスのロゴをコピーします
。
```bash
$ mkdir test/support/upload_files
$ cp priv/static/images/phoenix.png test/support/upload_files/phoenix.png
```

### テストファイル

実際にテストを書くとこうなります

```test/demo_web/live/file_upload_test.exs
defmodule DemoWeb.Live.FileUploadTest do
  use DemoWeb.ConnCase

  import Phoenix.LiveViewTest

  test "FileUpload", %{conn: conn} do
    # ファイルアップロード処理
    assert index_live
            # ファイルアップロードのターゲット
            |> file_input("#post-form", :image, [
            # アップロードするファイルの情報
            %{
                # 名前
                name: "phoenix.png",
                # 種別
                type: "image/png",
                # 実ファイル
                content: File.read!("test/support/upload_files/phoenix.png")
            }
            ])
            # ファイルのアップロード処理
            |> render_upload("phoenix.png") =~ "phoenix.png"
  end
end
```

## 参考

* <a href="https://hexdocs.pm/phoenix_live_view/Phoenix.LiveViewTest.html#render_upload/3" target="_blank" rel="nofollow noopener">render_upload/3</a>
* <a href="https://qiita.com/the_haigo/items/6ad00175bb3d9c15b3ee#validation%E3%81%AE%E7%99%BA%E7%81%AB%E6%96%B9%E6%B3%95-20220418%E8%BF%BD%E8%A8%98" target="_blank" rel="nofollow noopener">LiveViewのlive_file_inputをテストする - Qiita</a>

## まとめ

今までPHPのFWのバージョンアップなど経験をしてきましたが、Phoenix はまだまだ新機能が作られたりするので破壊的なバージョンアップが続きそうなので注意が必要です。
