---
title: "Google ColabでPHPプログラミングを始める方法"
date: 2024-03-18T19:00:00+09:00
description: "Google ColabでPHPをを動かす！"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Google Colab
- PHP
categories: 
- PHP
image: images/thumbnail/php.png
---

# Google ColabでPHPプログラミングを始める方法

Google ColabでPHPをを動かす！

## PHPのインストール

まず、PHPをGoogle Colabにインストールする手順から始めましょう。以下のコマンドを新しいColabノートブックのセルに貼り付けて実行します。

```bash
!apt install -y php
```

これらのコマンドにより、PHPがインストールされます。

## PHPバージョンの確認

インストール後、PHPが正しくインストールされたかを確認するために、バージョン情報を表示します。

```bash
!php -version
```

このコマンドの出力でPHPのバージョン情報が表示されれば、インストール成功です。

## PHPを実行する

PHPを実行してみます。

```bash
!php -r 'echo "Hello,World!\n";'
```

これが出力された成功です

```text
Hello,World!
```

## PHPサーバーを起動させる

まずはPHPファイルを作成します。

```bash
%%writefile index.php
<?php
echo "Hello World!"
```

### サーバーを起動

以下のやり方でPHPのサーバーを起動して公開することが可能です。

```
# Google Colab でポートを公開
from google.colab import output
output.serve_kernel_port_as_window(8888, path="")

# PHPサーバーを起動
!php -S localhost:8888 -t ./ 
```

これでGoogle Colab上でPHPの実行、サーバー公開が可能になります。