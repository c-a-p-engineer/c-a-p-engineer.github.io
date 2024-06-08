---
title: 【Docker】Libre Translate を使用して翻訳する
date: 2024-06-08T19:00:00+09:00
description: LibreTranslateは、オープンソースの翻訳ツールで、無料で多言語の翻訳サービスを提供します。機械学習を利用してテキスト翻訳を行います。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】LibreTranslate を使用して翻訳する

LibreTranslateは、オープンソースの翻訳ツールで、無料で多言語の翻訳サービスを提供します。機械学習を利用してテキスト翻訳を行います。

- <a href="https://libretranslate.com/" target="_blank" rel="nofollow noopener">Libre Translate</a>

ちなみにですがLibreTranslateはAPIキーを取得すればローカルにDockerを建てたりする必要もなく翻訳を使用することが可能です。

## コンテナを起動する

今回使用するDockerImageです。
- <a href="https://hub.docker.com/r/libretranslate/libretranslate" target="_blank" rel="nofollow noopener">libretranslate/libretranslate
</a>

このコマンドでコンテナを起動します。

```sh
docker run -ti --rm -p 5000:5000 libretranslate/libretranslate
```

このコマンドにより、LibreTranslateがバックグラウンドで実行され、ローカルのポート5000でアクセス可能になります。

## LibreTranslateの使用方法

### APIエンドポイントの紹介

LibreTranslateは、REST APIを提供しており、以下のエンドポイントを利用できます。

- `/translate`：テキスト翻訳を行うエンドポイント

### 実際の翻訳リクエストの例

次に、実際に翻訳リクエストを送信する方法を紹介します。以下の例では、`curl`コマンドを使用して英語から日本語への翻訳を行います。

```sh
curl -X POST "http://localhost:5000/translate" \
-H "Content-Type: application/json" \
-d '{
    "q": "Hello, world!",
    "source": "en",
    "target": "ja"
}'
```


このリクエストを送信すると、以下のようなJSONレスポンスが返ってきます。

```json
{"translatedText":"お問い合わせ!"}
```

……とりあえず本当にこれが返ってきます。

公式サイトのサンプルを見てみると `alternatives` （代替案）という別の候補も見れるみたいです。なんでそんな回答になるのかぁ…

```json
{
    "alternatives": [
        "こんにちは、世界!",
        "こんにちは!",
        "世界中!"
    ],
    "detectedLanguage": {
        "confidence": 100,
        "language": "en"
    },
    "translatedText": "お問い合わせ!"
}
```

### パラメータの説明

- `q`：翻訳するテキスト
- `source`：ソース言語のコード（ISO 639-1）
- `target`：ターゲット言語のコード（ISO 639-1）

## まとめ

今回無料で使える翻訳システムということでLibre Translateを使用してみましたが精度が微妙なので使うかはまた検討する必要があると思います。

## 参考

- <a href="https://libretranslate.com/" target="_blank" rel="nofollow noopener">Libre Translate</a>
