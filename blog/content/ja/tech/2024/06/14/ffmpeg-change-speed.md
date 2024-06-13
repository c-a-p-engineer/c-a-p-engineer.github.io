---
title: 【FFmpeg】動画の速度を変更する方法
date: 2024-06-14T01:00:00+09:00
description: 今回はFFmpegを使用して、動画の速度を変更する方法について説明します。
draft: false
enableToc: true
enableTocContent: true
tags: 
- 動画
categories: 
- 動画
image: images/thumbnail/video_editor.webp
---

# 【FFmpeg】動画の速度を変更する方法

今回はFFmpegを使用して、動画の速度を変更する方法について説明します。

## 動画の速度を変更するコマンド

FFmpegを使用して動画の再生速度を変更するには、以下のコマンドを使用します。

```bash
ffmpeg -i "input.mp4" -vf setpts=PTS/1.1 -af atempo=1.1 "output.mp4"
```

## コマンドの詳細説明

このコマンドは、入力ビデオファイル（`input.mp4`）の再生速度を変更し、出力ファイル（`output.mp4`）に保存します。各オプションの意味は以下の通りです。

- **ffmpeg**: FFmpegコマンドラインツールの呼び出し。
- **-i "input.mp4"**: 入力ファイルを指定。
- **-vf setpts=PTS/1.1**: ビデオの表示時間スタンプ (PTS) を1.1で割ることで、ビデオの再生速度を1.1倍に変更。
- **-af atempo=1.1**: オーディオの再生速度を1.1倍に変更。
- **"output.mp4"**: 出力ファイルを指定。

## コマンドの効果

このコマンドは、ビデオとオーディオの再生速度をそれぞれ1.1倍にし、結果を `output.mp4` に保存します。これにより、動画の再生速度が10％速くなります。

## 参考

- <a href="https://ffmpeg.org/ffmpeg-filters.html#setpts_002c-asetpts" target="_blank" rel="nofollow noopener">FFmpeg setpts, asetpts</a>
- <a href="https://ffmpeg.org/ffmpeg-filters.html#atempo" target="_blank" rel="nofollow noopener">FFmpeg atempo</a>
