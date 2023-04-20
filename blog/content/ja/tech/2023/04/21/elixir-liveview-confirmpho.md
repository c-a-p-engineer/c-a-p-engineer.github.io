---
title: "【Elixir】LiveView でボタンクリック時に確認ダイアログを簡単に出す方法"
date: 2023-04-21T01:30:00+09:00
description: "Elixir で LiveView でボタンクリック時に確認ダイアログを簡単に出す方法"
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

# 【Elixir】LiveView でボタンクリック時に確認ダイアログを簡単に出す方法
Elixir で LiveView でボタンクリック時に確認ダイアログを簡単に出す方法

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## サンプルコード
`data_confirm` の属性をつければ良いだけで簡単に確認ダイアログが出力されます。

```html:lib/demo_web/live/sample/index.html.heex..html
<form action="/your_action" method="post">
  <%= submit "Submit", data_confirm: "Are you sure?" %>
</form>
```

今回は `submit` で行いましたがボタンやリンクなどのタグでも同様にできる模様です。

## 参考
* <a href="https://hexdocs.pm/phoenix_html/3.3.1/Phoenix.HTML.Link.html" target="_blank" rel="nofollow noopener">Phoenix.HTML.Link — Phoenix.HTML v3.3.1</a>