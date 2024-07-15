---
title: "【Python】Bar Chart Race を使ってグラフ動画を作る"
date: 2021-09-25T17:00:00+09:00
description: "Python で Bar Chart Race を使用してグラフ動画を作る"
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

# 【Python】 Bar Chart Race を使ってグラフ動画を作る
Python で Bar Chart Race を使用してグラフ動画を作る方法。

## 環境
* Python3

## ffmpeg の導入
動画作成用に `ffmpeg` を導入してください。
```
apt install -y ffmpeg
```

## パッケージインストール

### 動画作成用のパッケージ
<a href="https://www.dexplo.org/bar_chart_race/" target="_blank" rel="nofollow noopener">Bar Chart Race</a>
```
pip bar_chart_race
```

### グラフの日本語表示用パッケージ
<a href="https://pypi.org/project/japanize-matplotlib/" target="_blank" rel="nofollow noopener">japanize-matplotlib - PyPI</a>
```
pip japanize_matplotlib
```

### ソースコード

グラフの元データは <a href="https://corona.go.jp/dashboard/" target="_blank" rel="nofollow noopener">新型コロナウイルス(COVID-19)感染症の対応について｜内閣官房新型コロナウイルス感染症対策推進室</a> から取得させていただいています。

```python:graf.py
import requests
import json
import pandas as pd
import bar_chart_race as bcr
import japanize_matplotlib

# コロナの感染者を取得
r = requests.get('https://opendata.corona.go.jp/api/Covid19JapanAll')
with open('covid19_daily.json', 'w') as f:
    f.write(r.text)

# JSONを読み込む
data = json.load(open('covid19_daily.json'))

# JSONをデータフレームにする
df = pd.DataFrame(data["itemList"])

# 整形
# 10行ごとにデータ変換
df = df.pivot_table(
    index='date',
    columns='name_jp',
    values='npatients').dropna()[::10]

# アニメーションをmp4で保存する
bcr.bar_chart_race(
    df=df,
    filename='covid19_daily.mp4',
    title='COVID-19 都道府県別感染者数',
    orientation='h',
    sort='desc',
    n_bars=10,
)
```

## 動画
出来上がった動画はこちらになります。

<video controls>
    <source src="/tech/2021/09/25/python-bar_chart_race/covid19_daily.mp4" type="video/mp4">
    Sorry, your browser doesn't support embedded videos.
</video>

## 参考
* <a href="https://www.dexplo.org/bar_chart_race/" target="_blank" rel="nofollow noopener">【簡単/無料】「動くグラフ」の作り方を解説 | キノコード</a>
* <a href="https://kino-code.com/bar-chart-race/" target="_blank" rel="nofollow noopener">Bar Chart Race</a>
