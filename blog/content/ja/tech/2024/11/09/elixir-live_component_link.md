---
title: "【Elixir】Phoenix LiveView live_redirect内にlive_componentを配置する方法：aタグでシンプルに対応する"
date: 2023-11-08T13:00:00+09:00
description: Phoenix LiveViewを使って開発する際、`live_redirect`の内部に`live_component`を配置すると、コンパイルエラーが発生することがあります。
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

# 【Elixir】Phoenix LiveView live_redirect内にlive_componentを配置する方法：aタグでシンプルに対応する

Phoenix LiveViewを使って開発する際、`live_redirect`の内部に`live_component`を配置すると、コンパイルエラーが発生することがあります。このエラーは`live_component`が`live_redirect`内で正しく扱われないために発生します。この記事では、このエラーの原因と、`a`タグでシンプルに解決する方法を解説します。実際のサンプルコードを用いながら、エラーの回避方法について説明します。

## live_redirect内でlive_componentを使ったときに発生するエラー

たとえば、以下のように`live_redirect`の内部に`live_component`を配置しようとするとエラーが発生します。

```elixir
<%= live_redirect to: Routes.page_path(@socket, :show, entry.id) do %> 
  <.live_component module={MyAppWeb.MyComponent} id="component_id" some_data="data" />
<% end %>
```

このコードをコンパイルすると、以下のようなエラーが表示されます：

```
** (ArgumentError) cannot convert component MyAppWeb.MyComponent with id "component_id" to HTML.
A component must always be returned directly as part of a LiveView template.
```

これは、`live_redirect`ブロック内で直接`<.live_component />`を使うことがサポートされていないために発生します。Phoenixでは、`live_component`を他のHTML要素やコンテンツタグでラップすることができません。この制約をクリアするために、`a`タグを活用します。

---

## エラーの原因と解決方法

Phoenix LiveViewでは、HTML要素や`content_tag`で囲んで`<.live_component />`を配置すると、内部的に`live_component`がHTMLに変換されようとします。ですが、`live_component`はテンプレートで直接使用されることが求められているため、コンテンツタグ内に配置されるとエラーになります。

この問題を解決するには、`live_redirect`を`a`タグに置き換えることで、リンク機能を持つタグの内部に`live_component`を配置できます。

##  aタグでシンプルに実装する方法

`live_redirect`の代わりに、`<a>`タグを直接使用し、必要なデータを`data-phx-link`や`data-phx-link-state`属性として設定することで、LiveViewが要求する「リダイレクト機能」を持ったリンクとして動作します。以下に詳細なコードを示します。

### サンプルコード

#### 元のコード

まず、問題が発生する元のコード例を以下に示します：

```elixir
<%= live_redirect to: Routes.page_path(@socket, :show, entry.id) do %> 
  <.live_component module={MyAppWeb.MyComponent} id="component_id" some_data="data" />
<% end %>
```

#### 修正後のコード

このコードを、以下のように修正します。

```elixir
<a href={Routes.page_path(@socket, :show, entry.id)} 
    data-phx-link="redirect" 
    data-phx-link-state="push">
    <.live_component 
      module={MyAppWeb.MyComponent} 
      id={"component_#{entry.id}"} 
      some_data="data" 
    />
</a>
```

#### 修正後のコードのポイント

1. **`<a>`タグの`href`属性**:
   - `live_redirect`の`to`の代わりに、`href`属性でリンク先を指定します。`Routes.page_path(@socket, :show, entry.id)`に動的なリンクを設定できます。
   
2. **`data-phx-link`属性**:
   - `data-phx-link="redirect"`で、クリック時にLiveViewがリダイレクトを認識できるようにします。
   
3. **`data-phx-link-state`属性**:
   - `data-phx-link-state="push"`にすることで、URLの履歴管理を行い、ブラウザの「戻る」操作などで正しく戻れるようにします。

4. **`<.live_component />`の配置**:
   - `<.live_component />`を`<a>`タグ内のどこにでも配置でき、たとえば評価用のコンポーネントやアイコンを配置する場合にも活用できます。

---

### まとめ

この記事では、Phoenix LiveViewで`live_redirect`の中に`live_component`を配置しようとしたときに発生するエラーとその解決方法について解説しました。`live_redirect`を`<a>`タグに置き換えることで、リダイレクト機能をそのままにして、`live_component`を任意の場所に配置できるようになります。

このような構造により、ページ遷移のリダイレクトリンクをカスタマイズしやすくなり、`live_component`を自由に組み込むことができるようになります。Phoenix LiveViewでのコンポーネントの利用をもっと効率化できるよう、ぜひこの方法を活用してみてください。
