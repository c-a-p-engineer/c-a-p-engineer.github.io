---
title: "【Elixir】LiveView でパスワードが消えてしまう現象の解決方法"
date: 2023-03-31T13:30:00+09:00
description: "Elixir で LiveView でパスワードが消えてしまう現象がありました。その解決方法メモ。"
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

# 【Elixir】LiveView でパスワードが消えてしまう現象の解決方法
Elixir で LiveView でパスワードが消えてしまう現象がありました。
その解決方法メモ。

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## 現象
以下のような LiveView を使用してログインフォームを作ったところ、パスワード欄に入力した値が消える現象が時折発生。

```html:lib/demo_web/live/login/index.html.heex..html
  <.form
    let={f}
    for={@changeset}
    id="login-form"
    phx-change="validate"
    phx-submit="save">

  <%= label f, :email, "Email" %>
  <%= text_input f, :email %>
  <%= error_tag f, :email %>

  <%= label f, :password, "Password" %>
  <%= password_input f, :password %>
  <%= error_tag f, :password %>

  <div>
    <%= submit "Save", phx_disable_with: "Saving..." %>
  </div>
</.form>
```

## 原因
原因は **パスワードの入力値は再利用できない** とのことです。
これによってフォームのバリデーションチェックが走って `changeset` が返って来たタイミングで再利用できないため削除されてしまうようです。
* <a href="https://hexdocs.pm/phoenix_live_view/0.18.18/form-bindings.html#password-inputs" target="_blank" rel="nofollow noopener">Form bindings — Phoenix LiveView v0.18.18 #Password inputs </a>

## 対策
`changeset` の再設定時に**パスワードの値を変更しない**設定を入れることによって変更されなくなります。
具体的には `phx_update: "ignore"` を足して上げるだけで解決できます。
* <a href="https://hexdocs.pm/phoenix_live_view/0.18.18/dom-patching.html" target="_blank" rel="nofollow noopener">DOM patching & temporary assigns — Phoenix LiveView v0.18.18</a>

```html:lib/demo_web/live/login/index.html.heex..html {linenos=table,hl_lines=[13]}
  <.form
    let={f}
    for={@changeset}
    id="login-form"
    phx-change="validate"
    phx-submit="save">

  <%= label f, :email, "Email" %>
  <%= text_input f, :email %>
  <%= error_tag f, :email %>

  <%= label f, :password, "Password" %>
  <%= password_input f, :password, phx_update: "ignore" %>
  <%= error_tag f, :password %>

  <div>
    <%= submit "Save", phx_disable_with: "Saving..." %>
  </div>
</.form>
```

## 参考
* <a href="https://hexdocs.pm/phoenix_live_view/0.18.18/form-bindings.html#password-inputs" target="_blank" rel="nofollow noopener">Form bindings — Phoenix LiveView v0.18.18 #Password inputs </a>
* <a href="https://hexdocs.pm/phoenix_live_view/0.18.18/dom-patching.html" target="_blank" rel="nofollow noopener">DOM patching & temporary assigns — Phoenix LiveView v0.18.18</a>