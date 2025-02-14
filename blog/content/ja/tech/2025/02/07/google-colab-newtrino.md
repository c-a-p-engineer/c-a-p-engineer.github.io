---
title: "【Google Colab】NEUTRINOを実行する方法"
date: 2025-02-07T18:30:00+09:00
description: "NEUTRINOは、楽譜データ（MusicXML）を基に音声を合成する技術です。今回はGoogle Colab上でNEUTRINOをセットアップし、変換処理から音声出力の確認までの手順を解説します。"
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

# 【Google Colab】NEUTRINOを実行する方法

NEUTRINOは、楽譜データ（MusicXML）を基に音声を合成する技術です。今回はGoogle Colab上でNEUTRINOをセットアップし、変換処理から音声出力の確認までの手順を解説します。

- <a href="https://studio-neutrino.com/" target="_blank" rel="nofollow noopener">NEUTRINO公式サイト</a>


**この記事を読めばわかること：**
- Google DriveからNEUTRINOのセットアップ
- MusicXMLから音声合成までの流れ
- Google Colabでの音声出力の確認方法

上から順次実行していけば歌声ができます。

## NEUTRINOのセットアップ

まずは、必要なZIPファイルをGoogle Driveから取得し、Colabの作業ディレクトリ（`/content/`）に解凍します。

```python
# @title NEUTRINOセットアップ（GoogleDriveバージョン）
# @markdown ダウンロードサイト:https://studio-neutrino.com/535/<br>

import gdown
import zipfile
import os

# @markdown GoogleDriveのファイルIDを入れてください。
file_id = "1Zx_uFxpIzIuSmO_1lYXX4_NEmvSbO5FI" #@param {type:"string"}

# Google Driveからファイルをダウンロード
file_path = gdown.download(f"https://drive.google.com/uc?id={file_id}", quiet=False)
print(f"ダウンロードしたファイル: {file_path}")

# ZIPファイルを解凍
extract_path = "/content/"
if zipfile.is_zipfile(file_path):
    with zipfile.ZipFile(file_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)
    print(f"ファイルを '{extract_path}' に解凍しました。")
else:
    print("ダウンロードしたファイルはZIP形式ではありません。")

# 解凍したファイルに移動
!cd /content/NEUTRINO
# 実行権限を付与
!find . -type f -exec chmod 755 {} \;
```

**ポイント解説:**
- `gdown` を使用してGoogle Driveからファイルをダウンロード。
- ZIP形式であることを確認後、解凍。
- `chmod 755` を適用し、全ファイルに実行権限を付与。

## NEUTRINOの変換パイプラインを実行

次に、MusicXMLから音声を生成するための一連の処理を実行します。

```bash
# @title NEWTRINO変換スタート
# Run All process

%%bash
# プロジェクト設定
BASENAME=sample1 # 拡張子なしファイル名
NumThreads=4
InferenceMode=4

# musicXML_to_label の設定
SUFFIX=musicxml

# NEUTRINO 設定
ModelDir=MERROW
StyleShift=0

# NSF 設定
PitchShiftNsf=0

# WORLD 設定
PitchShiftWorld=0
FormantShift=1.0
SmoothPitch=0.0
SmoothFormant=0.0
EnhanceBreathiness=0.0

# 推論モードに応じたモデル選択
if [ ${InferenceMode} -eq 4 ]; then
    NsfModel=va
    SamplingFreq=48
elif [ ${InferenceMode} -eq 3 ]; then
    NsfModel=vs
    SamplingFreq=48
elif [ ${InferenceMode} -eq 2 ]; then
    NsfModel=ve
    SamplingFreq=24
fi

# ライブラリのパスを設定
export LD_LIBRARY_PATH=$PWD/bin:$PWD/NSF/bin:$LD_LIBRARY_PATH

echo "date +"%M:%S.%2N" : start MusicXMLtoLabel"
./bin/musicXMLtoLabel score/musicxml/${BASENAME}.${SUFFIX} score/label/full/${BASENAME}.lab score/label/mono/${BASENAME}.lab

echo "date +"%M:%S.%2N" : start NEUTRINO"
./bin/NEUTRINO score/label/full/${BASENAME}.lab score/label/timing/${BASENAME}.lab ./output/${BASENAME}.f0 ./output/${BASENAME}.melspec ./model/${ModelDir}/ -w ./output/${BASENAME}.mgc ./output/${BASENAME}.bap -n 1 -o ${NumThreads} -k ${StyleShift} -d ${InferenceMode} -g 0 -t

echo "date +"%M:%S.%2N" : start NSF"
./bin/NSF output/${BASENAME}.f0 output/${BASENAME}.melspec ./model/${ModelDir}/${NsfModel}.bin output/${BASENAME}.wav -l score/label/timing/${BASENAME}.lab -n 1 -p ${NumThreads} -s ${SamplingFreq} -f ${PitchShiftNsf} -g 0 -t

echo "date +"%M:%S.%2N" : start WORLD"
./bin/WORLD output/${BASENAME}.f0 output/${BASENAME}.mgc output/${BASENAME}.bap output/${BASENAME}_world.wav -f ${PitchShiftWorld} -m ${FormantShift} -p ${SmoothPitch} -c ${SmoothFormant} -b ${EnhanceBreathiness} -n ${NumThreads} -t

echo "date +"%M:%S.%2N" : END"
```

**ポイント解説:**
- `musicXMLtoLabel` によりMusicXMLからラベルデータを生成。
- `NEUTRINO` を用いて音響パラメータ（F0、メルスペクトログラムなど）を生成。
- `NSF` で音声波形を生成。
- `WORLD` でピッチ・フォルマントの調整。

## 音声の確認

最後に、Colab上で生成された音声を確認します。

```python
from IPython.display import Audio, display

print("NSFで生成された音声:")
display(Audio("/content/NEUTRINO/output/sample1.wav"))

print("WORLDで生成された音声:")
display(Audio("/content/NEUTRINO/output/sample1_world.wav"))
```

**ポイント解説:**
- `Audio` クラスを使い、ブラウザ上で直接音声を再生。
- NSFとWORLDの異なる音声合成結果を比較可能。

## まとめ

Google Colab上でNEUTRINOをセットアップし、音声合成までの手順を紹介しました。

**今回の流れをおさらい：**
1. **セットアップ**：Google Driveからファイルを取得し、環境を整備。
1. **変換パイプラインの実行**：MusicXMLをラベル化し、NEUTRINO・NSF・WORLDを用いて音声生成。
1. **音声の確認**：Colab上で生成された音声を試聴。

この手順を活用し、オリジナルの歌声合成プロジェクトを楽しんでください！

## 参考

- <a href="https://studio-neutrino.com/" target="_blank" rel="nofollow noopener">NEUTRINO公式サイト</a>
