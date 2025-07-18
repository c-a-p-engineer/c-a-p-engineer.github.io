---
title: "ffmpeg＋SoX×Python：ノイズキャンセリングパイプラインの作り方"
date: 2025-07-16T02:00:00+09:00
description: ffmpegとSoXをPythonから組み合わせて、ノイズプロファイル除去とダイナミックレンジ圧縮を行うノイズキャンセリングパイプラインの実装ガイド。
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

# はじめに

ノイズキャンセリングは、マイク特有のハムノイズや環境音を低減し、クリアな音声を得るための技術です。単体のツールだけでは対応が難しい場合もありますが、**ffmpeg** のFFTベースノイズ除去フィルタと、**SoX** の詳細なプロファイル除去・ダイナミックレンジ圧縮を組み合わせることで、より高品質な結果を得られます。

---

## 前提条件と環境構築

* **Python 3.7+**
* **ffmpeg**
* **SoX (Sound eXchange)**

Ubuntu/Debian 系でのインストール例:

```bash
sudo apt update
sudo apt install ffmpeg sox
```

Python側は標準ライブラリのみで動作可能です。

---

## パイプラインの全体像

- **ffmpeg フィルタ処理**

   * FFTベースのノイズ除去 (`afftdn`)
   * イコライザ補正
   * 無音区間の自動トリミング
   * ゲート処理

- **SoX プロファイル除去**

   * ノイズサンプル抽出 → プロファイル化
   * `noisered` でノイズ除去

- **SoX ダイナミックレンジ圧縮**

   * `compand` で音圧のムラを平準化

- **ファイル置き換え & クリーンアップ**

---

## ステップ詳細解説

### ffmpeg によるフィルタ処理

```python
ffmpeg_filters = [
    "afftdn",                                     # FFTベースのノイズ除去
    "equalizer=f=1500:t=q:w=1:g=3",               # 1.5kHz 帯域のゲイン調整
    "silenceremove=stop_periods=-1:stop_duration=1:stop_threshold=-50dB",  # 無音トリム
    "agate",                                      # ゲート処理
]
subprocess.run(
    ["ffmpeg", "-y", "-i", str(audio_path),
     "-af", ",".join(ffmpeg_filters),
     str(temp_ffmpeg_output)],
    check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)
```

#### equalizer フィルタの各パラメータ解説

* **f (frequency)**
  中心周波数を Hz 単位で指定。
  本例では `1500` → 1,500 Hz 帯域をターゲットにしています。

* **t (filter type)**
  フィルタの形状を指定。

  * `q`：クオリティファクタ（ピーク型イコライザ）
  * ほかに `g`（グラフィック）、`o`（オクターブ）などあり。

* **w (width)**
  帯域幅を Q ファクタで指定。
  `w=1` → Q＝1 の比較的幅広い帯域（約中心周波数の±50％）に適用。

* **g (gain)**
  ゲイン量を dB 単位で指定。
  `g=3` → +3 dB ブースト。マイナス値でカットも可能。

---

このように、`equalizer=f=1500:t=q:w=1:g=3` は「1.5 kHz 帯を Q=1 で広めに取りつつ +3 dB 持ち上げる」設定です。録音環境やマイク特性に合わせて、中心周波数（f）や帯域幅（w）・ゲイン（g）を調整してください。

### SoX によるノイズプロファイル作成と除去

```bash
sox <入力ファイル> -n trim 0 0.2 noiseprof noise.prof
sox <入力ファイル> <出力ファイル> noisered noise.prof 0.21
```

* **trim 0 0.2**

  * 入力ファイルの先頭 0 ～ 0.2 秒を切り出し、「この区間は音声ではなくノイズのみ」として扱います。
  * 0.2 秒という長さは「ノイズ成分を十分に集めるが、話し声が混ざらない程度」の目安です。環境によっては 0.1～0.5 秒に調整します。

* **noiseprof noise.prof**

  * 切り出したノイズサンプルからノイズ特性（スペクトルプロファイル）を解析し、`noise.prof` に保存します。

* **noisered noise.prof 0.21**

  * プロファイルに基づきノイズを低減します。
  * 最後の引数 `0.21` は「除去強度」を示し、0.0～1.0 の範囲で指定します。

    * **小さめ（例：0.1～0.3）** → ノイズ除去は穏やかだが、音声への影響も少ない
    * **大きめ（例：0.4～0.6）** → ノイズ除去は強力だが、音声にアーチファクト（ざらつき）が出やすい

---

### SoX によるダイナミックレンジ圧縮（compand）

```bash
sox <入力ファイル> <出力ファイル> compand 0.3,1 6:-70,-60,-20 -5 -90 0.2
```

* **0.3,1**

  * `attack` = 0.3 秒：音量が閾値を超えたときに圧縮を開始するまでの時間
  * `decay` = 1 秒：圧縮を解除して元に戻るまでの時間

* **6:-70,-60,-20**

  * 圧縮カーブの定義（スロープとポイントリスト）
  * `6:` → 圧縮比（ratio）が 6:1
  * `-70,-60,-20` → 入力レベル（dB）が −70dB のとき出力を −60dB に、−20dB のときは −20dB にマッピング
  * この組み合わせで「−70～−60dB 範囲内は強く圧縮し、−20dB 以上はほぼそのまま」のカーブが得られます。

* **-5**

  * 圧縮後の全体ゲイン調整（makeup gain）を + (−5)dB で行います。
  * マイナス値に見えますが、SoX では「出力を −5dB 下げる」という指定です。
    音量が大きくなりすぎないようヘッドルームを確保します。

* **-90**

  * ノイズフロア閾値（noise floor）を −90dB に設定。
  * これ以下のレベルはほぼ無音と見なし、圧縮の対象外またはゲート処理されます。

* **0.2**

  * ディレイ（lookahead）時間を 0.2 秒指定。
  * 先読みすることで圧縮の反応を滑らかにし、歪みを抑えます。

---

これらの値はあくまでも「音声を聞き取りやすくする」ための一例です。録音環境や素材の特徴に合わせて以下のように調整してください。

* **ノイズサンプル長（trim の長さ）**：話し声のない純ノイズ部分をしっかり拾える長さ
* **noisered 除去強度**：音声への影響を見ながら徐々に大きくしていく
* **compand の攻撃／解除時間**：会話の速さや音の立ち上がり・切れ方に合わせて
* **圧縮比・ポイントリスト**：音量ムラの度合いに応じてスロープを変更

これらを詰めていくことで、よりクリアで自然なノイズキャンセリング結果が得られます。
