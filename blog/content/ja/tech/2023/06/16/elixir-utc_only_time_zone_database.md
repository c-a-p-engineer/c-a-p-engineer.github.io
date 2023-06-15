---
title: "【Elixir】タイムゾーンエラーの解決策"
date: 2023-06-16T01:30:00+09:00
description: "特定のタイムゾーンを指定して現在の日時を取得しようとするとエラーが発生することがあります。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Elixir
- Phoenix
categories: 
- Elixir
image: images/thumbnail/Official_Elixir_logo.png
image_description: 'Elixir ロゴ ©José Valim <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="nofollow noopener">CC 表示-継承 4.0</a>'
---

# 【Elixir】タイムゾーンエラーの解決策
Elixirで日付と時間を扱う際には、`DateTime`モジュールが一般的に使用されます。
しかし、特定のタイムゾーンを指定して現在の日時を取得しようとすると、`cannot get current datetime in "Japan" time zone, reason: :utc_only_time_zone_database`というエラーが発生することがあります。
このエラーの原因と解決策について詳しく説明します。

## エラーの原因
このエラーは、ElixirがデフォルトでUTCのみをサポートしているために発生します。
つまり、Elixirの`DateTime`モジュールは、デフォルトではUTC以外のタイムゾーンを認識できません。したがって、特定のタイムゾーン（この場合は"Japan"）を指定して現在の日時を取得しようとすると、上記のエラーが発生します。

## 解決策

この問題を解決するためには、タイムゾーンデータベースを提供するライブラリを導入する必要があります。
Elixirでは、この目的のために`tzdata`というライブラリが提供されています。
`tzdata`はIETFのTime Zone Databaseを使用して、世界中のすべてのタイムゾーンの情報を提供します。
<a href="https://hexdocs.pm/tzdata/1.1.1/readme.html" target="_blank" rel="nofollow noopener">Tzdata</a>

以下に、`tzdata`を導入してエラーを解決する手順を示します。

1. まず、`mix.exs`ファイルの`deps`関数に`tzdata`を追加します。

```elixir
defp deps do
  [
    {:tzdata, "~> 1.1"}
  ]
end
```

2. 次に、`config.exs`ファイルに以下の設定を追加します。

```elixir
config :elixir, :time_zone_database, Tzdata.TimeZoneDatabase
```

3. 最後に、プロジェクトの依存関係を更新します。

```bash
mix deps.get
```

これで、Elixirの`DateTime`モジュールは"Japan"などのタイムゾーンを認識できるようになります。以下に、"Japan"タイムゾーンで現在の日時を取得する例を示します。

```elixir
DateTime.now("Japan")
```

このコードを実行すると、日本の現在の日時が`DateTime`構造体として返されます。

## タイムゾーン一覧
各地のタイムゾーンのリストは以下で出力が可能です。

```elixir
iex> Tzdata.zone_list
```

また以下のようにするとタイムゾーンが検索できます。
```elixir
iex> Tzdata.zone_list |> Enum.filter(& String.contains?(&1, "Japan"))
["Japan"]
iex> Tzdata.zone_list |> Enum.filter(& String.contains?(&1, "Asia/Tokyo"))
["Asia/Tokyo"]
```

## まとめ
Elixirの`DateTime`モジュールはデフォルトでUTCのみをサポートしているため、特定のタイムゾーンで現在の日時を取得しようとするとエラーが発生することがあります。しかし、`tzdata`というライブラリを導入することで、この問題を解決ができます。
`tzdata`はIETFのTime Zone Databaseを使用して、世界中のすべてのタイムゾーンの情報を提供します。
これにより、Elixirの`DateTime`モジュールは任意のタイムゾーンを認識できるようになります。

Elixirで日付と時間を扱う際には、このようなエラーに遭遇することがありますが、適切なライブラリを導入することで解決することが可能です。
Elixirは柔軟性と拡張性が高い言語であるため、このような問題に対してもコミュニティが多くの解決策を提供しています。

この記事が、Elixirで日付と時間を扱う際のエラー解決の一助となれば幸いです。
