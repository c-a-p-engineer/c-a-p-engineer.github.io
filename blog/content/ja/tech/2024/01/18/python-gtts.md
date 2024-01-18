---
title: 【Python】テキストから音声への変換：gTTSライブラリの活用
date: 2024-01-18T18:30:00+09:00
description: "Pythonでテキストを音声に変換する方法を紹介します。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Python
- 音声
categories: 
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# 【Python】テキストから音声への変換：gTTSライブラリの活用

Pythonでテキストを音声に変換する方法を紹介します。

gTTS（Google Text-to-Speech）というライブラリを使用します。

## gTTSライブラリの概要

gTTSは、Googleのテキスト音声変換APIを利用して、テキストを音声に変換するPythonライブラリです。
このライブラリは多言語に対応しており、簡単なコードで高品質の音声を生成できます。
必要なライブラリのインストール

まず、gTTSライブラリをインストールする必要があります。Python環境で以下のコマンドを実行してください。

```python
pip install gtts
```

このコマンドは、Pythonのパッケージ管理システムであるpipを用いてgTTSライブラリをインストールします。

## サンプルコード

```python
from gtts import gTTS
from IPython.display import Audio

# テキストを音声に変換
text = "優れたプログラマーは、金銭的な報酬や、人々から賞賛を浴びる目的で、コードを書くのではない。単純にプログラミングを楽しむために、コードを書くんだ。リーナス トーバルズ"
# text=話す内容
# lang=言語設定
tts = gTTS(text=text, lang='ja')

# 音声ファイルを保存
tts.save('audio.mp3')

# 生成した音声ファイルを再生
Audio('audio.mp3')

```

実際に作成した音声が以下です。
<audio controls src="/tech/2024/01/18/python-gtts/audio.mp3"></audio>

漢字もそのまま読んでくれますが、漢字によっては狙った読みをしてくれなかったりするのでそれに合わせて平仮名に変えたりなどの対応が必要になるかと思います。
