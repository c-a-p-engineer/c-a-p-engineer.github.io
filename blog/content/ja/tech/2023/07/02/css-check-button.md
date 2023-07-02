---
title: "【CSS】ボタンみたいなチェックボックスを作る"
date: 2023-07-02T15:00:00+09:00
description: "今回はCSSを使用してボタンのようなチェックボックスを作ります。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- CSS
categories: 
- CSS
image: images/thumbnail/CSS3_logo_and_wordmark.svg
---

# 【CSS】ボタンみたいなチェックボックスを作る
今回はCSSを使用してボタンのようなチェックボックスを作ります。

## サンプルコード
HTMLとCSSのを使用して実装します。
```html
<label for="sample" class="chk_label">
  <input type="checkbox" id="sample" value="1" />チェック
</label>
```

```css
.chk_label {
  display: inline-block;
  padding: 10px;
  background-color: #ddd; /* 未チェック時の背景色 */
  color: #333; /* 未チェック時のテキスト色 */
  cursor: pointer;
  margin: 3px;
  border-radius: 25px;
  font-size: 1rem;
  transition: background-color 0.3s ease; /* 背景色の変化をスムーズにする */
}

.chk_label input[type="checkbox"] {
  display: none; /* チェックボックスを隠す */
}

.chk_label:has(input[type="checkbox"]:checked) {
  background-color: #007BFF; /* チェックされた時の背景色 */
  color: #fff; /* チェックされた時のテキスト色 */
}
```

### 注意
今僕が使用している Firefox 114.0.2 では対応していない模様。

以下のサイトで使用できるか確認してみてください。
<a href="https://caniuse.com/css-has" target="_blank" rel="nofollow noopener">Can I Use :has()</a>

今後対応する予定の模様です。
<a href="https://caniuse.com/css-has" target="_blank" rel="nofollow noopener">418039 – Implement the :has() pseudo class</a>

### Firefox で使用したい場合
Firefox は `about:config` ページより `layout.css.has-selector.enabled` の設定を `true` にすることで使用できるようになります。

## サンプル
実際に実装したものは以下になります。

<label for="sample" class="chk_label">
  <input type="checkbox" id="sample" value="1" />チェック
</label>

<style>
.chk_label{
  display: inline-block;
  padding: 10px;
  background-color: #ddd; /* 未チェック時の背景色 */
  color: #333; /* 未チェック時のテキスト色 */
  cursor: pointer;
  margin: 3px;
  border-radius: 25px;
  font-size: 1rem;
  transition: background-color 0.3s ease; /* 背景色の変化をスムーズにする */
}
.chk_label input[type="checkbox"] {
  display: none; /* チェックボックスを隠す */
}
.chk_label:has(input[type="checkbox"]:checked){
  background-color: #007BFF; /* チェックされた時の背景色 */
  color: #fff; /* チェックされた時のテキスト色 */
}
</style>

## 参考
* <a href="https://hexdocs.pm/ecto/3.10.2/Ecto.Schema.html#module-primitive-types" target="_blank" rel="nofollow noopener">Ecto.Schema Primitive types</a>