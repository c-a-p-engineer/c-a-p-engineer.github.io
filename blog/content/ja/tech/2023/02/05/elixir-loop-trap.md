---
title: "【Elixir】ループの癖が強かった"
date: 2023-02-05T17:30:00+09:00
description: "Elixir 初心者の僕がループを使用してハマったことをメモしておきます"
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

# 【Elixir】ループの癖が強いかった
Elixir 初心者の僕がループを使用してハマったことをメモしておきます

## ハマったこと
Elixer で勉強用にコードを書いていて「渡された数値の回数 1～X までループして 1～X までの合計を出す」という単純な問題をやっていたのですが、これがハマった。

PHPでやろうとするとこんな感じのコードになるものですね
```php
<?php

function sum_number($num) {
    $sum = 0;
    for($i = 1; $i <= $num; $i++){
        $sum += $i;
    }
    return $sum;
}

# 1+2+3 = 6
echo sum_number(3);
```

Elixirで以下のようなコードを最初に書きました。
```exs
defmodule MyModule do
  def sum_number(n) do
    sum = 0

    for i <- 1..n do
      sum = sum + i
    end

    sum
  end
end

IO.puts MyModule.sum_number(3)
```

そしてこんなエラーが出ました。

```
warning: variable "sum" is unused (there is a variable with the same name in the context, use the pin operator (^) to match on it or prefix this variable with underscore if it is not meant to be used)
  Main.exs:6: MyModule.sum_number/1
```
`sum` 使ってない→使ってる！

```
warning: the result of the expression is ignored (suppress the warning by assigning the expression to the _ variable)
  Main.exs:6
```
`sum` 使ってないから `_` 付けてね→使ってる！

## エラー原因
エラーがの原因についてですがElixirは**ループ内の副作用をループ外に対して行わない**ようにしているようです。
そのためループ内でいくら変数を変えてもループ外に出たら反映されません。
<a href="https://www.tutorialspoint.com/elixir/elixir_loops.htm" target="_blank" rel="nofollow noopener">Elixir - loop</a>

## 対応
この場合は再帰を使って対応します。
```exs
defmodule MyModule do
　# 値 0 の場合 0を返す
  def sum_number(0), do: 0
  def sum_number(x) do
    x + sum_number(x-1)
  end
end

# 1+2+3 = 6
IO.puts MyModule.sum_number(3)
```

他言語とのループの差で最初つまづきそうな気がします。

### 補足
一応再帰やループを使わずにこんなふうにもできる模様です。
```exs
defmodule MyModule do
  def sum_number(x) do
    Enum.sum(1..x)
  end
end

# 1+2+3 = 6
IO.puts MyModule.sum_number(3)
```

## 参考
* <a href="https://www.tutorialspoint.com/elixir/elixir_loops.htm" target="_blank" rel="nofollow noopener">Elixir - loop</a>

