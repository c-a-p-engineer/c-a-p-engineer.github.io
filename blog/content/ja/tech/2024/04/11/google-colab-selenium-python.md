---
title: Google Colab で Selenium の環境構築と実行
date: 2024-04-11T19:00:00+09:00
description: Google Colab で Selenium の環境構築と実行のメモ
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

# Google Colab で Selenium の環境構築と実行

Google Colab で Selenium の環境構築と実行のメモ。

以前にも Google Colab で Selenium の実行方法を記載しましたが、以前書いたものは Google Colab 上でしか使えないものだったため、ローカルとの互換性を持たせたソースのメモです。

## 環境構築

まずは環境構築を行います。

```python
# インストール
!pip install selenium
# ChoromeDriver
!apt-get update
!apt install chromium-chromedriver

# 日本語対応
!apt install fonts-ipafont-gothic
```

## Selenium実行

環境構築がサクッとできたのでSeleniumも実行してみます。

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

# 対象URLを指定
url = "http://example.com"

# driver のオプション設定
options = webdriver.ChromeOptions()
options.add_argument('--headless') # ヘッドレスモードを利用
options.add_argument('--no-sandbox') # sandbox 機能を利用しない
options.add_argument('--disable-dev-shm-usage') # /dev/shm を利用しない (メモリ不足対策)
options.add_argument('--lang=ja-JP') # 日本語対応

# オプションを指定してブラウザを立ち上げます
browser = webdriver.Chrome(options=options)

# 対象URLのコンテンツを取得
browser.get(url)

# コンテンツからaタグのリストを作成
tags = browser.find_elements(By.TAG_NAME, "h1")

for tag in tags:
  print(tag.text) 

browser.save_screenshot('example_screenshot.png')
browser.quit()

```

これで `h1` タグのテキスト内容とスクリーンショットを撮ってくれます。

これで Google Colab で簡単にSeleniumを使って色々できます。
