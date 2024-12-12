---
title: "CSSでテキストを「...」で省略表示するシンプルな方法"
date: 2024-12-13T01:00:00+09:00
description: "長いテキストを省略表示したいときに、CSSだけで簡単に「...」を付ける方法をご紹介します。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- CSS
categories: 
- CSS
image: images/thumbnail/CSS3_logo_and_wordmark.svg
---

# CSSでテキストを「...」で省略表示するシンプルな方法

長いテキストを省略表示したいときに、CSSだけで簡単に「...」を付ける方法をご紹介します。この方法は、特定の行数でテキストを切り取るシンプルな実装です。

## 実装方法

以下のCSSコードをコピーして使用してください。

```css
.text-truncate {
  overflow: hidden; /* 表示領域を超えたテキストを非表示にする */
  display: -webkit-box; /* 行数制御を有効にする */
  -webkit-box-orient: vertical; /* テキストを縦方向に並べる */
  -webkit-line-clamp: 3; /* 最大3行に制限 */
}
```

## 使用例

以下のHTML構造にCSSクラスを追加するだけで機能します。

```html
<div class="text-truncate">
  長いテキストをここに挿入してください。このテキストは、3行を超えると「...」で省略されます。これにより、限られたスペースでコンテンツを簡潔に表示することができます。
</div>
```

試しに4行が入っている `div` を作っています。
<style>
.text-truncate {
  overflow: hidden; /* 表示領域を超えたテキストを非表示にする */
  display: -webkit-box; /* 行数制御を有効にする */
  -webkit-box-orient: vertical; /* テキストを縦方向に並べる */
  -webkit-line-clamp: 3; /* 最大3行に制限 */
}
</style>
<div class="text-truncate">
1行目<br>
2行目<br>
3行目<br>
4行目
</div>

3行目の最後に「…」が付くようになります。

## 動作の仕組み

- **`overflow: hidden`**: コンテンツがボックスの高さを超えた場合に非表示にします。
- **`display: -webkit-box`**: ボックス内のテキストを複数行で表示します。
- **`-webkit-box-orient: vertical`**: テキストを縦方向に配置します。
- **`-webkit-line-clamp`**: 表示する最大行数を設定します（例: 3行）。

---

## 注意点

この方法は現在、一部のブラウザ（主にWebkit系）でのみ動作します。最新ブラウザをターゲットにしている場合には問題ありませんが、古いブラウザのサポートを検討する際には他の方法を検討してください。

---

## 参考資料

* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp" target="_blank" rel="nofollow noopener">MDN Web Docs: -webkit-line-clamp</a>
  `-webkit-line-clamp` の公式ドキュメント。使用方法やブラウザ対応状況について詳しく解説されています。
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/overflow" target="_blank" rel="nofollow noopener">MDN Web Docs: overflow</a>
  CSSプロパティ `overflow` に関する詳細情報。要素の表示領域を超えた内容をどう処理するかを制御します。
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/display" target="_blank" rel="nofollow noopener">MDN Web Docs: display</a>
  `display` プロパティの公式ドキュメント。`-webkit-box` の意味と使い方を確認できます。
