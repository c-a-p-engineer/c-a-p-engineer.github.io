---
title: "【Elixir】Livebook でサクッと遊ぼう！"
date: 2023-01-07T14:30:00+09:00
description: "Elixer には Livebook というブラウザ上で動作するリッチな実行環境があります。今回はそれを使ってみます。"
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

# 【Elixir】Livebook でサクッと遊ぼう！

## 動かす方法
動かす方法は色々ある模様です。
（僕はDockerで動かしています。

公式サイト <a href="https://livebook.dev/" target="_blank" rel="nofollow noopener">Livebook.dev</a>

### Livebook アプリをインストール
<a href="https://livebook.dev/#install" target="_blank" rel="nofollow noopener">Livebook.dev #install</a> の左側からアプリをダウンロードしてインストールする。

### Fly.io で使う
<a href="https://livebook.dev/#install" target="_blank" rel="nofollow noopener">Livebook.dev #install</a> から `Fly.io` にデプロイして使う方法があります。
こちらは GitHub と連携してサクッとデプロイできました。

### Docker
* Dockerが入っている必要があります。
```
docker run -p 8080:8080 -p 8081:8081 --pull always livebook/livebook
```

起動すると `http://0.0.0.0:8080/?token=XXXXXXXXXXXXXXXXX` が出てくるので `0.0.0.0` を `localhost` にすると Livebook に入れます。

### ローカル環境にインストール
* Elixirが入っている必要があります。
```
mix do local.rebar --force, local.hex --force
mix escript.install hex livebook
livebook server
```

## Livebook を使ってみる
まずは初期画面の右上の `New notebook` で実行画面に移ります。
![Livebook](/tech/2023/01/07/elixir-livebook/Livebook.png "Livebook") 

とりあえず `Hello world` の表示確認をしてみます。
以下のコードを `Section` 部分入れて実行してみます。
```exs
IO.puts "Hello world"
```

入力したら左上の再生ボタン（▶）を押して実行してください
そうすると実行されます。
![Helloworld](/tech/2023/01/07/elixir-livebook/Helloworld.png "Helloworld") 

## かっこよくリアルタイムに表示されるグラフを書いてみる
こちらの記事のコードを利用させていただきました。
<a href="https://qiita.com/torifukukaiou/items/223ad0fe1aa67a9fb151" target="_blank" rel="nofollow noopener">Livebookを楽しむ (Elixir) - Qiita</a>

コードブロック下にマウスを当てると「+Code」と出てくるので別々にコードブロックを追加してください。

1. グラフを表示する
```exs
Mix.install([
  {:vega_lite, "~> 0.1.3"},
  {:kino, "~> 0.5.0"}
])

alias VegaLite, as: Vl

memory = [
  total: :red,
  processes: :yellow,
  atom: :green,
  binary: :pink,
  code: :orange,
  ets: :blue
]

layers = 
  for {layer, color} <- memory do
    Vl.new()
    |> Vl.mark(:line)
    |> Vl.encode_field(:x, "iteration", type: :quantitative)
    |> Vl.encode_field(:y, Atom.to_string(layer), type: :quantitative, title: "Memory usage (MB)")
    |> Vl.encode(:color, value: color, datum: Atom.to_string(layer))
  end

widget = Vl.new(width: 500, height: 200)
  |> Vl.layers(layers)
  |> Kino.VegaLite.new()
```

2. グラフに現在の値をリアルタイム更新させる
```exs
Kino.VegaLite.periodically(widget, 200, 0, fn i ->
  point =
    :erlang.memory()
    |> Enum.map(fn {type, bytes} -> {type, bytes / 1_000_000} end)
    |> Map.new()
    |> Map.put(:iteration, i)

  Kino.VegaLite.push(widget, point, window: 1000)
  {:cont, i + 1}
end)
```

3. for文で負荷を与えてみる
```exs
for i <- 1..1_000_000 do
  :"atom#{i}"
end
```

これらを実行するとこうなります。
![memory](/tech/2023/01/07/elixir-livebook/memory.gif "memory") 

## Livebookを使ってみての感想
通常のオンラインエディタと違って図や表をリアルタイムで表示されるのがとてもいい感じ。
リアルタイム共同編集もできるようでチーム内でサンプルコードなどを置くにはとても良いと思います。

Qiitaなどを見ててLivebookを使用しているのが図や表が多かったのは一々環境を作ったり面倒だったり、オンラインエディタ上では通常できないためものがLivebookのみで実行、確認ができるためだったのだと感じました。

## 参考
* <a href="https://livebook.dev/" target="_blank" rel="nofollow noopener">Livebook.dev</a>
* <a href="https://qiita.com/torifukukaiou/items/223ad0fe1aa67a9fb151" target="_blank" rel="nofollow noopener">Livebookを楽しむ (Elixir) - Qiita</a>

