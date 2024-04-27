---
title: 【Python】音声ファイルを解析してリップシンク（口パク動画）を作成する方法
date: 2024-04-28T02:30:00+09:00
description: 音声ファイルを解析してリップシンク（口パク動画）を作成する方法。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Python
categories: 
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# 【Python】音声ファイルを解析してリップシンク（口パク動画）を作成する方法

音声ファイルを解析してリップシンク（口パク動画）を作成する方法。

音声ファイルに合わせてキャラクターが話しているかのようなリップシンク動画を作成する手順を解説します。このプロセスではlibrosaで音声を分析し、cv2 (OpenCV) で画像を処理し、最後に moviepy を用いて音声とビデオを結合します。

## 用意

以下の3つのファイルを用意します。

- 音声ファイル<br><audio controls src="/tech/2024/04/28/python-lip-sync/audio.wav"></audio>
- 口閉じ<br><img src="/tech/2024/04/28/python-lip-sync/close.png" alt="close.png" style="width:300px;" />
- 口開き<br><img src="/tech/2024/04/28/python-lip-sync/open.png" alt="open.png" style="width:300px;" />

## 実装

```python
import cv2
import librosa
import numpy as np
from moviepy.editor import VideoFileClip, AudioFileClip, CompositeVideoClip

# 音声ファイルと画像ファイルのパスを指定
audio_path = './audio.wav'
close_image_path = './close.png'
open_image_path = './open.png'

# 音声ファイルを読み込み、サンプリングレートをそのままにして音質を保持
y, sr = librosa.load(audio_path, sr=None)

# 無音区間を検出して非無音セグメントを取得、top_dbを20に設定して細かい音も拾う
segments = librosa.effects.split(y, top_db=20, ref=np.max)

# 画像ファイルを読み込み
close_img = cv2.imread(close_image_path)
open_img = cv2.imread(open_image_path)

# ビデオを生成する準備
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
video = cv2.VideoWriter('output.mp4', fourcc, 30.0, (close_img.shape[1], close_img.shape[0]))

# 各フレームに対して画像を選択し、ビデオフレームに追加
frame_rate = 30
frame_duration = 1 / frame_rate
total_duration = len(y) / sr
t = 0
while t < total_duration:
    segment_status = any(start / sr <= t < end / sr for start, end in segments)
    frame = open_img if segment_status else close_img
    video.write(frame)
    t += frame_duration

# ビデオファイルを保存
video.release()

# moviepyを使ってビデオファイルに音声ファイルを結合
video_clip = VideoFileClip('output.mp4')
audio_clip = AudioFileClip(audio_path)
final_clip = video_clip.set_audio(audio_clip)
final_clip.write_videofile('final_output.mp4', codec='libx264')
```

こちらが完成した動画になります。それなりにそれっぽいものができあがりました！

<video controls style="width:300px;" src="/tech/2024/04/28/python-lip-sync/video.mp4" ></video>

### パッケージの説明

- **librosa**: 音声ファイルの読み込みや音声解析のために使用します。とくに、音声からの無音区間の検出に役立ちます。
- **cv2 (OpenCV)**: 画像の読み込みやビデオファイルの生成に使用します。このライブラリは画像処理において非常に強力です。
- **moviepy**: 生成したビデオファイルに音声を結合する際に使用します。Pythonのスクリプト内で完結するため、ffmpegのコマンドライン操作に比べて簡単に扱うことができます。

## まとめ

今回は口の開閉しかないので単純なものになっています。さらに複雑に口に合わせた変化をするのであれば音声ファイルの詳しい解析が必要になります。
