---
title: "【Google Colab】AivisSpeech Engineで音声合成をする！"
date: 2025-01-25T04:30:00+09:00
description: "Google Colab 上で AivisSpeech Engineを手軽に試すためのサンプルコードをまとめました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Google Colab
- Python
- 音声合成
categories: 
- Google Colab
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# 【Google Colab】AivisSpeech Engineで音声合成をする！

Google Colab 上で AivisSpeech Engineを手軽に試すためのサンプルコードをまとめました。

## AivisSpeech Engine とは

**AivisSpeech Engine**（は、オープンソースとして開発されている音声合成エンジンの一種です。GitHub 上で公開されており、リポジトリからソースコードおよびバイナリを取得できます。複数の話者スタイル（スピーカー ID）をサポートしているほか、エンジン起動後はローカルホストの REST API（`http://127.0.0.1:10101/`）を通じて音声合成が可能です。

公式の GitHub リポジトリでは、セットアップ方法の詳細や OS 別の導入手順について解説されていますので、興味がある方は下記リンクをご参照ください。

- <a href="https://github.com/Aivis-Project/AivisSpeech-Engine" target="_blank" rel="nofollow noopener">AivisSpeech-Engine GitHub レポジトリ</a>


エンジンのビルド済みバイナリは、**Releases** タブにて .7z 形式で公開されています。CPU 環境と GPU 環境の両方で動作しますが、GPU が使用できる環境であれば、エンジンを起動する前に別途「CUDA」や「cuDNN」などのライブラリを整える必要があります。

---

## Google Colab で試すためのサンプルコード

以下に示すスクリプトは、Google Colab 環境で AivisSpeech Engine を動作させるためのものです。実行すると、次のことが自動的に行われます。

1. **AivisSpeech Engine バイナリのダウンロード & 解凍**  
   指定したバージョン（`ENGINE_VERSION`）に合わせて `.7z.001` ファイルをダウンロードし、7zip で解凍します。

2. **GPU が使用可能かどうかの判定**  
   GPU が使用可能ならば、NVIDIA の `cuDNN 9.5.1` をインストールし、GPU 対応でエンジンを起動します。  
   もし GPU が見つからなければ、CPU モードでエンジンを起動します。

3. **スピーカー情報の取得**  
   エンジン起動直後は API が立ち上がるまで時間がかかることがあるため、複数回リトライしながら `GET /speakers` でスピーカーリストを取得します。

4. **音声合成（テキスト→音声ファイル生成）**  
   `POST /audio_query` および `POST /synthesis` エンドポイントにテキストやスタイル ID を渡して、音声ファイル（WAV）を生成します。

コード全体を Colab に貼り付けて、「セルを実行」するだけで動作します。各種パラメーター（音声の速度や音量、使用するスタイル ID など）を調整すれば、柔軟に音声を合成できます。

---

### サンプルコード全体

CPU/GPU どちらにも対応するように記載しています。

```python
# @title 設定
# @markdown [AivisSpeech ENGINE リリースページ](https://github.com/Aivis-Project/AivisSpeech-Engine/releases/)<br>
# @markdown http://127.0.0.1:10101/docs

import os
import tensorflow as tf
import time

os.environ['ENGINE_VERSION'] = "1.0.0" # @param {type:"string"}

!wget "https://github.com/Aivis-Project/AivisSpeech-Engine/releases/download/${ENGINE_VERSION}/AivisSpeech-Engine-Linux-x64-${ENGINE_VERSION}.7z.001"
!7za x -y AivisSpeech-Engine-Linux-x64-${ENGINE_VERSION}.7z.001

if tf.test.gpu_device_name():
  # GPU
  print("GPU!!")
  # https://github.com/Aivis-Project/AivisSpeech-Engine?tab=readme-ov-file#linux
  # cudnn9をインストールする
  print("cudnn9 install!!")
  !wget https://developer.download.nvidia.com/compute/cudnn/9.5.1/local_installers/cudnn-local-repo-ubuntu2004-9.5.1_1.0-1_amd64.deb
  !sudo dpkg -i cudnn-local-repo-ubuntu2004-9.5.1_1.0-1_amd64.deb
  !sudo cp /var/cudnn-local-repo-ubuntu2004-9.5.1/cudnn-*-keyring.gpg /usr/share/keyrings/
  !sudo apt-get update
  !sudo apt-get -y install cudnn
  !./Linux-x64/run --use_gpu > /dev/null 2>&1 &
else:
  # CPU
  print("CPU!!")
  !./Linux-x64/run > /dev/null 2>&1 &

```

