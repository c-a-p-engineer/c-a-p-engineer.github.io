---
title: 【Elixir】EctoでChangesetからデータを取得する方法
date: 2024-03-11T12:30:00+09:00
description: Ectoの`changeset`の各フィールドからデータを取得したい時の対応。
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

# 【Elixir】EctoでChangesetからデータを効率的に取得する方法

Ectoの`changeset`の各フィールドからデータを取得したい時の対応。

## get_field 関数による特定フィールドのデータ取得

`get_field`関数は、`changeset`から特定のフィールドの現在の値を取得する際に使用します。この関数は、変更された値が存在する場合はその値を、そうでない場合は元の値を返します。

## 使用例

```elixir
# `changeset`から特定のフィールドの値を取得
value = Ecto.Changeset.get_field(changeset, :field_name)
# `value`は`:field_name`フィールドの値です
```

この関数は特定のフィールドからデータを取得したい時にとても助かります。
