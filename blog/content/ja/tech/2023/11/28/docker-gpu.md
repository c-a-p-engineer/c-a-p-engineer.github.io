---
title: "【Docker】コンテナ内でGPUを使用する"
date: 2023-11-28T18:30:00+09:00
description: "Docker 内で GPU を使用するための設定メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】コンテナ内でGPUを使用する

Docker 内で GPU を使用するための設定メモ

## NVIDIA Container Toolkitのインストール

公式のインストールガイドにしたがって NVIDIA Container Toolkit をインストールします。

* <a href="https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html" target="_blank" rel="nofollow noopener">Installing the NVIDIA Container Toolkit</a>

WSL上で以下のコマンドでインストールします。

```bash
$ curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \
    sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
    && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
        sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
        sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
$ sudo apt update
$ sudo apt install -y nvidia-container-toolkit
```

## 確認

以下の方法でインストールの確認を行います。

```bash
docker run --rm --gpus all nvidia/cuda:11.6.1-devel-ubuntu20.04 nvidia-smi
```

実行結果にホスト側のグラフィックボードが表示されたら確認完了です。

僕の `NVIDIA GeForce GTX 1650` という貧弱なグラフィックボードが見えます…

```bash
==========
== CUDA ==
==========

CUDA Version 11.6.1

Container image Copyright (c) 2016-2023, NVIDIA CORPORATION & AFFILIATES. All rights reserved.

This container image and its contents are governed by the NVIDIA Deep Learning Container License.
By pulling and using the container, you accept the terms and conditions of this license:
https://developer.nvidia.com/ngc/nvidia-deep-learning-container-license

A copy of this license is made available in this container at /NGC-DL-CONTAINER-LICENSE for your convenience.

*************************
** DEPRECATION NOTICE! **
*************************
THIS IMAGE IS DEPRECATED and is scheduled for DELETION.
    https://gitlab.com/nvidia/container-images/cuda/blob/master/doc/support-policy.md

Tue Nov 28 07:17:15 2023       
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 545.29.01              Driver Version: 546.01       CUDA Version: 12.3     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  NVIDIA GeForce GTX 1650 ...    On  | 00000000:02:00.0 Off |                  N/A |
| N/A   63C    P8               5W /  35W |    657MiB /  4096MiB |     13%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+

+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
|        ID   ID                                                             Usage      |
|=======================================================================================|
|  No running processes found                                                           |
+---------------------------------------------------------------------------------------+
```

## 参考
* <a href="https://zenn.dev/holliy/articles/e1ac7f2f806c35" target="_blank" rel="nofollow noopener">WSL2上にNVIDIA Container ToolkitをインストールしてDockerコンテナ内でCUDAを使用できるようにする</a>
