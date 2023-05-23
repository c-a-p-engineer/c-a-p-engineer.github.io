---
title: "【Elixir】クラスタ内のノードの起動、停止を感知する方法"
date: 2023-05-24T01:20:00+09:00
description: "Elixir でクラスタ構成でクラスタ内のノードの起動、停止を感知する方法"
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

# 【Elixir】クラスタ内のノードの起動、停止を感知する方法
Elixir でクラスタ構成でクラスタ内のノードの起動、停止を感知する方法

## 環境
* Elixir 1.14.2

## ノード起動・停止の感知するコード
ノードの起動、停止を実際に感知するコードは以下のようになります。
<a href="https://www.erlang.org/doc/man/net_kernel.html#monitor_nodes-1" target="_blank" rel="nofollow noopener">net_kernel.monitor_nodes/1</a> を使用してすべてのノードの起動、停止を感知します。

特定のノードのみを感知するなら <a href="https://hexdocs.pm/elixir/1.12/Node.html#monitor/2" target="_blank" rel="nofollow noopener">Node.monitor/2</a> も使用可能です。

```ClusterMonitor.ex
defmodule ClusterMonitor do
  use GenServer

  def start_link(_) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(state) do
    # 全てのノード起動・停止の感知
    :net_kernel.monitor_nodes(true)

    {:ok, state}
  end

  def handle_info({:nodedown, node}, state) do
    # ノード起動
    IO.puts("Node #{node} has stopped.")

    {:noreply, state}
  end

  def handle_info({:nodeup, node}, state) do
    # ノード停止
    IO.puts("Node #{node} has started.")

    {:noreply, state}
  end
end

```

感知用コードの設定を行います。
```lib/demo/application.ex
defmodule Demo.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # クラスタ監視
      {ClusterMonitor, name: :cluster_monitor}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Sdm.Supervisor]
    Supervisor.start_link(children, opts)
  end
end

```

## 参考
* <a href="https://www.erlang.org/doc/man/net_kernel.html#monitor_nodes-1" target="_blank" rel="nofollow noopener">net_kernel.monitor_nodes/1</a>
* <a href="https://hexdocs.pm/elixir/1.12/Node.html#monitor/2" target="_blank" rel="nofollow noopener">Node.monitor/2</a>
