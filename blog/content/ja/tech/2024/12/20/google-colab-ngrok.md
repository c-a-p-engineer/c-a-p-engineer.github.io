---
title: 【Python】Google Colabでngrokを使ってアクセスする方法
date: 2024-12-20T03:30:00+09:00
description: Google Colab でWebサーバーを立てたりすると通常ではアクセスできないので ngrok を使ってアクセスする方法のメモ。
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

# 【Python】Google Colabでngrokを使ってアクセスする方法
Google Colab でWebサーバーを立てたりすると通常ではアクセスできないので ngrok を使ってアクセスする方法のメモ。

## ngrokとは

**ngrok**はローカルで動作しているWebサーバー（`localhost`）を、外部からアクセス可能なURLとして公開するためのトンネリングツールです。  
Google Colabやローカル開発環境でテスト中のWebサービスを、クライアントや他の開発者に簡単に共有したい場合、ngrokを通じて一時的なパブリックURLを発行できます。  
オペレーターにとっては、ミッション達成への迅速なアクセスルートを提供するための戦術的支援ツールと言えます。

## ngrokトークンの取得方法  
ngrokの利用には無料アカウント作成が可能で、アカウント作成後に認証トークンを発行します。  
具体的な手順は以下のとおりです：  
1. <a href="https://ngrok.com/" target="_blank" rel="nofollow noopener">ngrok</a>にアクセスし、アカウントを作成（無料プランでOK）。
1. ログイン後、ダッシュボードから`Auth Token`が表示されます。
1. このトークンを`ngrok`利用時にコード内で設定します。

認証トークンは、まるでローカルのミッションを外部ネットワークへ安全に届けるための暗号キーのような存在です。

## サンプルコード  
以下はGoogle Colab上で`Flask`サーバーを起動し、`ngrok`を用いて外部からアクセス可能なURLを発行するサンプルコードです。

```python
!pip install flask pyngrok
import os
from flask import Flask
from pyngrok import ngrok, conf

# ngrokトークンを設定
conf.get_default().auth_token = "<YOUR_NGROK_TOKEN>"

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, World!"

if __name__ == "__main__":
    # ngrokで5000番ポートを外部公開
    public_url = ngrok.connect(5000)
    print(f"ngrok URL: {public_url}")
    # Flaskサーバーを起動
    app.run(port=5000)
```

**ポイント**：  
- `conf.get_default().auth_token = "<YOUR_NGROK_TOKEN>"`でトークンを設定します。  
- `ngrok.connect(5000)`で、Flaskが使用する`5000`番ポートをトンネル経由で公開。  
- 実行後、出力に`https://xxxx.ngrok.io`といった形式のURLが表示され、これをブラウザで開くと`"Hello, World!"`が表示されます。

## まとめ  
- **ngrok**を使うことで、ローカルで起動したWebアプリケーションを外部へ公開可能。  
- **認証トークン**はアカウント作成後に取得し、`conf.get_default().auth_token`で設定。  
- このサンプルを活用することで、Google Colab上で手軽にWebサービスをデプロイする代替策として利用できます。
