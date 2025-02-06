---
title: "【Python】YouTube動画＆音声をダウンロードする方法【yt-dlpを活用】"
date: 2025-02-27T02:30:00+09:00
description: YouTubeの動画をダウンロードしてオフラインで視聴したい場合、Pythonを使うことで簡単に実現できます。
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

# 【Python】YouTube動画＆音声をダウンロードする方法【yt-dlpを活用】

YouTubeの動画をダウンロードしてオフラインで視聴したい場合、Pythonを使うことで簡単に実現できます。本記事では、「yt-dlp」という強力なツールを活用して、YouTubeの動画や音声をダウンロードする方法を解説します。

音声のみのダウンロード、字幕付きの動画保存など、さまざまなオプションも紹介します。

- <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" rel="nofollow noopener">yt-dlp/yt-dlp</a>

## yt-dlpの概要とインストール

### yt-dlpとは？

`yt-dlp` は `youtube-dl` の派生版で、より高機能かつ最新のYouTubeの仕様変更にも対応しています。`yt-dlp` を使うことで、YouTube動画を簡単にダウンロードし、解像度や音質を指定して保存できます。

### インストール方法

```python
pip install -U yt-dlp
```

## YouTube動画をダウンロードする基本コード

以下のコードを実行すると、720p以下の動画と最高音質の音声を結合してダウンロードできます。

### 動画のダウンロード

```python
from yt_dlp import YoutubeDL

# YouTube動画のURL
youtube_url = "https://www.youtube.com/watch?v=oHIhCOl01J0"

# ダウンロードオプション
options = {
    'format': 'bestvideo[height<=720]+bestaudio/best',
    'merge_output_format': 'mp4',
    'outtmpl': 'downloaded_video.mp4'
}

# ダウンロード実行
with YoutubeDL(options) as ydl:
    ydl.download([youtube_url])
```

## YouTube音声のみをダウンロードする方法

動画ではなく音声だけを取得したい場合は、以下のように実行します。

```python
from yt_dlp import YoutubeDL

# YouTube動画のURL
youtube_url = "https://www.youtube.com/watch?v=oHIhCOl01J0"

# ダウンロードオプション
options = {
    'format': 'bestaudio/best',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192'
    }],
    'outtmpl': 'downloaded_audio'
}

# ダウンロード実行
with YoutubeDL(options) as ydl:
    ydl.download([youtube_url])
```

## yt-dlpの便利なオプション

### 解像度を指定してダウンロード

たとえば、480pの動画を取得したい場合は、以下のように指定できます。

```python
options = {
    'format': 'bestvideo[height<=480]+bestaudio/best',
    'merge_output_format': 'mp4'
}
```

### 字幕付きの動画を保存

```python
options = {
    'writesubtitles': True,
    'subtitleslangs': ['en'],
    'format': 'bestvideo+bestaudio/best',
    'merge_output_format': 'mp4'
}
```

### プレイリスト全体をダウンロード

```python
options = {
    'format': 'bestvideo+bestaudio/best',
    'merge_output_format': 'mp4',
    'yesplaylist': True
}
```

## コマンドラインからyt-dlpを使用する方法

Pythonスクリプトを使わず、コマンドラインから `yt-dlp` を直接実行することもできます。

### 動画のダウンロード（720p以下）

```sh
yt-dlp -f "bestvideo[height<=720]+bestaudio" --merge-output-format mp4 -o "downloaded_video.mp4" URL
```

### 音声のみをMP3でダウンロード

```sh
yt-dlp -f bestaudio -x --audio-format mp3 -o "downloaded_audio.mp3" URL
```

### 字幕付きの動画をダウンロード

```sh
yt-dlp --write-sub --sub-lang en -f "bestvideo+bestaudio" --merge-output-format mp4 -o "downloaded_video.mp4" URL
```

### プレイリスト全体をダウンロード

```sh
yt-dlp -f "bestvideo+bestaudio" --merge-output-format mp4 --yes-playlist -o "%(title)s.%(ext)s" PLAYLIST_URL
```

## 注意点と規約遵守

YouTubeの動画をダウンロードすることは、著作権の観点から慎重に行う必要があります。YouTubeの利用規約では、著作権者の許可なしに動画をダウンロードすることを禁止しているため、個人的な利用目的のみで使用し、商用利用や不正なダウンロードは避けてください。

## まとめ

`yt-dlp` を活用すれば、Pythonを使って簡単にYouTube動画や音声をダウンロードできます。Google Colabやローカル環境での利用方法、音声のみのダウンロード、字幕の取得など、さまざまなオプションを活用して目的に合った方法を選びましょう。

## 参考

- <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" rel="nofollow noopener">yt-dlp/yt-dlp</a>
