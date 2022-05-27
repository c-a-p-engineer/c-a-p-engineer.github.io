---
title: "【JavaScript】カメラ・マイクを取得して画面に表示する"
date: 2021-08-27T10:40:00+09:00
description: "Web上でカメラ・マイクを取得、表示・停止するだけ。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- JavaScript
categories: 
- JavaScript
image: images/thumbnail/javascript.png
---

# 【JavaScript】カメラを取得して画面に表示する
Web上でカメラ・マイクを取得、表示・停止するだけ。

## サンプル
<button type="button" onclick="startVideo();">Start video</button> <button type="button" onclick="stopVideo();">Stop video</button>
<video id="video" autoplay></video>
<script>
  var video = document.getElementById('video');
  var constraints = { audio: true, video: true };

  // カメラ・マイク開始
  function startVideo() {
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); });
  }

  // カメラ・マイク停止
  function stopVideo() {
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });
    video.srcObject = null;
  }
</script>

## サンプルソース
```html:index.html
<button type="button" onclick="startVideo();">Start video</button> <button type="button" onclick="stopVideo();">Stop video</button>
<video id="video" autoplay style="width: 240px; height: 180px; border: 1px solid black;"></video>
<script>
  var video = document.getElementById('video');
  var constraints = { audio: true, video: true };

  // カメラ・マイク開始
  function startVideo() {
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); });
  }

  // カメラ・マイク停止
  function stopVideo() {
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });
    video.srcObject = null;
  }
</script>
```

## 参考
* <a href="https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/getUserMedia" target="_blank" rel="nofollow noopener">MediaDevices.getUserMedia() - Web API | MDN</a>
* <a href="https://developer.mozilla.org/ja/docs/Web/API/MediaStreamTrack/stop" target="_blank" rel="nofollow noopener">MediaStreamTrack.stop() - Web API | MDN</a>
