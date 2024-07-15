---
title: Google Colab で Google Drive と接続する方法
date: 2024-02-08T19:00:00+09:00
description: Google Colab と Google Drive を連携させることで、データの保存、読み込み、整理をスムーズに行えます。
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

# Google Colab で Google Drive と接続する方法

Google Colab とGoogle Driveを連携させることで、データの保存、読み込み、整理をスムーズに行えます。
Google Colab を使って、データを分析したり、モデルを訓練したりする際には、しばしば外部のデータソースにアクセスしたり、処理したデータを保存したりする必要があります。

## Google Driveをマウントする

Google Colabのノートブックで、以下のコードをセルに貼り付けて実行します。
このコードにより、Google Driveをマウントし、Colabから直接Drive内のファイルにアクセスできるようになります。

```python
from google.colab import drive
drive.mount('/content/drive')
```

このコードを実行すると、認証を求めるリンクが表示されます。リンクをクリックし、Googleアカウントを選択して認証を完了すればマウントされます。

接続されたらColabo側から通常のフォルダと同様に扱うことができます。
これでデータの取り込みや生成したものを簡単に保存することが可能になります。
