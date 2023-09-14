---
title: "【CSS】5段階評価の星評価で細かな表示を行う方法"
date: 2023-09-15T01:00:00+09:00
description: "星の評価システムで3.5など中途半端な値に簡単に対応する方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- CSS
categories: 
- CSS
image: images/thumbnail/CSS3_logo_and_wordmark.svg
---

# 【CSS】5段階評価の星評価で細かな表示を行う方法
星の評価システムで3.5など中途半端な値に簡単に対応する方法。
評価する時は5段階ですが平均値などを出すと3.5など中途半端な値になるので、その際の星の表示方法です。

## コード

### HTML
```html
<!-- % の箇所は塗りのパーセンテージを入れる -->
<div class="stars" style="--percent: 10%;"></div>
```

### CSS
```css
/* 変数設定 */
:root {
  --star-size: 60px;
  --star-color: #fff;
  --star-background: #fc0;
}

/* 星評価のスタイル */
.stars {
  display: inline-block;
  font-size: var(--star-size);
  font-family: Times;
  line-height: 1;
}

.stars::before {
  content: '★★★★★';
  letter-spacing: 3px;
  background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## サンプル
実行サンプルが以下になります。
* 星0 <div class="stars" style="--percent: 0%;"></div>
* 星2.5 <div class="stars" style="--percent: 50%;"></div>
* 星3.4 <div class="stars" style="--percent: 68%;"></div>
* 星5 <div class="stars" style="--percent: 100%;"></div>

<style>
/* 変数設定 */
:root {
  --star-size: 60px;
  --star-color: #fff;
  --star-background: #fc0;
}

/* 星評価のスタイル */
.stars {
  display: inline-block;
  font-size: var(--star-size);
  font-family: Times;
  line-height: 1;
}

.stars::before {
  content: '★★★★★';
  letter-spacing: 3px;
  background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>