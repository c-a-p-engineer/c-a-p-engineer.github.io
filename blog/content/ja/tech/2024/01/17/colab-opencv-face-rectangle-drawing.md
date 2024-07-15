---
title: 【Python】Google Colab上での顔検出
date: 2024-01-17T18:30:00+09:00
description: Pythonを利用してGoogle Colab上で顔検出をしてみました。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Python
- Google Colab
categories: 
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# 【Python】Google Colab上での顔検出

Pythonを利用してGoogle Colab上で顔検出をしてみました。

Google Colabを使用して画像に顔検出を行い、検出された顔に四角を描画する方法について説明します。

## Google Colab上での顔検出と画像加工

### 必要なライブラリのインストール
まず、画像処理に必要な`opencv-python-headless`とグラフィカルな出力に`matplotlib`をインストールします。

```python
!pip install opencv-python-headless matplotlib
```

#### 顔検出用のデータの取得
OpenCVには顔検出に使える事前学習済みの分類器があります。以下のコマンドで、そのうちの1つ`haarcascade_frontalface_default.xml`をダウンロードします。

```python
!wget https://raw.githubusercontent.com/opencv/opencv/master/data/haarcascades/haarcascade_frontalface_default.xml
```

#### 画像のアップロード
次に、処理を行う画像をGoogle Colabにアップロードします。

```python
from google.colab import files
uploaded = files.upload()
```

#### 画像に顔検出を行い、四角を追加
以下のスクリプトで、アップロードされた画像に対して顔検出を行い、検出された顔の位置に赤い四角を描画します。

```python
import cv2
from matplotlib import pyplot as plt

# 画像ファイルのパス（アップロードした画像の名前に置き換えてください）
image_path = 'your_uploaded_image.jpg'

# OpenCVを使用して画像を読み込む
image = cv2.imread(image_path)

# OpenCVではデフォルトで画像がBGRで読み込まれるため、RGBに変換
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# 顔検出用の分類器をロード
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# 顔検出実行
faces = face_cascade.detectMultiScale(image_rgb, 1.1, 4)

# 検出された顔の位置に四角を描画
for (x, y, w, h) in faces:
    cv2.rectangle(image_rgb, (x, y), (x+w, y+h), (255, 0, 0), 2)

# 図を描画
plt.figure(figsize=(8, 6))
plt.imshow(image_rgb)
plt.axis('off')  # 軸を非表示にする
plt.show()
```

### 実行結果
実行前の画像はこちら

![before](/tech/2024/01/17/colab-opencv-face-rectangle-drawing/before.png "before") 

実行すると以下のように顔の判定をして四角で囲まれます。

![after](/tech/2024/01/17/colab-opencv-face-rectangle-drawing/after.png "after") 

アニメ画像などで試してみましたが顔検出のデータが **実写以外には対応できていない** ためお気をつけてください。
