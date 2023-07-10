---
title: "【Elixir】Phoenix で静的ファイルを追加する"
date: 2023-03-09T12:30:00+09:00
description: "Elixir Phoenix の環境で静的ファイルを追加する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Elixir
- Phoenix
categories: 
- Elixir
- Phoenix
image: images/thumbnail/Official_Elixir_logo.png
image_description: 'Elixir ロゴ ©José Valim <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="nofollow noopener">CC 表示-継承 4.0</a>'
---

# 【Elixir】Phoenix で静的ファイルを追加する
Elixir Phoenix の環境で静的ファイルを追加する方法

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## 静的ファイルを追加する

1. `priv/static/` にフォルダを追加します。
2. `lib/demo_web/endpoint.ex` に追加したフォルダ名を追加
  * `only` の箇所に `hoge` 追加
```lib/demo_web/endpoint.ex {linenos=table,hl_lines=[5]}
  plug Plug.Static,
    at: "/",
    from: :sdm,
    gzip: false,
    only: ~w(assets fonts images favicon.ico robots.txt hoge)
```

3. `Routes.static_path` を使用してテンプレート側で使用する。
```html:lib/demo_web/templates/hoge/hoge.html.heex..html
    <img src={Routes.static_path(@conn, "/hoge/hoge.png")} alt="hoge"/>
```

これにより画像などの静的ファイルの呼び出しが可能になります。

## 参考
* <a href="https://hexdocs.pm/plug/1.14.0/Plug.Static.html" target="_blank" rel="nofollow noopener">Plug.Static — Plug v1.14.0</a>
