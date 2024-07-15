---
title: PythonでGPUとCPUの処理を分ける方法
date: 2024-04-09T01:00:00+09:00
description: PythonでGPUとCPUの処理を分ける方法メモ。
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

# PythonでGPUとCPUの処理を効率的に分ける方法

PPythonでGPUとCPUの処理を分ける方法メモ。プログラム内で条件分岐を使用し、GPUが利用可能な場合とそうでない場合に、それぞれ異なる処理を行う方法をTensorFlowとPyTorchを用いて説明します。

## TensorFlowでの処理の分け方

TensorFlowを使用している場合、GPUの有無を判断するコードは以下のようになります。

```python
import tensorflow as tf

if tf.test.gpu_device_name():
    print("GPUを使用しています:", tf.test.gpu_device_name())
    # GPUを使用する処理をここに書く
else:
    print("GPUは利用できません。CPUを使用します。")
    # CPUを使用する処理をここに書く
```

このコードはまず、`tf.test.gpu_device_name()`関数を呼び出し、GPUデバイスの名前を取得します。戻り値が空でなければ、GPUが利用可能であると判断し、GPUを使用する処理を実行します。そうでない場合は、CPUを使用する処理を実行します。

## PyTorchでの処理の分け方

PyTorchを使用している場合、GPUの有無を判断するコードは以下のようになります。

```python
import torch

if torch.cuda.is_available():
    print("GPUを使用しています:", torch.cuda.get_device_name(0))
    # GPUを使用する処理をここに書く
else:
    print("GPUは利用できません。CPUを使用します。")
    # CPUを使用する処理をここに書く
```

`torch.cuda.is_available()`関数を使ってGPUの利用可能性をチェックし、`True`が返されればGPUが利用可能であるとして、GPUを使用する処理を実行します。利用できない場合は、CPUを使用する処理を実行します。

## まとめ

PythonではAIの使用などでGPUを使うことがあります、GPUが使えない場合の対処が必要な場合の処理をこれでかき分けることが可能になります。
