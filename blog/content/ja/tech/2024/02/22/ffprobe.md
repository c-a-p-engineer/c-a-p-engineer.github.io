---
title: 【FFmpeg】FFprobeを使って動画ファイルの詳細情報を把握する
date: 2024-02-22T19:00:00+09:00
description: FFprobeは、動画や音声ファイルの詳細情報を取得するための強力なツールです。
draft: false
enableToc: true
enableTocContent: true
tags: 
- 動画
categories: 
- 動画
image: images/thumbnail/video_editor.webp
---

# FFmpeg】FFprobeを使って動画ファイルの詳細情報を把握する

FFprobeは、動画や音声ファイルの詳細情報を取得するための強力なツールです。

## 基本的な使用方法

FFprobeの基本的な使用方法は、ファイルからメタデータやストリーム情報を取得することです。以下は、いくつかの基本的なコマンド例です：

- ビデオストリームの時間を表示するコマンド:
  ```
  ffprobe -v error -i input -select_streams v:0 -show_entries stream=duration -of default=noprint_wrappers=1:nokey=1
  ```
- フォーマット（コンテナ）の全体時間を表示するコマンド（読みやすい形式で）:
  ```
  ffprobe -v error -i input -show_entries format=duration -of default=noprint_wrappers=1:nokey=1
  ```

これらのコマンドは、特定のストリームやフォーマットの基本情報を取得する際に役立ちます。

## 詳細情報の取得

FFprobeでは、`-show_entries`オプションを使用して、取得したい情報を細かく指定ができます。
たとえば、特定のビデオフレームの情報や、特定のフォーマット情報のみを取得することが可能です。以下は、ビットレート情報のみを取得する例です：

```
ffprobe -i "ビデオ名" -hide_banner -show_entries format=bit_rate
```
このコマンドは、ファイルのビットレート情報を取得します。

## 実践的な使用例

FFprobeを利用して、動画ファイルから具体的な情報を抽出する際には、以下のようなコマンドが有用です：

- パケット情報を表示する:
```
ffprobe -i "ビデオ名" -hide_banner -show_packets
```
これにより、各パケットのコーデックタイプ、ストリームインデックス、プレゼンテーションタイムスタンプ（PTS）、デコードタイムスタンプ（DTS）などの情報が表示されます。

- 特定のエントリーを表示する:
```
ffprobe -i "ビデオ名" -hide_banner -show_entries frame=pict_type
```
特定のフレーム情報、たとえばフレームのタイプ（Iフレーム、Pフレーム、Bフレーム）を取得する際に有効です。

## スクリプトやアプリケーションへの組み込み方法

FFprobeの出力をスクリプトやアプリケーションで利用するためには、出力フォーマットをJSONやXMLといった解析しやすい形式に指定することが推奨されます。
たとえば、以下のコマンドはJSON形式で出力を生成します。

```
ffprobe -v quiet -print_format json -show_format -show_streams "ビデオ名"
```

この出力は、プログラムで容易に解析し、必要な情報を抽出することが可能になります。

FFprobeは、動画や音声ファイルの分析に非常に強力なツールです。基本的な使用方法から始めて、必要に応じてオプションを追加することで、さまざまな情報を得ることができます。それぞれのプロジェクトや目的に合わせて、FFprobeの機能を最大限に活用しましょう。