```python
# @title スピーカー一覧（起動待ち対策）
import requests
import json
import time

# APIエンドポイント
url = "http://127.0.0.1:10101/speakers"

# 最大リトライ回数と待機時間
max_retries = 10
wait_time = 10  # 秒

# リトライ処理
for attempt in range(1, max_retries + 1):
    try:
        response = requests.get(url, timeout=5)  # タイムアウトを設定
        response.raise_for_status()  # HTTPエラーがあれば例外を発生させる
        
        # スピーカー情報を取得できた場合
        speakers = response.json()
        print(json.dumps(speakers, indent=4, ensure_ascii=False))
        break

    except requests.exceptions.ConnectionError:
        print(f"Attempt {attempt}/{max_retries}: Connection refused, retrying in {wait_time} seconds...")
    except requests.exceptions.Timeout:
        print(f"Attempt {attempt}/{max_retries}: Request timed out, retrying in {wait_time} seconds...")
    except requests.exceptions.HTTPError as e:
        print(f"Attempt {attempt}/{max_retries}: HTTP Error {e}, retrying in {wait_time} seconds...")

    # 最大リトライ回数に達するまで待機
    if attempt < max_retries:
        time.sleep(wait_time)
else:
    print("Failed to retrieve speakers after multiple attempts. Check if the engine is running.")
```

```python
# @title 音声生成
import requests
import json

# APIエンドポイント
BASE_URL = "http://127.0.0.1:10101"

def update_query_json(file_path, updates):
    """
    query.jsonファイルを更新する関数

    Parameters:
    file_path (str): query.jsonのパス
    updates (dict): 更新するキーとその値の辞書

    Returns:
    None
    """
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    for key, value in updates.items():
        if key in data:
            data[key] = value
        else:
            print(f"Warning: '{key}' is not found in the JSON data.")

    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

def synthesize_speech(text, style_id, output_wav="audio.wav"):
    """
    テキストを音声に変換し、音声ファイルを保存する関数

    Parameters:
    text (str): 音声に変換するテキスト
    style_id (int): 使用するスピーカーのID
    output_wav (str): 出力する音声ファイルのパス

    Returns:
    str: 生成された音声ファイルのパス
    """
    # テキストファイルに書き込み
    text = text.lower()
    with open("text.txt", "w") as file:
        file.write(text)

    # 音声クエリを取得
    query_response = requests.post(
        f"{BASE_URL}/audio_query?speaker={style_id}",
        params={"text": text}
    )

    # クエリをJSON形式で保存
    with open("query.json", "w") as file:
        file.write(query_response.text)

    # スピード設定などクエリの値を更新
    speed = 0.9 # @param {"type":"number","placeholder":"速度数値"}
    updates = {
        "speedScale": speed,
        "volumeScale": 1  # 全体の音量
    }
    update_query_json("query.json", updates)

    # 音声合成を実行し、音声ファイルを保存
    with open("query.json", "r") as file:
        synthesis_response = requests.post(
            f"{BASE_URL}/synthesis?speaker={style_id}",
            headers={"Content-Type": "application/json"},
            data=file.read()
        )

    with open(output_wav, "wb") as file:
        file.write(synthesis_response.content)

    return output_wav

# STYLE_IDの設定（適宜変更）
style_id = "888753762" # @param {"type":"string","placeholder":"スタイルID"}
text = "世間ではビーンだのゴーンだのの話題で騒がしいが、ワイはこれら二つのワードには共通点があると思う。それは頭に「股間の」とつけて意味が通じるということだ。 股間がビーン、股間がゴーン。ちなワイの股間はゾーン。"
synthesize_speech(text=text, style_id=style_id, output_wav="audio.wav")

from IPython.display import Audio
Audio("audio.wav", autoplay=True)
```

## サンプル音声

サンプルとして作った音声です。

<video style="width:300px;" controls="true">
    <source src="/tech/2025/01/23/google-colab-aivis-speech-engine/sample.mp4" type="video/mp4">
</video>

## 参考

- <a href="https://github.com/Aivis-Project/AivisSpeech-Engine" target="_blank" rel="nofollow noopener">AivisSpeech-Engine GitHub レポジトリ</a>
