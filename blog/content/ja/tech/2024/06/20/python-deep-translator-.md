---
title: 【Python】多言語翻訳を簡単に！deep-translatorの使い方
date: 2024-06-20T13:00:00+09:00
description: Pythonには、さまざまな翻訳ライブラリがありますが、オススメなのが「deep-translator」です。
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

# Pythonでの多言語翻訳を簡単に！deep-translatorの使い方と特徴

Pythonには、さまざまな翻訳ライブラリがありますが、オススメなのが「deep-translator」です。

## deep-translatorとは

deep-translatorは、複数の翻訳サービス（Google Translate、Microsoft Translator、DeepLなど）を利用して、翻訳を簡単に行うためのPythonライブラリです。このライブラリは、シンプルなAPIを提供し、初心者でも簡単に利用できるよう設計されています。

## 対応翻訳サービス

deep-translator が対応している翻訳サービス一覧です。

- Google Translator
- Microsoft Translator
- DeepL Translator
- Baidu Translator
- Libre Translator
- Tencent Translator
- Papago Translator
- ChatGPT Translator

## インストール方法

deep-translatorのインストールは非常に簡単です。以下のコマンドを実行するだけで、インストールが完了します。

```bash
pip install deep-translator
```

## 使用例

以下は、deep-translatorを使用した簡単な翻訳の例です。

```python
from deep_translator import GoogleTranslator

# 翻訳するテキスト
text = "This is a test."

# 英語から日本語への翻訳
translated_text = GoogleTranslator(source='en', target='ja').translate(text)
print(translated_text) # Output: これはテストです。
```

このように、deep-translatorを使えば、複数の翻訳サービスを簡単に利用することができます。APIキーが必要なサービスもありますが、無料で利用できる範囲も広いです。

## 参考

- <a href="https://github.com/nidhaloff/deep-translator" target="_blank" rel="nofollow noopener">deep-translator GitHubリポジトリ</a>
- <a href="https://deep-translator.readthedocs.io/en/latest/" target="_blank" rel="nofollow noopener">deep-translator ドキュメント</a>
