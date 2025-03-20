---
title: "SVGで実現するインタラクティブ処理"
date: 2025-03-20T18:30:00+09:00
description: "Gemini APIを利用するためには、APIキーが必要です。Google AI StudioでGemini APIキーを取得する手順と、その後の利用方法についてメモします。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- JavaScript
categories: 
- JavaScript
image: images/thumbnail/javascript.png
---

# SVGで実現するインタラクティブ処理

Webデザインやインタラクティブなコンテンツ制作において、**SVG**は非常に柔軟で高機能なツールです。  
ピクセルアート風のモンスターが画面いっぱいに動きながら、クリックした位置で爆発エフェクトを発生させるコードを例に、その仕組みと各部分の役割を解説します。
SVGの仕組みのお陰で、要素ごとのアニメーションやイベントハンドリングがシームレスに実現できる点にも注目してください。

## サンプルコード

<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" onclick="explosionAt(evt)">
  <!-- 外側ラッパー：上下のゆっくりボビングアニメーション -->
  <g id="invaderWrapper" cursor="pointer">
    <!-- 内側のインベーダー風エイリアン（ピクセルアート） -->
    <g id="invader">
      <!-- Row0: パターン [0,1,1,0,0,1,1,0] -->
      <rect x="30" y="20" width="10" height="10" fill="lime" />
      <rect x="40" y="20" width="10" height="10" fill="lime" />
      <rect x="70" y="20" width="10" height="10" fill="lime" />
      <rect x="80" y="20" width="10" height="10" fill="lime" />
      <!-- Row1: パターン [1,0,0,1,1,0,0,1] -->
      <rect x="20" y="30" width="10" height="10" fill="lime" />
      <rect x="50" y="30" width="10" height="10" fill="lime" />
      <rect x="60" y="30" width="10" height="10" fill="lime" />
      <rect x="90" y="30" width="10" height="10" fill="lime" />
      <!-- Row2: パターン [1,1,1,1,1,1,1,1] -->
      <rect x="20" y="40" width="10" height="10" fill="lime" />
      <rect x="30" y="40" width="10" height="10" fill="lime" />
      <rect x="40" y="40" width="10" height="10" fill="lime" />
      <rect x="50" y="40" width="10" height="10" fill="lime" />
      <rect x="60" y="40" width="10" height="10" fill="lime" />
      <rect x="70" y="40" width="10" height="10" fill="lime" />
      <rect x="80" y="40" width="10" height="10" fill="lime" />
      <rect x="90" y="40" width="10" height="10" fill="lime" />
      <!-- Row3: パターン [1,0,1,1,1,1,0,1] -->
      <rect x="20" y="50" width="10" height="10" fill="lime" />
      <rect x="40" y="50" width="10" height="10" fill="lime" />
      <rect x="50" y="50" width="10" height="10" fill="lime" />
      <rect x="60" y="50" width="10" height="10" fill="lime" />
      <rect x="70" y="50" width="10" height="10" fill="lime" />
      <rect x="90" y="50" width="10" height="10" fill="lime" />
      <!-- Row4: パターン [1,0,1,1,1,1,0,1] -->
      <rect x="20" y="60" width="10" height="10" fill="lime" />
      <rect x="40" y="60" width="10" height="10" fill="lime" />
      <rect x="50" y="60" width="10" height="10" fill="lime" />
      <rect x="60" y="60" width="10" height="10" fill="lime" />
      <rect x="70" y="60" width="10" height="10" fill="lime" />
      <rect x="90" y="60" width="10" height="10" fill="lime" />
      <!-- Row5: パターン [1,1,1,1,1,1,1,1] -->
      <rect x="20" y="70" width="10" height="10" fill="lime" />
      <rect x="30" y="70" width="10" height="10" fill="lime" />
      <rect x="40" y="70" width="10" height="10" fill="lime" />
      <rect x="50" y="70" width="10" height="10" fill="lime" />
      <rect x="60" y="70" width="10" height="10" fill="lime" />
      <rect x="70" y="70" width="10" height="10" fill="lime" />
      <rect x="80" y="70" width="10" height="10" fill="lime" />
      <rect x="90" y="70" width="10" height="10" fill="lime" />
      <!-- Row6: パターン [0,1,0,1,1,0,1,0] -->
      <rect x="30" y="80" width="10" height="10" fill="lime" />
      <rect x="50" y="80" width="10" height="10" fill="lime" />
      <rect x="60" y="80" width="10" height="10" fill="lime" />
      <rect x="80" y="80" width="10" height="10" fill="lime" />
      <!-- Row7: パターン [0,0,1,0,0,1,0,0] -->
      <rect x="40" y="90" width="10" height="10" fill="lime" />
      <rect x="70" y="90" width="10" height="10" fill="lime" />
    </g>
    <!-- 横方向移動アニメーション：画面いっぱいに動く -->
    <animateTransform 
      xlink:href="#invader"
      attributeName="transform"
      type="translate"
      values="0,0;200,0;0,0"
      dur="2s"
      repeatCount="indefinite" />
  </g>
  <!-- 垂直ボビング（上下動）アニメーション：durを3秒に変更 -->
  <animateTransform 
      xlink:href="#invaderWrapper"
      attributeName="transform"
      type="translate"
      values="0,0;0,50;0,0"
      dur="3s"
      repeatCount="indefinite" />
  <!-- 爆発エフェクト（各アニメーションのbeginをindefiniteに変更） -->
  <g id="explosion" opacity="0">
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; -20,-20" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; 20,-20" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; -20,20" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; 20,20" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-30" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,30" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; -30,0" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; 30,0" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
  </g>
  <!-- クリック時にエイリアンを非表示＆爆発エフェクトを表示 -->
  <set xlink:href="#invader" attributeName="opacity" to="0" begin="invaderWrapper.click" />
  <set xlink:href="#explosion" attributeName="opacity" to="1" begin="invaderWrapper.click" />
  <!-- 3秒後にエイリアンを復帰し、爆発エフェクトを非表示に -->
  <set xlink:href="#invader" attributeName="opacity" to="1" begin="invaderWrapper.click+3s" />
  <set xlink:href="#explosion" attributeName="opacity" to="0" begin="invaderWrapper.click+3s" />
  <script type="application/ecmascript"><![CDATA[
    function explosionAt(evt) {
      // SVG要素の取得
      var svg = evt.currentTarget;
      // クリック位置をSVG座標に変換
      var pt = svg.createSVGPoint();
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      // 爆発エフェクトの位置をクリック位置に設定
      var explosion = document.getElementById("explosion");
      explosion.setAttribute("transform", "translate(" + svgP.x + "," + svgP.y + ")");
      explosion.setAttribute("opacity", "1");
      // 爆発エフェクト内の各アニメーションを開始
      var animations = explosion.querySelectorAll("animate, animateTransform");
      for (var i = 0; i < animations.length; i++) {
         animations[i].beginElement();
      }
      // インベーダーを非表示にする
      var invader = document.getElementById("invader");
      invader.setAttribute("opacity", "0");
      // 3秒後にインベーダーを復帰し、爆発エフェクトを非表示にする
      setTimeout(function(){
        invader.setAttribute("opacity", "1");
        explosion.setAttribute("opacity", "0");
      }, 3000);
    }
  ]]></script>
