---
title: 【Google Colab】VSCodeを設定して使ってみよう！
date: 2024-12-28T20:00:00+09:00
description: Google ColabはVSCodeのような統合開発環境 (IDE) を利用することはできません。しかし、少し工夫をすることで、Google Colab上でVSCodeを使うことが可能です。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Google Colab
categories: 
- Google Colab
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# 【Google Colab】VSCodeを設定して使ってみよう！

Google Colabは、データサイエンティストやプログラマーにとって便利な環境ですが、標準のインターフェイスではVSCodeのような統合開発環境 (IDE) を利用することはできません。しかし、少し工夫をすることで、Google Colab上でVSCodeを使うことが可能です。本記事では、Code Serverとngrokを活用して、Colab上でVSCodeを設定する手順をわかりやすく解説します。

---

## Code Serverのインストール

Code Serverは、ブラウザベースでVSCodeを動作させるためのオープンソースツールです。以下のコマンドを実行してCode Serverをインストールします。

```bash
# @title VSCodeインストール
!wget https://github.com/coder/code-server/releases/download/v4.13.0/code-server-4.13.0-linux-amd64.tar.gz
!tar -xvf code-server-4.13.0-linux-amd64.tar.gz
!mv code-server-4.13.0-linux-amd64/code-server /usr/local/bin/
```

---

## Code Serverの設定

Code Serverが正常に動作するためには、設定ファイルを作成する必要があります。以下のコマンドで、必要な設定を行います。

```bash
# @title CodeServer設定
!mkdir -p ~/.config/code-server
!echo "bind-addr: 0.0.0.0:8888" > ~/.config/code-server/config.yaml
!echo "auth: none" >> ~/.config/code-server/config.yaml
```

これにより、Code Serverがポート`8888`でリッスンし、認証なしでアクセス可能になります。

---

## Code Serverの起動

Code Serverをバックグラウンドで実行するには以下のコマンドを使用します。

```bash
# @title Codeserver軌道
!nohup /usr/local/bin/code-server > server.log 2>&1 &
```

このコマンドを実行すると、Code Serverが起動し、サーバーログが`server.log`に保存されます。

---

## ngrokを使った外部公開

Colabは外部から直接アクセスすることができません。そのため、ngrokを使って、Code Serverを外部に公開します。

### 必要なパッケージをインストール

まず、ngrokをインストールします。

```bash
!pip install pyngrok
```

### ngrokトークンの設定とサーバー公開

以下のコードを使ってngrokを設定し、公開URLを取得します。

```python
# @title ngrokを使った公開
import os
from flask import Flask
from pyngrok import ngrok, conf

# ngrokトークンを設定
ngrok_token = "<ngrok_token>"  # ngrokのトークンを入力
conf.get_default().auth_token = ngrok_token

# ポート8888を公開
public_url = ngrok.connect(8888)
print(f"ngrok URL: {public_url}")
```

`<ngrok_token>` には、ngrokの公式サイトから取得した認証トークンを入力してください。このコードを実行すると、`ngrok URL`として外部からアクセス可能なリンクが表示されます。このURLをブラウザに入力すると、VSCodeのインターフェイスが表示されます。

VSCodeの画面が現れてターミナルなども操作可能で感動します！

![VSCode](/tech/2024/12/28/google-colab-vscode-setup-guide.png "VSCode") 

---

## 注意点

1. **セキュリティ**  
   認証が無効化されているため、ngrok URLを第三者に共有しないように注意してください。

2. **リソース制限**  
   Colabのリソース制限があるため、大規模なプロジェクトには不向きです。

3. **セッションの持続性**  
   Google Colabのセッションが終了すると、サーバーも停止します。作業中はセッションを維持するようにしましょう。

---

## まとめ

本記事では、Google Colab上でVSCodeを使用するための設定手順を解説しました。この方法を使えば、Google Colabのリソースを活用しながら、VSCodeの利便性を享受できます。必要なコマンドを実行するだけで簡単にセットアップできるため、ぜひ試してみてください。
