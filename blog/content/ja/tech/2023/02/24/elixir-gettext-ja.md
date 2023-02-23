---
title: "【Elixir】gettext で日本語化をする（多言語対応"
date: 2023-02-24T02:00:00+09:00
description: "Elixir gettext で日本語化をする方法"
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

# 【Elixir】gettext で日本語化をする（多言語対応
Elixir gettext で日本語化をする方法

## 環境
* Elixir 1.14.2
* Phoenix 1.6.3

## インストール
まずはプロジェクト作成を行います。
```
mix phx.new my_app --no-ecto
```

## パッケージ追加
※Phoenix ではデフォルトでインストールされているようなので不要です。

`mix.exs` に `gettext` を追加します。
```mix.exs
  defp deps do
    [
      {:gettext, "~> 0.18"} # Add gettext
    ]
  end
```

### パッケージの取得 & コンパイル
パッケージの取得とコンパイルを行います。
```
mix do deps.get, deps.compile
```

### gettext のタスク
`mix help` を行うと `gettext` 関連のタスクが2つあります。
```
mix gettext.extract       # Extracts messages from source code
mix gettext.merge         # Merge template files into message files
```

* `mix gettext.extract` Elixirのソースコードからメッセージを抽出します。 <a href="https://hexdocs.pm/gettext/Mix.Tasks.Gettext.Extract.html" target="_blank" rel="nofollow noopener">mix gettext.extract</a>
* `mix gettext.merge` 言語ファイルをマージします。 <a href="https://hexdocs.pm/gettext/Mix.Tasks.Gettext.Merge.html" target="_blank" rel="nofollow noopener">mix gettext.merge</a>

## 言語ファイル
言語ファイルは `priv/gettext` の中に存在します。

### 翻訳対象文字列の抽出
ソースから翻訳対象の文字列を抽出します。
```
mix gettext.extract

Extracted priv/gettext/default.pot
Extracted priv/gettext/errors.pot
```

2ファイルが生成されます。
```
priv/gettext/LC_MESSAGES/
├──default.pot
└──errors.pot
```

### 言語ファイルの作成
`mix gettext.merge` を使用して日本語用言語ファイルを作成します。

```
mix gettext.merge priv/gettext --locale=ja
Created directory priv/gettext/ja/LC_MESSAGES
Wrote priv/gettext/ja/LC_MESSAGES/default.po (1 new message, 0 removed, 0 unchanged, 0 reworded (fuzzy), 0 marked as obsolete)
Wrote priv/gettext/ja/LC_MESSAGES/errors.po (21 new messages, 0 removed, 0 unchanged, 0 reworded (fuzzy), 0 marked as obsolete)
```

`priv/gettext/ja` に言語用ファイルが作成されます。

### 日本語ファイルを編集する
実際に日本語を設定します。

`msgid` がメッセージのIDになり、`msgstr` には翻訳内容を入れます。

```priv/gettext/default.pot
#: lib/demo_web/templates/page/index.html.heex:2
#, elixir-autogen, elixir-format
msgid "Welcome to %{name}!"
msgstr "ようこそ %{name}！"
```

## デフォルトの言語を変更する
`config.exs` に追記してデフォルト言語を日本語設定します。
```config/config.exs
config :gettext, :default_locale, "ja"
```

ここの文字列が日本語化されて表示されます。
```exs:lib/my_app_web/templates/page/index.html.heex..exs
<%= gettext "Welcome to %{name}!", name: "Phoenix" %>
```

これでWelcomeページの日本語化ができました。
![en](/tech/2023/02/24/elixir-gettext-ja/en.png "en") 
![ja](/tech/2023/02/24/elixir-gettext-ja/ja.png "ja") 