</svg>

```html
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" onclick="explosionAt(evt)">
  <!-- 外側ラッパー：上下のゆっくりボビングアニメーション -->
  <g id="invaderWrapper" cursor="pointer">
    <!-- 内側のインベーダー風エイリアン（ピクセルアート） -->
    <g id="invader">
      <!-- Row0: パターン [0,1,1,0,0,1,1,0] -->
      <rect x="30" y="20" width="10" height="10" fill="lime" />
      <rect x="40" y="20" width="10" height="10" fill="lime" />
      <rect x="70" y="20" width="10" height="10" fill="lime" />
      <rect x="80" y="20" width="10" height="10" fill="lime" />
      
      <!-- Row1: パターン [1,0,0,1,1,0,0,1] -->
      <rect x="20" y="30" width="10" height="10" fill="lime" />
      <rect x="50" y="30" width="10" height="10" fill="lime" />
      <rect x="60" y="30" width="10" height="10" fill="lime" />
      <rect x="90" y="30" width="10" height="10" fill="lime" />
      
      <!-- Row2: パターン [1,1,1,1,1,1,1,1] -->
      <rect x="20" y="40" width="10" height="10" fill="lime" />
      <rect x="30" y="40" width="10" height="10" fill="lime" />
      <rect x="40" y="40" width="10" height="10" fill="lime" />
      <rect x="50" y="40" width="10" height="10" fill="lime" />
      <rect x="60" y="40" width="10" height="10" fill="lime" />
      <rect x="70" y="40" width="10" height="10" fill="lime" />
      <rect x="80" y="40" width="10" height="10" fill="lime" />
      <rect x="90" y="40" width="10" height="10" fill="lime" />
      
      <!-- Row3: パターン [1,0,1,1,1,1,0,1] -->
      <rect x="20" y="50" width="10" height="10" fill="lime" />
      <rect x="40" y="50" width="10" height="10" fill="lime" />
      <rect x="50" y="50" width="10" height="10" fill="lime" />
      <rect x="60" y="50" width="10" height="10" fill="lime" />
      <rect x="70" y="50" width="10" height="10" fill="lime" />
      <rect x="90" y="50" width="10" height="10" fill="lime" />
      
      <!-- Row4: パターン [1,0,1,1,1,1,0,1] -->
      <rect x="20" y="60" width="10" height="10" fill="lime" />
      <rect x="40" y="60" width="10" height="10" fill="lime" />
      <rect x="50" y="60" width="10" height="10" fill="lime" />
      <rect x="60" y="60" width="10" height="10" fill="lime" />
      <rect x="70" y="60" width="10" height="10" fill="lime" />
      <rect x="90" y="60" width="10" height="10" fill="lime" />
      
      <!-- Row5: パターン [1,1,1,1,1,1,1,1] -->
      <rect x="20" y="70" width="10" height="10" fill="lime" />
      <rect x="30" y="70" width="10" height="10" fill="lime" />
      <rect x="40" y="70" width="10" height="10" fill="lime" />
      <rect x="50" y="70" width="10" height="10" fill="lime" />
      <rect x="60" y="70" width="10" height="10" fill="lime" />
      <rect x="70" y="70" width="10" height="10" fill="lime" />
      <rect x="80" y="70" width="10" height="10" fill="lime" />
      <rect x="90" y="70" width="10" height="10" fill="lime" />
      
      <!-- Row6: パターン [0,1,0,1,1,0,1,0] -->
      <rect x="30" y="80" width="10" height="10" fill="lime" />
      <rect x="50" y="80" width="10" height="10" fill="lime" />
      <rect x="60" y="80" width="10" height="10" fill="lime" />
      <rect x="80" y="80" width="10" height="10" fill="lime" />
      
      <!-- Row7: パターン [0,0,1,0,0,1,0,0] -->
      <rect x="40" y="90" width="10" height="10" fill="lime" />
      <rect x="70" y="90" width="10" height="10" fill="lime" />
    </g>
    
    <!-- 横方向移動アニメーション：画面いっぱいに動く -->
    <animateTransform 
      xlink:href="#invader"
      attributeName="transform"
      type="translate"
      values="0,0;200,0;0,0"
      dur="2s"
      repeatCount="indefinite" />
  </g>
  
  <!-- 垂直ボビング（上下動）アニメーション：durを3秒に変更 -->
  <animateTransform 
      xlink:href="#invaderWrapper"
      attributeName="transform"
      type="translate"
      values="0,0;0,50;0,0"
      dur="3s"
      repeatCount="indefinite" />
  
  <!-- 爆発エフェクト（各アニメーションのbeginをindefiniteに変更） -->
  <g id="explosion" opacity="0">
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; -20,-20" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; 20,-20" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; -20,20" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; 20,20" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,-30" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; 0,30" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; -30,0" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
    <circle cx="0" cy="0" r="2" fill="orange">
      <animateTransform attributeName="transform" type="translate" values="0,0; 30,0" dur="0.6s" begin="indefinite" fill="freeze" />
      <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
    </circle>
  </g>
  
  <!-- クリック時にエイリアンを非表示＆爆発エフェクトを表示 -->
  <set xlink:href="#invader" attributeName="opacity" to="0" begin="invaderWrapper.click" />
  <set xlink:href="#explosion" attributeName="opacity" to="1" begin="invaderWrapper.click" />
  
  <!-- 3秒後にエイリアンを復帰し、爆発エフェクトを非表示に -->
  <set xlink:href="#invader" attributeName="opacity" to="1" begin="invaderWrapper.click+3s" />
  <set xlink:href="#explosion" attributeName="opacity" to="0" begin="invaderWrapper.click+3s" />
  
  <script type="application/ecmascript"><![CDATA[
    function explosionAt(evt) {
      // SVG要素の取得
      var svg = evt.currentTarget;
      // クリック位置をSVG座標に変換
      var pt = svg.createSVGPoint();
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
      
      // 爆発エフェクトの位置をクリック位置に設定
      var explosion = document.getElementById("explosion");
      explosion.setAttribute("transform", "translate(" + svgP.x + "," + svgP.y + ")");
      explosion.setAttribute("opacity", "1");
      
      // 爆発エフェクト内の各アニメーションを開始
      var animations = explosion.querySelectorAll("animate, animateTransform");
      for (var i = 0; i < animations.length; i++) {
         animations[i].beginElement();
      }
      
      // インベーダーを非表示にする
      var invader = document.getElementById("invader");
      invader.setAttribute("opacity", "0");
      
      // 3秒後にインベーダーを復帰し、爆発エフェクトを非表示にする
      setTimeout(function(){
        invader.setAttribute("opacity", "1");
        explosion.setAttribute("opacity", "0");
      }, 3000);
    }
  ]]></script>
</svg>
```

