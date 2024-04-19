---
title: Google Colab で Selenium の動作を録画してみる。
date: 2024-04-19T13:00:00+09:00
description: Google Colab で Selenium の動作を録画してみました。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Google Colab
- Python
categories: 
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# Google Colab で Selenium の動作を録画してみる。

Google Colab で Selenium の動作を録画してみました。これで動作時にの動きを録画保存できます。

## 環境構築

まずは環境構築を行います。

```python
# @title 設定
# Selenium
# xvfb インストール
!sudo apt install ffmpeg xvfb
!pip install selenium xvfbwrapper
# ChoromeDriver
!apt-get update
!apt install chromium-chromedriver
# 日本語対応
!apt install fonts-ipafont-gothic
```

## Selenium実行

環境構築がサクッとできたのでSeleniumも実行してみます。

```python
# @title Selenium録画
!pacmd load-module module-null-sink sink_name=MySink

from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import os
from datetime import date
import json
import time
from xvfbwrapper import Xvfb

import sys, getopt, time, subprocess, shlex

print('Sreencast website animation')
xvfb = Xvfb(width=720, height=720, colordepth=24)
xvfb.start()

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36')

wd = webdriver.Chrome(options=chrome_options)
url = "https://twitter.com/c_a_p_engineer/status/1753985361796321397/video/1"

wd.get(url)
wd.save_screenshot("1.png")

ffmpeg_stream = 'ffmpeg -y -r 30 -f x11grab -s 720x720 -i :%d+nomouse -c:v libx264rgb -crf 15 -preset:v ultrafast -c:a pcm_s16le -af aresample=async=1:first_pts=0 ouxkt.mkv'  % xvfb.new_display

args = shlex.split(ffmpeg_stream)
p = subprocess.Popen(args)
print(p)

time.sleep(30) # record for 10 secs

wd.save_screenshot("2.png")

p.kill()
wd.quit()
xvfb.stop()

```

## 撮影結果

スクリーンショット

![screenshot](/tech/2024/04/19/google-colab-selenium-record/1.png "screenshot") 
![screenshot](/tech/2024/04/19/google-colab-selenium-record/2.png "screenshot") 
![screenshot](/tech/2024/04/19/google-colab-selenium-record/3.png "screenshot") 

撮影した動画（出力ファイルはmkvですがmp4に変換したものを載せています。

<video style="width:300px;" autoplay loop>
    <source src="/tech/2024/04/19/google-colab-selenium-record/ouxkt.mp4" type="video/mp4">
</video>

録画できました！

ただ、**録音はされてない**ので今後の課題になります。

## 参考

- <a href="https://stackoverflow.com/questions/70056692/google-colab-virtual-sink-audio-and-video-recording" target="_blank" rel="nofollow noopener">python - Google colab virtual sink audio and video recording - Stack Overflow</a>