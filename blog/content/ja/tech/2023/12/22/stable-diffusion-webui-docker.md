---
title: Stable Diffusion WebUI を Dockerで使用する
date: 2023-12-22T18:30:00+09:00
description: Stable Diffusion WebUI を Dockerで使用する方法メモ
draft: false
enableToc: true
enableTocContent: true
tags: 
- AI
- 画像
categories: 
- AI
image: images/thumbnail/ai_robot.jpg
---

# Stable Diffusion WebUI を Dockerで使用する

簡単にローカル環境で Stable Diffusion WebUI を使用するメモ。

`Docker` が必要になります。

## GitHub から対象をダウンロード

GitHub から対象を取得します。
Gitが入ってないのなら GitHub に飛んで対象のソースをダウンロードしてください。

- <a href="https://github.com/AbdBarho/stable-diffusion-webui-docker" target="_blank" rel="nofollow noopener">stable-diffusion-webui-docker</a>

```bash
git clone https://github.com/AbdBarho/stable-diffusion-webui-docker.git
```

## 構築

構築手順のとおりにやっていきます。
- <a href="https://github.com/AbdBarho/stable-diffusion-webui-docker/wiki/Setup" target="_blank" rel="nofollow noopener">Wiki Setup</a>

### 初回起動

まずはDockerをビルドします。

```bash
docker compose --profile download up --build
```

結構時間がかかるので待ちましょう。

以下のように `exited with code 0` が出たら問題なくビルド完了になります。
```bash
webui-docker-download-1 exited with code 0
```

### 起動

WebUI を起動します。

```
docker compose --profile auto up --build
```

他にも以下のオプションがあります。

```
docker compose --profile [ui] up --build
```

- `invoke`: 初期のフォークの 1 つ、 InvokeAI による素晴らしい UI <a href="https://github.com/invoke-ai/InvokeAI" target="_blank" rel="nofollow noopener">InvokeAI</a>
- `auto`: 最も人気のあるフォーク、すっきりした UI を備えた多くの機能、 AUTOMATIC1111 によるリポジトリ <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui" target="_blank" rel="nofollow noopener">AUTOMATIC1111</a>
- `auto-cpu`: GPU を持たないユーザー向け。
- `comfy`: グラフベースのワークフロー UI <a href="https://github.com/comfyanonymous/ComfyUI" target="_blank" rel="nofollow noopener">comfyanonymous</a>

これも初回はモデルのダウンロードなどで時間がかかります。

起動が完了したら <a href="http://localhost:7860/" target="_blank" rel="nofollow noopener">http://localhost:7860/</a> にアクセスするとWebUI画面が出てきます。

### 停止

停止する場合は起動したターミナル上で `Ctr+C` で停止します。

## NansException: A tensor with all NaNs was produced in Unet. エラーの対処

僕の環境では以下のようなエラーが発生しました。

```
modules.devices.NansException: A tensor with all NaNs was produced in Unet. This could be either because there's not enough precision to represent the picture, or because your video card does not support half type. Try setting the "Upcast cross attention layer to float32" option in Settings > Stable Diffusion or using the --no-half commandline argument to fix this. Use --disable-nan-check commandline argument to disable this check.
```

調べたところ
- 画像を表現するのに十分な精度がない
- ビデオカードがhalf型をサポートしていない

このエラーを修正するためには以下の設定を行う必要があります。

`Settings` > `StableDiffsion` >「`Upcast cross attention layer to float32`」にチェック > `ApplySettings` で設定。

これでエラーが解消されて生成されるかと思います。

## まとめ

これでローカル環境で簡単に使用ができます。
~~GPUが貧弱過ぎて辛い…(´；ω；｀)~~

個人的にはローカルPCが汚れにくい、Docker版を推します。
PythonのバージョンアップなどもDocker側で対応してくれるので良いと思っています。
