---
title: "【CSS】よくある星による評価システム"
date: 2023-08-30T13:00:00+09:00
description: "今回はよくある星による評価システムを作成する方法です。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- CSS
categories: 
- CSS
image: images/thumbnail/CSS3_logo_and_wordmark.svg
---

# 【CSS】よくある星による評価システム
今回はよくある星による評価システムを作成する方法です。

## なぜ星5段階評価システムが必要か？
UI/UXの向上: 星評価は直感的で使いやすい。
わかりやすさ: 評価が視覚的に表示されるため、わかりやすい。
手間を省く: 細かなレビューより星による評価だけだとユーザーからのフィードバックを得やすい。

## コード

### HTML
```html
<div class="rate-form">
  <input id="star5" type="radio" name="rate" value="5">
  <label for="star5">★</label>
  <input id="star4" type="radio" name="rate" value="4">
  <label for="star4">★</label>
  <input id="star3" type="radio" name="rate" value="3">
  <label for="star3">★</label>
  <input id="star2" type="radio" name="rate" value="2">
  <label for="star2">★</label>
  <input id="star1" type="radio" name="rate" value="1">
  <label for="star1">★</label>
</div>
```

### CSS
```css
.rate-form {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.rate-form input[type=radio] {
  display: none;
}

.rate-form label {
  position: relative;
  padding: 0 5px;
  color: #ccc;
  cursor: pointer;
  font-size: 35px;
}

.rate-form label:hover {
  color: #ffcc00;
}

.rate-form label:hover ~ label {
  color: #ffcc00;
}

.rate-form input[type=radio]:checked ~ label {
  color: #ffcc00;
}
```

## サンプル
実行サンプルが以下になります。
<div class="rate-form">
  <input id="star5" type="radio" name="rate" value="5">
  <label for="star5">★</label>
  <input id="star4" type="radio" name="rate" value="4">
  <label for="star4">★</label>
  <input id="star3" type="radio" name="rate" value="3">
  <label for="star3">★</label>
  <input id="star2" type="radio" name="rate" value="2">
  <label for="star2">★</label>
  <input id="star1" type="radio" name="rate" value="1">
  <label for="star1">★</label>
</div>

<style>
.rate-form {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.rate-form input[type=radio] {
  display: none;
}

.rate-form label {
  position: relative;
  padding: 0 5px;
  color: #ccc;
  cursor: pointer;
  font-size: 35px;
}

.rate-form label:hover {
  color: #ffcc00;
}

.rate-form label:hover ~ label {
  color: #ffcc00;
}

.rate-form input[type=radio]:checked ~ label {
  color: #ffcc00;
}
</style>