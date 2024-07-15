---
title: "【CSS】文字数を超えた際に「･･･」を表示する方法"
date: 2023-09-21T18:30:00+09:00
description: "CSSを使ってテキストが一定の文字数や行数を超えた場合に「･･･」（省略記号）を表示する方法はいくつかあります。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- CSS
categories: 
- CSS
image: images/thumbnail/CSS3_logo_and_wordmark.svg
---

# 【CSS】文字数を超えた際に「･･･」を表示する方法
CSSを使ってテキストが一定の文字数や行数を超えた場合に「･･･」（省略記号）を表示する方法はいくつかあります。
この記事では、その主な方法を解説します。

## text-overflow プロパティ

この方法は一行のテキストに対して適用されます。

### コード例
```css
/* text-overflowを使用する例 */
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px; /* 任意の幅 */
}
```

### 使い方
HTML要素に `ellipsis` クラスを適用します。

```html
<div class="ellipsis">このテキストは一定の幅を超えると省略されます。</div>
```

<style>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px; /* 任意の幅 */
}
</style>
<div class="ellipsis">このテキストは一定の幅を超えると省略されます。</div>

## line-clamp プロパティ

この方法は複数行のテキストに対して適用されます。ただし、WebKitベースのブラウザ（Chrome, Safari）でのみ動作します。

### コード例
```css
/* line-clampを使用する例 */
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2行まで表示 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 使い方
HTML要素に `line-clamp` クラスを適用します。

```html
<div class="line-clamp">このテキストは<br>一定の幅を超えると<br>省略されます。</div>
```
<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2行まで表示 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
<div class="line-clamp">このテキストは<br>一定の行を超えると<br>省略されます。</div>

## 注意点
- `text-overflow` は一行のテキストにしか適用できません。
- 画面上では表示されませんが、HTML上に出力されてはいるので隠したい情報があるなら先にプログラミングで出力文字数を制限してください。

以上が、CSSで文字数を超えた際に「･･･」を表示する主な方法です。適切な方法を選んで、テキストの表示を制御しましょう。
