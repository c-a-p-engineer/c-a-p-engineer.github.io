---
title: "【JavaScript】Handtrack.jsを使った手のリアルタイム検出"
date: 2023-05-05T17:30:00+09:00
description: "Handtrack.jsを使った手のリアルタイム検出して遊ぶ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- JavaScript
categories: 
- JavaScript
image: images/thumbnail/javascript.png
---

# 【JavaScript】Handtrack.jsを使った手のリアルタイム検出
Handtrack.jsを使った手のリアルタイム検出して遊ぶ。

## Handtrack.js
近年の技術の進歩により、画像認識や物体検出などの機械学習タスクが簡単に実現できるようになりました。
Handtrack.jsは、その中でも手の検出と追跡を行うためのJavaScriptライブラリです。
Handtrack.jsを使用して手のリアルタイム検出を実装する方法をご紹介します。

以下は今回使用する Handtrack.js の公式サイトになります。
<a href="https://victordibia.com/handtrack.js/" target="_blank" rel="nofollow noopener">handtrack.js</a>

## サンプルコード
サンプルはこちらのGitHubにあったものを使用しております。
<a href="https://github.com/webhacck/handtrackjs-sample">webhacck / handtrackjs-sample</a>

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>リアルタイム動画検出サンプル（handtrack.js）</title>
  </head>
  <body>
    <!-- リアルタイム検出を停止するためのボタン -->
    <button id="start">スタート</button> <button id="stop">ストップ</button><br>
    <canvas id="mycanvas" style="width:100%; height:100%; max-height:700px; object-fit: contain;"></canvas>
    <video id="myvideo" width="480" height="320" hidden="true"></video>
    <script src="https://cdn.jsdelivr.net/npm/handtrackjs@0.0.13/dist/handtrack.min.js"></script>
    <script>
      const canvas = document.getElementById("mycanvas");
      const ctx = canvas.getContext("2d");
      const video = document.getElementById("myvideo");

      const options = {
        flipHorizontal: true, // 水平方向の反転
        maxNumBoxes: 2, // 検出するボックスの最大数
        scoreThreshold: 0.6 // 予測信頼度のしきい値
      };

      let state = true;
      let model;  // 繰り返し利用するために読み込んだ機械学習モデルを格納しておく

      document.getElementById("start").addEventListener("click", startEvent);
      document.getElementById("stop").addEventListener("click", stopEvent);

      // 「手」の検出と結果の出力を繰り返し実行する
      function startDetection() {
        model.detect(video).then(predictions => {
          model.renderPredictions(predictions, canvas, ctx, video);

          if (state) {
            requestAnimationFrame(startDetection);
          }
        });
      }

      // 開始ボタンが押された時にリアルタイム検出の処理を開始
      function startEvent() {
        state = true;
        ctx.font = "18pt Arial";
        ctx.fillText("モデル読込中...", 50, 50);

        handTrack.load(options).then(function(model_data) {
            model = model_data;

            // Webカメラを起動する
            handTrack.startVideo(video).then(function(status) {
            if (status) {
                startDetection();
            } else {
                console.log("ビデオエラーが検出されました...", status);
            }
            });
        });
      }

      // 停止ボタンが押された時にリアルタイム検出の処理を中断する
      function stopEvent() {
        handTrack.stopVideo(video);
        state = false;
      }
    </script>
  </body>
</html>

```

これで、手のリアルタイム検出が可能になります。
公式サイトにもありましたが色々とできそうですね。

## サンプル
<button id="start">スタート</button> <button id="stop">ストップ</button><br />
<canvas id="mycanvas" style="width:100%;height:100%; max-height:700px; object-fit: contain;"></canvas>
<video id="myvideo" width="480" height="320" hidden="true"></video>
<script src="https://cdn.jsdelivr.net/npm/handtrackjs@0.0.13/dist/handtrack.min.js"></script>
<script>
    const canvas = document.getElementById("mycanvas");
    const ctx = canvas.getContext("2d");
    const video = document.getElementById("myvideo");

    const options = {
        flipHorizontal: true, // 水平方向の反転
        maxNumBoxes: 2, // 検出するボックスの最大数
        scoreThreshold: 0.6 // 予測信頼度のしきい値
    };

    let state = true;
    let model;  // 繰り返し利用するために読み込んだ機械学習モデルを格納しておく

    document.getElementById("start").addEventListener("click", startEvent);
    document.getElementById("stop").addEventListener("click", stopEvent);

    // 「手」の検出と結果の出力を繰り返し実行する
    function startDetection() {
    model.detect(video).then(predictions => {
        model.renderPredictions(predictions, canvas, ctx, video);

        if (state) {
            requestAnimationFrame(startDetection);
        }
    });
    }

    // 開始ボタンが押された時にリアルタイム検出の処理を開始
    function startEvent() {
    state = true;
    ctx.font = "18pt Arial";
    ctx.fillText("モデル読込中...", 50, 50);

    handTrack.load(options).then(function(model_data) {
        model = model_data;

        // Webカメラを起動する
        handTrack.startVideo(video).then(function(status) {
            if (status) {
                startDetection();
            } else {
                console.log("ビデオエラーが検出されました...", status);
            }
            });
        });
    }

    // 停止ボタンが押された時にリアルタイム検出の処理を中断する
    function stopEvent() {
        handTrack.stopVideo(video);
        state = false;
    }
</script>


## 参考資料
* <a href="https://victordibia.com/handtrack.js/" target="_blank" rel="nofollow noopener">handtrack.js</a>
* <a href="https://github.com/webhacck/handtrackjs-sample">webhacck / handtrackjs-sample</a>