---
title: "【Google Colab】ファイルをダウンロードする方法"
date: 2025-02-16T04:00:00+09:00
description: "今回は、Google Colab上でファイルを作成し、ダウンロードする方法をご紹介します。コードがシンプルなので、データ生成後のファイル取得がとっても簡単。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Google Colab
- Python
categories: 
- Google Colab
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# 【Google Colab】ファイルをダウンロードする方法

今回は、Google Colab上でファイルを作成し、ダウンロードする方法をご紹介します。コードがシンプルなので、データ生成後のファイル取得がとっても簡単。

## 実装方法

下記のコードをColabのセルにそのまま貼り付けて実行するだけでOKです。  
このコードは、まず`sample.txt`というテキストファイルを作成し、その後すぐにダウンロードを開始します。

```python
from google.colab import files

# ファイルの作成とダウンロードを同時に実行
with open('sample.txt', 'w') as f:
    f.write('Hello, this is a sample file from Google Colab!')

files.download('sample.txt')
```

- **1ステップで実行**: ファイル作成とダウンロード処理を一連の流れで実行。作業がとても効率的です！
- **公式ドキュメント**: 詳細は<a href="https://colab.research.google.com/notebooks/io.ipynb" target="_blank" rel="nofollow noopener">Google ColabのI/Oノートブック</a>でチェックできます。  
