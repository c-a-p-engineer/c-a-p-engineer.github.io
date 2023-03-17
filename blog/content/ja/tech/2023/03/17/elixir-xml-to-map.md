---
title: "【Elixir】XMLを簡単に Map にしてくれる XmlToMap を使う"
date: 2023-03-17T12:30:00+09:00
description: "Elixir で標準で用意されてるXMLの読み込みのクセが強いので簡単に Map にしてくれる XmlToMap を使ってみました。"
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

# 【Elixir】XMLを簡単に Map にしてくれる XmlToMap を使う
Elixir で標準で用意されてるXMLの読み込みのクセが強いので簡単に Map にしてくれる XmlToMap を使ってみました。

## 環境
* Elixir 1.14.2

## XMLを普通に読み込んで見る
比較するためにいったん普通にXMLを読み込んでみます。

```exs
# XML文字列
xml_str = """
<todos>
  <todo id="1">
    <body>This is the body of to-do item #1</body>
    <priority>3</priority>
  </todo>
  <todo id="2">
    <body>This is the body of to-do item #2</body>
    <priority>1</priority>
  </todo>
  <todo id="3">
    <body>This is the body of to-do item #3</body>
    <priority>3</priority>
  </todo>
</todos>
"""

# XML を読み込む
{doc, []} = xml_str |> to_charlist() |> :xmerl_scan.string()

IO.inspect(doc)
```

出力結果がこちらになります。
中々に扱いづらい状態…
```exs
{:xmlElement, :todos, :todos, [], {:xmlNamespace, [], []}, [], 1, [],
 [
   {:xmlText, [todos: 1], 1, [], '\n  ', :text},
   {:xmlElement, :todo, :todo, [], {:xmlNamespace, [], []}, [todos: 1], 2,
    [{:xmlAttribute, :id, [], [], [], [todo: 2, todos: 1], 1, [], '1', false}],
    [
      {:xmlText, [todo: 2, todos: 1], 1, [], '\n    ', :text},
      {:xmlElement, :body, :body, [], {:xmlNamespace, [], []},
       [todo: 2, todos: 1], 2, [],
       [
         {:xmlText, [body: 2, todo: 2, todos: 1], 1, [],
          'This is the body of to-do item #1', :text}
       ], [], '/workspace', :undeclared},
      {:xmlText, [todo: 2, todos: 1], 3, [], '\n    ', :text},
      {:xmlElement, :priority, :priority, [], {:xmlNamespace, [], []},
       [todo: 2, todos: 1], 4, [],
       [{:xmlText, [priority: 4, todo: 2, todos: 1], 1, [], '3', :text}], [],
       '/workspace', :undeclared},
      {:xmlText, [todo: 2, todos: 1], 5, [], '\n  ', :text}
    ], [], '/workspace', :undeclared},
   {:xmlText, [todos: 1], 3, [], '\n  ', :text},
   {:xmlElement, :todo, :todo, [], {:xmlNamespace, [], []}, [todos: 1], 4,
    [{:xmlAttribute, :id, [], [], [], [todo: 4, todos: 1], 1, [], '2', false}],
    [
      {:xmlText, [todo: 4, todos: 1], 1, [], '\n    ', :text},
      {:xmlElement, :body, :body, [], {:xmlNamespace, [], []},
       [todo: 4, todos: 1], 2, [],
       [
         {:xmlText, [body: 2, todo: 4, todos: 1], 1, [],
          'This is the body of to-do item #2', :text}
       ], [], '/workspace', :undeclared},
      {:xmlText, [todo: 4, todos: 1], 3, [], '\n    ', :text},
      {:xmlElement, :priority, :priority, [], {:xmlNamespace, [], []},
       [todo: 4, todos: 1], 4, [],
       [{:xmlText, [priority: 4, todo: 4, todos: 1], 1, [], '1', :text}], [],
       '/workspace', :undeclared},
      {:xmlText, [todo: 4, todos: 1], 5, [], '\n  ', :text}
    ], [], '/workspace', :undeclared},
   {:xmlText, [todos: 1], 5, [], '\n  ', :text},
   {:xmlElement, :todo, :todo, [], {:xmlNamespace, [], []}, [todos: 1], 6,
    [{:xmlAttribute, :id, [], [], [], [todo: 6, todos: 1], 1, [], '3', false}],
    [
      {:xmlText, [todo: 6, todos: 1], 1, [], '\n    ', :text},
      {:xmlElement, :body, :body, [], {:xmlNamespace, [], []},
       [todo: 6, todos: 1], 2, [],
       [
         {:xmlText, [body: 2, todo: 6, todos: 1], 1, [],
          'This is the body of to-do item #3', :text}
       ], [], '/workspace', :undeclared},
      {:xmlText, [todo: 6, todos: 1], 3, [], '\n    ', :text},
      {:xmlElement, :priority, :priority, [], {:xmlNamespace, [], []},
       [todo: 6, todos: 1], 4, [],
       [{:xmlText, [priority: 4, todo: 6, todos: 1], 1, [], '3', :text}], [],
       '/workspace', :undeclared},
      {:xmlText, [todo: 6, todos: 1], 5, [], '\n  ', :text}
    ], [], '/workspace', :undeclared},
   {:xmlText, [todos: 1], 7, [], '\n', :text}
 ], [], '/workspace', :undeclared}
```

## XmlToMap を使ってみる
XMLを簡単にMapにしてくれるXmlToMapを使ってみます。

### 導入

`mix.exs` に `elixir_xml_to_map` を追加します。

```mix.exs
  defp deps do
    [
      {:elixir_xml_to_map, "~> 2.0"} # Add elixir_xml_to_map
    ]
  end
```

`mix deps.get` を実行してインストールします。

### 実装
実際に使ってみます。
```exs
xml_str = """
<todos>
  <todo id="1">
    <body>This is the body of to-do item #1</body>
    <priority>3</priority>
  </todo>
  <todo id="2">
    <body>This is the body of to-do item #2</body>
    <priority>1</priority>
  </todo>
  <todo id="3">
    <body>This is the body of to-do item #3</body>
    <priority>3</priority>
  </todo>
</todos>
"""

xml_map = XmlToMap.naive_map(xml_str)
IO.inspect(xml_map)
```

Mapになってこれで扱いやすい形になりました。
```exs
%{
  "todos" => %{
    "todo" => [
      %{
        "#content" => %{
          "body" => "This is the body of to-do item #1",
          "priority" => "3"
        },
        "-id" => "1"
      },
      %{
        "#content" => %{
          "body" => "This is the body of to-do item #2",
          "priority" => "1"
        },
        "-id" => "2"
      },
      %{
        "#content" => %{
          "body" => "This is the body of to-do item #3",
          "priority" => "3"
        },
        "-id" => "3"
      }
    ]
  }
}
```

## 参考
* <a href="https://pspdfkit.com/blog/2018/how-to-parse-xml-documents-in-elixir/" target="_blank" rel="nofollow noopener">How to Parse XML Documents in Elixir | PSPDFKit</a>
* <a href="https://hexdocs.pm/elixir_xml_to_map/readme.html" target="_blank" rel="nofollow noopener">XmlToMap — elixir_xml_to_map v3.0.0</a>
* <a href="https://github.com/homanchou/elixir-xml-to-map" target="_blank" rel="nofollow noopener">homanchou/elixir-xml-to-map</a>
