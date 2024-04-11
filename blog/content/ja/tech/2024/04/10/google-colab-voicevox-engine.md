---
title: Google Colab VOICEVOX ENGINEで音声生成 （CPU、GPU対応環境）
date: 2024-04-11T19:00:00+09:00
description: Google Colab VOICEVOX ENGINEで音声生成をする際にCPU、GPUを自動で判定して環境にあったVOICEVOX環境を生成します。
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

# Google Colab VOICEVOX ENGINEで音声生成 （CPU、GPU対応環境）
Google Colab VOICEVOX ENGINEで音声生成をする際にCPU、GPUを自動で判定して環境にあったVOICEVOX環境を生成します。
これによりGPUが使えない状況でもCPUの環境を自動的に作ってくれます。

## 環境構築

まずは環境構築を行います。

```python
# @title VOICEVOX ENGINE設定
# @markdown [VOICEVOX ENGINE リリースページ](https://github.com/VOICEVOX/voicevox_engine/releases/)
import os
import tensorflow as tf

os.environ['ENGINE_VERSION'] = "0.18.1" # @param {type:"string"}


if tf.test.gpu_device_name():
  # GPU
  !wget "https://github.com/VOICEVOX/voicevox_engine/releases/download/${ENGINE_VERSION}/voicevox_engine-linux-nvidia-${ENGINE_VERSION}.7z.001" 
  !7za x -y voicevox_engine-linux-nvidia-${ENGINE_VERSION}.7z.001
else:
  # CPU
  !wget "https://github.com/VOICEVOX/voicevox_engine/releases/download/${ENGINE_VERSION}/voicevox_engine-linux-cpu-${ENGINE_VERSION}.7z.001" -o "voicevox_engine.7z"
  !7za x -y voicevox_engine-linux-cpu-${ENGINE_VERSION}.7z.001

```

## VOICEVOX ENGINE 起動

VOICEVOX ENGINEの起動を行います。

```python
# @title VOICEVOX ENGINE 起動
# VOICEVOX ENGINE バックグランド起動
import tensorflow as tf
if tf.test.gpu_device_name():
  # GPU
  !./linux-nvidia/run --use_gps --allow_origin '*' --cors_policy_mode 'all' --host '127.0.0.1' > /dev/null 2>&1 &
else:
  # CPU
  !./linux-cpu/run --allow_origin '*' --cors_policy_mode 'all' --host '127.0.0.1' > /dev/null 2>&1 &

```

## テキスト合成サンプル

実際にテキスト合成をしてみます。

```python
# @title テキスト合成

# 音声変換ファイル用意
!echo -n "こんにちは、音声合成の世界へようこそ" >text.txt

# 音声クエリ変換
!curl -s \
    -X POST \
    "127.0.0.1:50021/audio_query?speaker=1"\
    --get --data-urlencode text@text.txt \
    > query.json

# 音声ファイル変換
!curl -s \
    -H "Content-Type: application/json" \
    -X POST \
    -d @query.json \
    "127.0.0.1:50021/synthesis?speaker=1" \
    > audio.wav

# 音声再生
from IPython.display import Audio
Audio("audio.wav", autoplay=True)

```

## まとめ

これでVOICEVOXをGoogle Colabで使用したい時に自動的に環境に合わせてVOICEVOX環境を構築してくれます。
VOICEVOX ENGINE は APIサーバーなので `ngrok` などを使えばローカル環境などから接続して使用することも可能になります。
