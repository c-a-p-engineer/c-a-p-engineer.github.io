---
title: Google Colab VOICEVOXで音声生成 CPU、GPU対応環境、自動作成版
date: 2024-04-09T02:00:00+09:00
description: Google Colab VOICEVOXで音声生成をする際にCPU、GPUを自動で判定して環境にあったVOICEVOX環境を生成します。
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

# Google Colab VOICEVOXで音声生成 CPU、GPU対応環境、自動作成版
Google Colab VOICEVOXで音声生成をする際にCPU、GPUを自動で判定して環境にあったVOICEVOX環境を生成します。
これによりGPUが使えない状況でもCPUの環境を自動的に作ってくれます。

## 環境構築

```python
# @title VOICEVOX設定
import torch
import os

# 必要なライブラリのパスを追加
os.environ['LD_LIBRARY_PATH'] += f":/content/voicevox_core/"
# 英語(米国)のロケールを設定
os.environ['LANG'] = 'en_US.UTF-8'
os.environ['LC_ALL'] = 'en_US.UTF-8'

if torch.cuda.is_available():
  # GPU利用
  print("GPU")
  # VOIVEVOX設定
  !curl -sSfL https://github.com/VOICEVOX/voicevox_core/releases/latest/download/download.sh | bash -s -- --device cuda
  !wget https://github.com/VOICEVOX/voicevox_core/releases/download/0.15.3/voicevox_core-0.15.3+cuda-cp38-abi3-linux_x86_64.whl
  !pip install voicevox_core-0.15.3+cuda-cp38-abi3-linux_x86_64.whl

  # cuda11インストール
  # CUDAリポジトリのGPGキーとリポジトリの設定をダウンロード
  !wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-ubuntu1804.pin
  !sudo mv cuda-ubuntu1804.pin /etc/apt/preferences.d/cuda-repository-pin-600
  # CUDA 11のローカルリポジトリパッケージをダウンロード
  !wget http://developer.download.nvidia.com/compute/cuda/11.0.3/local_installers/cuda-repo-ubuntu1804-11-0-local_11.0.3-450.51.06-1_amd64.deb
  # パッケージをインストールし、リポジトリリストに追加
  !sudo dpkg -i cuda-repo-ubuntu1804-11-0-local_11.0.3-450.51.06-1_amd64.deb
  # GPGキーを追加
  !sudo apt-key add /var/cuda-repo-ubuntu1804-11-0-local/7fa2af80.pub
  # システムを更新し、CUDAをインストール
  !sudo apt-get update
  !sudo DEBIAN_FRONTEND=noninteractive apt-get -y install cuda-11-0
else:
  # CPU利用
  print("CPU")
  # VOIVEVOX設定
  !curl -sSfL https://github.com/VOICEVOX/voicevox_core/releases/latest/download/download.sh | bash -s
  !wget https://github.com/VOICEVOX/voicevox_core/releases/download/0.15.3/voicevox_core-0.15.3+cpu-cp38-abi3-linux_x86_64.whl
  !pip install voicevox_core-0.15.3+cpu-cp38-abi3-linux_x86_64.whl

# Python実行ファイル取得
!wget https://raw.githubusercontent.com/VOICEVOX/voicevox_core/406f6c41408836840b9a38489d0f670fb960f412/example/python/run.py

```

- GPU: 約8分
- CPU: 約1分

GPUの場合、色々なものをインストールため、設定に時間がかかります。そのため短い言葉などならCPUを利用した方が良いです。大量の生成を行うならGPUの方が良いかも知れません。

## 音声生成

```python
# @title 音声生成
import IPython.display
audio=f'temp.wav'
text = """
いろはにほへと、
ちりぬるを、
わかよたれそ、
つねならむ、
うゐのおくやま、
けふこえて、
あさきゆめみし、
ゑひもせす
"""
!pip install numpy

!python ./run.py --dict-dir "./voicevox_core/open_jtalk_dic_utf_8-1.11" --text "{text}" --out "{audio}" --speaker-id "50"
IPython.display.Audio(audio, autoplay=True)
```

- GPU: 9秒（初回15秒、初回だけ時間がかかります。
- CPU: 17秒

## まとめ

これでVOICEVOXをGoogle Colabで使用したい時に自動的に環境に合わせてVOICEVOX環境を構築してくれます。
