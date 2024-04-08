---
title: Google Colab で Gradio を使ってみる
date: 2024-02-15T13:00:00+09:00
description: Google Colabを使用してGradioで公開してみる。
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

# Google Colab で Gradio を使ってみる
Google Colabを使用してGradioで公開してみる。

## Gradioのインストール

GradioはPython 3.8以上が必要です。Google Colabでの使用開始には、以下のコマンドを実行してGradioをインストールします。

```python
pip install gradio
```

## Gradioアプリの作成

Gradioを使って、簡単な挨拶をするアプリを作成してみましょう。
以下はその基本的なコード例です

```python
import gradio as gr

def greet_user(name):
    return "Hello " + name + " Welcome to Gradio!"

app = gr.Interface(fn=greet_user, inputs="text", outputs="text")
app.launch()
```

このコードをGoogle Colabで実行すると、Gradioアプリが起動し、ブラウザに表示されます。


完了後にログが出力されます。

```
Setting queue=True in a Colab notebook requires sharing enabled. Setting `share=True` (you can turn this off by setting `share=False` in `launch()` explicitly).

Colab notebook detected. To show errors in colab notebook, set debug=True in launch()
Running on public URL: https://bc052f0d6e2fdf15bf.gradio.live

This share link expires in 72 hours. For free permanent hosting and GPU upgrades, run `gradio deploy` from Terminal to deploy to Spaces (https://huggingface.co/spaces)
```

`Running on public URL` で公開されたURLが表示され接続できます。

Gradio に公開された画面です。

![gradio](/tech/2024/02/15/google-colabo-gradio/gradio.png "gradio") 

## まとめ

Google Colabと組み合わせることで、クラウド上で容易にこれらのデモを開発し、広く公開することが可能になります。
Gradioの詳細なドキュメンテーションやさらなる情報は、<a href="https://www.gradio.app" target="_blank" rel="nofollow noopener">Gradio</a>や<a href="https://huggingface.co/gradio" target="_blank" rel="nofollow noopener">HuggingFace gradio</a>のサンプルを参照してください。