## コード全体の概要

今回のコードは、以下の3つの主要なパートで構成されています。

1. **モンスターの描画とアニメーション**  
   - 複数の `<rect>` 要素でピクセル単位のモンスターを表現。  
   - `<animateTransform>` により、モンスターが横方向に往復移動するアニメーションを実装。  
   - 外側のグループ（`id="invaderWrapper"`）で上下のボビング（ゆっくり上下動）を実現しています。

2. **爆発エフェクトの設定**  
   - 複数の `<circle>` 要素と `<animate>` / `<animateTransform>` によるアニメーションで、クリック位置から小さな円が拡散する爆発エフェクトを再現。  
   - 爆発エフェクトの各アニメーションは、`begin="indefinite"` に設定され、JavaScriptから呼び出して再生されます。

3. **JavaScriptによるクリックイベント処理**  
   - SVG全体にクリックイベント（`onclick="explosionAt(evt)"`）を設定し、クリック位置をSVGの座標系に変換。  
   - クリックされた場所に爆発エフェクトグループを移動させ、各アニメーションを開始。  
   - 同時に、モンスターを非表示にし、3秒後に復帰させる仕組みも実装されています。

## 各コード部分の詳細解説

### 1. モンスターの描画とアニメーション

```html
<g id="invaderWrapper" cursor="pointer">
  <!-- 内側のインベーダー風モンスター（ピクセルアート） -->
  <g id="invader">
    <!-- 複数の <rect> 要素でピクセル単位のデザイン -->
    <rect x="30" y="20" width="10" height="10" fill="lime" />
    <!-- 以下、他のピクセル（<rect>）が同様に配置されています -->
  </g>
  
  <!-- 横方向移動アニメーション：<animateTransform>で実現 -->
  <animateTransform 
    xlink:href="#invader"
    attributeName="transform"
    type="translate"
    values="0,0;200,0;0,0"
    dur="2s"
    repeatCount="indefinite" />
</g>
```

