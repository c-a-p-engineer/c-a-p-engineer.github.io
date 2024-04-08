---
title: Google Colab モデルのロードがされない現象の解決方法
date: 2024-01-08T06:00:00+09:00
description: Google Colab で Hugging Face Hub からモデルダウンロードができない現象の解決方法
draft: false
enableToc: true
enableTocContent: true
tags: 
- Google Colab
categories: 
- Google Colab
image: images/thumbnail/ai_robot.jpg
---

# Google Colab モデルのロードがされない現象の解決方法

Google Colab で Hugging Face Hub からモデルダウンロードができない現象の解決方法

## 現象

Google Colab で Hugging Face Hub からモデルをダウンロードしようとすると、 `fetching files` でストップする。


## 原因

原因は Google Colab に入っている `huggingface_hub` パッケージのせいです。
ローカル環境などでは問題は発生しないようです。

## 対応

Google Colab に入っている `huggingface_hub` パッケージを削除してください。

```bash
!pip install -U huggingface_hub
```

現在は修正済みの模様ですが、まだ同現象が発生している場合は上記の処理が必要の模様です。

<a href="https://github.com/huggingface/huggingface_hub/pull/1953#issuecomment-1878364894" target="_blank" rel="nofollow noopener">Fix thread-safety when fetching user secret in Google Colab #1953</a>

## 参考

- <a href="https://github.com/huggingface/diffusers/issues/6441" target="_blank" rel="nofollow noopener">from_pretrained can't work in Google Colab · Issue #6441 · huggingface/diffusers</a>
