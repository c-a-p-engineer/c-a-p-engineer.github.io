---
title: "【HTML】ポップアップを実現するpopoverの使い方"
date: 2025-04-20T16:00:00+09:00
description: 「popover属性」を使えば、JavaScriptを使わずに簡単なポップアップ（モーダルやツールチップ）を実装できます。
draft: false
enableToc: true
enableTocContent: true
tags: 
- HTML
categories: 
- HTML
image: images/thumbnail/html.png
---

# 【HTML】ポップアップを実現するpopoverの使い方

「popover属性」を使えば、JavaScriptを使わずに簡単なポップアップ（モーダルやツールチップ）を実装できます。
基本的な使い方からブラウザ対応状況、注意点までをわかりやすく解説します。

---

## popover属性とは？

`popover`属性は、任意のHTML要素をポップアップとして扱うためのグローバル属性です。この属性を指定した要素は、初期状態で非表示（`display: none`）となり、指定されたトリガー要素から表示・非表示を制御できます。

### サンプル


<style>
[popover] {
  padding: 1em;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
}

:popover-open {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
[popover]::backdrop {
  background: rgba(0, 0, 0, 0.3);
}
</style>
<button popovertarget="my-popover">ポップアップを開く</button>
<div id="my-popover" popover>
  こんにちは！これはポップアップの内容です。
</div>

### 基本的な構文


```html
<button popovertarget="my-popover">ポップアップを開く</button>
<div id="my-popover" popover>
  こんにちは！これはポップアップの内容です。
</div>
```

- `popovertarget`属性：ボタンや入力要素に指定し、対応するポップアップ要素のIDを設定します。
- `popover`属性：ポップアップとして機能させたい要素に指定します。

この例では、ボタンをクリックすると、`id="my-popover"`の`div`要素が表示されます。

---

## popover属性の値と挙動

`popover`属性には以下の値を指定できます：

- `auto`（デフォルト）：クリックやEscキーで閉じることができ、他の`auto`ポップアップを開くと自動的に閉じます。
- `manual`：明示的に表示・非表示を制御する必要があり、ユーザーの操作で自動的に閉じることはありません。
- `hint`（実験的）：`auto`ポップアップとは独立して表示され、他の`hint`ポップアップを開くと閉じます。

値を省略した場合、`auto`と同じ挙動になります。

---

## 複数の操作ボタンを使った例

`popovertargetaction`属性を使うと、ポップアップの表示、非表示、トグル（切り替え）を明示的に指定できます。


```html
<button popovertarget="my-popover" popovertargetaction="show">表示</button>
<button popovertarget="my-popover" popovertargetaction="hide">非表示</button>

<div id="my-popover" popover>
  これは手動制御のポップアップです。
</div>
```


この例では、「表示」ボタンでポップアップを表示し、「非表示」ボタンで閉じます。

---

## CSSでのスタイリング

ポップアップの表示状態に応じてスタイルを変更するには、`:popover-open`疑似クラスを使用します。


```css
[popover] {
  padding: 1em;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
}

:popover-open {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
```


また、`::backdrop`疑似要素を使って、ポップアップの背後に半透明の背景を追加することも可能です。


```css
[popover]::backdrop {
  background: rgba(0, 0, 0, 0.3);
}
```


---

## ブラウザ対応状況（2025年4月時点）

| ブラウザ        | 対応バージョン |
|-----------------|----------------|
| Chrome          | 114以降        |
| Edge            | 114以降        |
| Firefox         | 125以降        |
| Safari          | 17以降         |
| Opera           | 100以降        |
| iOS Safari      | 17以降         |
| Android Chrome  | 114以降        |

最新のブラウザでは広くサポートされていますが、古いバージョンや一部のブラウザでは未対応の場合があります。必要に応じて、JavaScriptによるフォールバックを検討してください。

---

## 注意点とベストプラクティス

- **アクセシビリティ**：`popover`属性自体には特定のARIAロールが付与されないため、必要に応じて`role="dialog"`や`aria-labelledby`などを追加して、スクリーンリーダー対応を強化しましょう。
- **フォーカス管理**：ポップアップを開いた際に、適切な要素にフォーカスを移動させることで、キーボード操作のユーザーにも配慮できます。
- **位置調整**：デフォルトではポップアップが画面中央に表示されますが、CSSで`position`や`inset`プロパティを調整することで、任意の位置に配置できます。

---

## 参考リンク
- <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover" target="_blank" rel="nofollow noopener">MDN Web Docs - HTMLのpopover属性</a>
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using" target="_blank" rel="nofollow noopener">MDN Web Docs - Popover APIの使い方</a>
- <a href="https://html.spec.whatwg.org/multipage/popover.html" target="_blank" rel="nofollow noopener">WHATWG - HTML標準仕様 popover属性</a>
- <a href="https://caniuse.com/?search=popover" target="_blank" rel="nofollow noopener">Can I use - popover属性のブラウザ対応状況</a>