- **描画部分**  
  モンスターは、8×8のグリッド状に配置された `<rect>` 要素で作成されています。各 `<rect>` は1ピクセルを模しており、ピクセルアートならではのレトロな雰囲気を醸し出します。

- **横方向移動のアニメーション**  
  `<animateTransform>` 要素により、モンスターは画面内を左右に動くアニメーションを実現。  
  `values="0,0;200,0;0,0"` で、200px分の移動を往復し、`dur="2s"` で2秒周期の繰り返し動作となっています。

- **上下のボビング（ゆっくり上下動）**  
  モンスター全体を囲むグループ（`invaderWrapper`）に対して、別の `<animateTransform>` を使い、`values="0,0;0,50;0,0"` と `dur="3s"` で上下にゆっくりと動くボビング効果を追加しています。

### 2. 爆発エフェクト

```html
<g id="explosion" opacity="0">
  <circle cx="0" cy="0" r="2" fill="orange">
    <animateTransform attributeName="transform" type="translate" values="0,0; -20,-20" dur="0.6s" begin="indefinite" fill="freeze" />
    <animate attributeName="opacity" values="1;0" dur="0.6s" begin="indefinite" fill="freeze" />
  </circle>
  <!-- 同様に他の方向へ飛び出す複数の円が定義されています -->
</g>
```

