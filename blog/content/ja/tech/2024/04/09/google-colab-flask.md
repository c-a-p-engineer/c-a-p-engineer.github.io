---
title: Google ColabでFlask環境を構築し、Webアプリケーションを公開する方法
date: 2024-04-09T19:00:00+09:00
description: Google Colab上でFlaskアプリケーションを構築し、アプリケーションを公開する方法を紹介します。
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

# Google ColabでFlask環境を構築し、Webアプリケーションを公開する方法

Google Colab上でFlaskアプリケーションを構築し、`serve_kernel_port_as_window` と `serve_kernel_port_as_iframe` 関数を使ってアプリケーションを公開する方法を紹介します。

## Flaskのインストール

まずはFlaskをインストールします。FlaskはPythonで書かれた軽量なWebアプリケーションフレームワークで、シンプルながら強力な機能を提供します。

```python
!pip install flask
```

## Flaskアプリケーションの定義

Flaskを使って基本的なWebアプリケーションを定義します。以下のコードは、ルートURL（`/`）にアクセスした際に "Hello, World!" と表示するアプリケーションです。

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'
```

## アプリケーションの起動

アプリケーションを起動するには、特定のポートでFlaskアプリケーションを実行します。Colabでは、アプリケーションを別のスレッドで起動するのが一般的です。

```python

# 公開ポート
PROT = 7860

if __name__ == '__main__':
    from threading import Thread

    thread = Thread(target=lambda: app.run(port=PROT, debug=True, use_reloader=False))
    thread.start()
```

## アプリケーションの公開

Colabでは、`serve_kernel_port_as_window` と `serve_kernel_port_as_iframe` 関数を使って、特定のポートで実行されているアプリケーションを公開できます。

- `serve_kernel_port_as_window`:
  - 新しいブラウザウィンドウ（またはタブ）でアプリケーションを表示します。主に、ユーザーが直接インタラクションを必要とするアプリケーションに適しています。

```python
from google.colab import output
output.serve_kernel_port_as_window(PROT)
```

- `serve_kernel_port_as_iframe`:
  - 現在のColabノートブックのiframe内でアプリケーションを表示します。ノートブック内で直接結果を表示したい場合に便利です。

```python
from google.colab import output
output.serve_kernel_port_as_iframe(PROT)
```

## 注意点
- `serve_kernel_port_as_iframe` と `serve_kernel_port_as_window` を同時に使用することも可能ですが、通常はどちらか一方で十分です。
- Colab環境でポートを公開する際は、セキュリティ面での懸念を考慮し、公開する内容に注意してください。

この方法を利用すれば、Google Colabを使って手軽にFlaskアプリケーションの開発とテストを行い、その結果をリアルタイムで確認するができます。開発プロセスの迅速化や、教育目的でのデモンストレーションにも非常に有効です。
