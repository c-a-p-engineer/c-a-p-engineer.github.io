---
title: "【JavaScript】PCのスクリーンキャプチャを取得する"
date: 2021-08-29T09:00:00+09:00
description: "PCのスクリーンキャプチャを取得する"
draft: false
enableToc: true
enableTocContent: true
tags: 
- JavaScript
categories: 
- JavaScript
image: images/thumbnail/javascript.png
---

# 【JavaScript】スクリーンキャプチャを取得する
PCのスクリーンキャプチャを取得するためのメモ

## サンプル
<p><button id="start">Start Capture</button>&nbsp;<button id="stop">Stop Capture</button></p>
<video id="video" autoplay></video>
<script>
const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
// 画面取得オプション
var displayMediaOptions = {
  video: {
    cursor: "always"
  },
  audio: false
};
// イベント登録
startElem.addEventListener("click", function(evt) {
  startCapture();
}, false);
stopElem.addEventListener("click", function(evt) {
  stopCapture();
}, false);
// 画面表示開始
async function startCapture() {
  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    dumpOptionsInfo();
  } catch(err) {
    console.error("Error: " + err);
  }
}
// 画面表示停止
function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();
  tracks.forEach(track => track.stop());
  videoElem.srcObject = null;
}
</script>

## サンプルソース
```html:index.html
<p><button id="start">Start Capture</button>&nbsp;<button id="stop">Stop Capture</button></p>
<video id="video" autoplay></video>
<strong>Log:</strong>
<pre id="log"></pre>
<script>
const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
// 画面取得オプション
var displayMediaOptions = {
  video: {
    cursor: "always"
  },
  audio: false
};
// イベント登録
startElem.addEventListener("click", function(evt) {
  startCapture();
}, false);
stopElem.addEventListener("click", function(evt) {
  stopCapture();
}, false);
// 画面表示開始
async function startCapture() {
  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    dumpOptionsInfo();
  } catch(err) {
    console.error("Error: " + err);
  }
}
// 画面表示停止
function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();
  tracks.forEach(track => track.stop());
  videoElem.srcObject = null;
}
</script>
```

## 参考
* <a href="https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture" target="_blank" rel="nofollow noopener">Using the Screen Capture API - Web APIs | MDN</a>