- **爆発エフェクトの基本構造**  
  爆発エフェクトは、クリック位置に表示されるグループとして定義されています。  
  各 `<circle>` は、爆発の「粒子」を表現しており、アニメーションでクリック位置から外側へ移動しながらフェードアウトします。

- **アニメーションの制御**  
  `<animateTransform>` や `<animate>` 要素の `begin` 属性を `"indefinite"` に設定しているため、これらはJavaScriptから `beginElement()` を呼び出すことで再生されます。

### 3. JavaScriptによるクリックイベント処理

```html
<script type="application/ecmascript"><![CDATA[
  function explosionAt(evt) {
    // SVG要素とクリック位置の取得
    var svg = evt.currentTarget;
    var pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    
    // 爆発エフェクトの位置をクリック位置に設定
    var explosion = document.getElementById("explosion");
    explosion.setAttribute("transform", "translate(" + svgP.x + "," + svgP.y + ")");
    explosion.setAttribute("opacity", "1");
    
    // 爆発エフェクト内の各アニメーションを開始
    var animations = explosion.querySelectorAll("animate, animateTransform");
    for (var i = 0; i < animations.length; i++) {
       animations[i].beginElement();
    }
    
    // インベーダーを非表示にして、3秒後に復帰
    var invader = document.getElementById("invader");
    invader.setAttribute("opacity", "0");
    setTimeout(function(){
      invader.setAttribute("opacity", "1");
      explosion.setAttribute("opacity", "0");
    }, 3000);
  }
]]></script>
```

- **クリック位置の取得**  
  SVGが持つ `createSVGPoint()` と `getScreenCTM()` を使い、ブラウザの画面上のクリック位置をSVGの座標系に変換します。  
  この仕組みは、SVG独自の座標システムを利用できるため非常に強力です。

- **爆発エフェクトの開始**  
  クリック位置に合わせて、爆発グループの `transform` 属性を更新し、各アニメーションを `beginElement()` で開始。  
  その結果、クリックした場所から爆発が発生します。

- **モンスターの非表示・復帰**  
  クリック時にモンスター（`invader`）の表示を切り替え、3秒後に元に戻すことで、インタラクティブな演出を実現しています。

## SVGの仕組みのお陰で実現できるインタラクション

SVGは、ベクター形式のグラフィックスをXML形式で記述するため、  
- **解像度に依存しない描画**が可能で、どんなサイズにも拡大縮小できます。  
- また、**SMIL（Synchronized Multimedia Integration Language）**に基づいた `<animate>` や `<animateTransform>` といったタグを利用することで、コード内にアニメーションを直接埋め込むことができます。  
- さらに、DOMとして扱えるため、JavaScriptと組み合わせた**インタラクティブな操作**も可能です。

これらの特徴のお陰で、SVGはブラウザ上で手軽に動的なコンテンツを実現できるのです。

## まとめ

今回紹介したコードは、SVGの持つ柔軟なアニメーション機能とインタラクティブなイベント処理のお陰で、  
「クリックした場所でモンスターが爆発する」演出を実現しています。  
ピクセルアート風のインベーダー、横移動と上下のボビング、そしてクリック位置で爆発エフェクトが発生する仕組みは、すべてSVGの強力な機能によって支えられています。

この手法を応用すれば、ゲーム風の演出やインタラクティブなWebコンテンツの制作がさらに楽しく、また高度な表現が可能になります。
