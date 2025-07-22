---
title: "【Docker】🎧WindowsでDockerから音を出す方法｜PulseAudio TCP接続"
date: 2025-07-22T18:30:00+09:00
description: Windows環境でDockerコンテナ内から音を再生したいこと、ありますよね？
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---


# 【Docker】🎧WindowsでDockerから音を出す方法｜PulseAudio TCP接続

Windows環境でDockerコンテナ内から音を再生したいこと、ありますよね？  
しかし、Dockerは音声出力機能を直接サポートしておらず、コンテナ内でGUIアプリや音声処理をしても音が出ません。

**PulseAudioをWindowsにインストールし、Dockerと接続して音を再生する方法**を、**`mp3`音源にも対応した最小構成**で解説します。  
また、ホストIPの代わりに `host.docker.internal` を使うことで、より柔軟な構成にする方法も紹介します。

---

## 🧱 全体構成（イメージ）

```

+------------------------------+
\|   Windows ホスト            |
\|  - PulseAudio サーバー      |
\|  - TCPポート 4713           |
+------------------------------+
↑
TCP接続（音声出力）
↓
+------------------------------+
\| Dockerコンテナ（Linux）     |
\|  - ffplay で mp3 を再生      |
+------------------------------+

```

---

## PulseAudio for Windowsのセットアップ

### ✅ PulseAudioをダウンロード

1. 以下のページから Windows 用 PulseAudio を取得  
   🔗 [https://www.freedesktop.org/wiki/Software/PulseAudio/Ports/Windows/](https://www.freedesktop.org/wiki/Software/PulseAudio/Ports/Windows/)

2. ダウンロードした ZIP を展開し、任意のフォルダ（例：`C:\pulseaudio`）に配置します。

---

### ✅ TCPモードでPulseAudioを起動

コマンドプロンプトまたは PowerShell で以下を実行：

```powershell
cd C:\pulseaudio
.\pulseaudio.exe -D --exit-idle-time=-1 --load="module-native-protocol-tcp auth-anonymous=1 port=4713"
```

📌 オプション解説：

* `-D`：デーモン起動
* `--exit-idle-time=-1`：常に起動状態を維持
* `module-native-protocol-tcp`：TCP接続を許可（`auth-anonymous=1` はローカル用途に限定）

---

## Dockerイメージを作成

### 📄 Dockerfile を作成（カレントディレクトリに）

```dockerfile
FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y ffmpeg pulseaudio-utils wget && \
    apt-get clean

# テスト用音楽ファイル（みゅうー Menuet mp3）
RUN wget https://www.ne.jp/asahi/music/myuu/wave/menuettm.mp3 -O /test.mp3

CMD ["ffplay", "-nodisp", "-autoexit", "/test.mp3"]
```

📌 使用する音声ファイル：

* [https://www.ne.jp/asahi/music/myuu/wave/menuettm.mp3](https://www.ne.jp/asahi/music/myuu/wave/menuettm.mp3)
  （みゅうー 音楽素材サイトより）

---

### 📦 Dockerイメージをビルド

```bash
docker build -t ubuntu-pulseaudio-sample .
```

---

## 3️⃣ Dockerコンテナを実行して音を再生！

### ✅ `host.docker.internal` を使って実行

```bash
docker run --rm \
  -e PULSE_SERVER=tcp:host.docker.internal \
  ubuntu-pulseaudio-sample
```

📌 `host.docker.internal` は、**ホストOSをDockerから参照する特殊なホスト名**で、Windows・macOS の Docker Desktop で使用可能です。

---

## ✅ 成功すれば…

スピーカーから「Menuett」の優雅なピアノ曲が流れます 🎵
Dockerコンテナ内からホストのPulseAudioを経由して**mp3音声再生**に成功した証です。

---

## 🔐 注意点・補足

| 内容                   | 詳細                                              |
| -------------------- | ----------------------------------------------- |
| セキュリティ               | `auth-anonymous=1` は誰でも接続可能なので**ローカル限定にしてください** |
| 自動起動化                | PulseAudio の起動をバッチファイルにしてスタートアップ登録すると便利         |
| host.docker.internal | Windows/macOS の Docker Desktop では使用可能。Linuxでは無効 |
| 音が出ないとき              | ファイアウォールで TCP 4713 ポートがブロックされていないか確認            |
| ffplay の音量           | `-volume` オプションで音量調整も可能（0〜1000）                 |

---

## 🎯 まとめ

* Dockerコンテナから音を出すには、PulseAudioをホストにインストールし、**TCP経由で接続**する。
* `ffplay` を使えば、`mp3` や `wav` など様々なフォーマットに対応可能。
* `host.docker.internal` を使えば、IPアドレス指定不要で接続できて便利。

---

## ▶ 次のステップ

* 🎵 Python（`pydub`, `pygame`, `pyaudio`）などと組み合わせて音声アプリを作る
* 📦 GUIアプリ（VLC, Audacityなど）をDockerで動かして音声出力
* 🔄 WSL2 との連携構成（PulseAudio共通利用）を構築

---

## 🔗 参考リンク

* [PulseAudio for Windows](https://www.freedesktop.org/wiki/Software/PulseAudio/Ports/Windows/)
* [host.docker.internal - Docker Networking](https://docs.docker.com/network/host/)
* [みゅうー - フリー音楽素材](https://www.ne.jp/asahi/music/myuu/)
* [FFmpeg公式サイト](https://ffmpeg.org/)
