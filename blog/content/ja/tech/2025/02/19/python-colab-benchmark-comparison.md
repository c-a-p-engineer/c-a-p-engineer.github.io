---
title: "【Google Colab】 上システム・ベンチマークを比較してみた"
date: 2025-02-19T02:30:00+09:00
description: "Google Colab を活用して、Python を使ったシステム情報の取得や CPU / GPU のベンチマークを行いました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Google Colab
- Python
categories: 
- Google Colab
- Python
image: images/thumbnail/python-logo-master-v3-TM.png
image_description: 'Pythonロゴは、Python SoftwareFoundationの商標です。'
---

# 【Google Colab】 上システム・ベンチマークを比較してみた

Google Colab を活用して、Python を使ったシステム情報の取得や CPU / GPU のベンチマークを行いました。今回は「ローカルランタイム」、「CPU 専用環境」、「GPU 専用環境」、「TPU 環境」といった各環境の詳細情報と実行時間を比較し、その結果をまとめています。

## Python コード例

以下のコードは、システム情報（OS、CPU、メモリ、GPU）を取得し、CPU と GPU の行列積ベンチマークを実施するものです。

```python
import platform
import psutil
import tensorflow as tf
import numpy as np
import time
import subprocess

def get_size(bytes, suffix="B"):
    """バイト数を適切な単位に変換する関数"""
    factor = 1024
    for unit in ["", "K", "M", "G", "T", "P"]:
        if bytes < factor:
            return f"{bytes:.2f}{unit}{suffix}"
        bytes /= factor

# --- OS 情報 ---
print("========== OS 情報 ==========")
uname = platform.uname()
print(f"System     : {uname.system}")
print(f"Node Name  : {uname.node}")
print(f"Release    : {uname.release}")
print(f"Version    : {uname.version}")
print(f"Machine    : {uname.machine}")
print(f"Processor  : {uname.processor}\n")

# --- CPU 情報 ---
print("========== CPU 情報 ==========")
print(f"Physical cores : {psutil.cpu_count(logical=False)}")
print(f"Total cores    : {psutil.cpu_count(logical=True)}")
cpufreq = psutil.cpu_freq()
print(f"Current Frequency: {cpufreq.current:.2f} Mhz")
print("CPU Usage Per Core:")
for i, percentage in enumerate(psutil.cpu_percent(percpu=True, interval=1)):
    print(f"  Core {i}: {percentage}%")
print(f"Total CPU Usage: {psutil.cpu_percent()}%\n")

# --- Memory 情報 ---
print("========== Memory 情報 ==========")
svmem = psutil.virtual_memory()
print(f"Total     : {get_size(svmem.total)}")
print(f"Available : {get_size(svmem.available)}")
print(f"Used      : {get_size(svmem.used)}")
print(f"Percentage: {svmem.percent}%\n")

# --- GPU 情報 (nvidia-smi を使用) ---
print("========== GPU 情報 ==========")
try:
    gpu_output = subprocess.check_output(
        ["nvidia-smi", "--query-gpu=name,driver_version,memory.total,memory.used,memory.free,temperature.gpu,utilization.gpu",
         "--format=csv,noheader"],
        universal_newlines=True
    )
    print(gpu_output)
except Exception as e:
    print("GPU 情報の取得に失敗しました:", e)

# --- CPU ベンチマーク (NumPy 行列積) ---
def benchmark_cpu():
    print("----- CPU ベンチマーク (NumPy 行列積) -----")
    A = np.random.rand(1000, 1000)
    B = np.random.rand(1000, 1000)
    start = time.time()
    _ = np.dot(A, B)
    end = time.time()
    print(f"実行時間: {end - start:.4f} seconds\n")

# --- GPU ベンチマーク (TensorFlow 行列積) ---
def benchmark_gpu():
    print("----- GPU ベンチマーク (TensorFlow 行列積) -----")
    gpus_tf = tf.config.list_physical_devices('GPU')
    if not gpus_tf:
        print("GPU が検出されませんでした。")
        return
    # ランダムな行列の作成
    A = tf.random.normal([1000, 1000])
    B = tf.random.normal([1000, 1000])
    # ウォームアップ
    _ = tf.matmul(A, B)
    start = time.time()
    C = tf.matmul(A, B)
    _ = C.numpy()  # 計算完了を待つ
    end = time.time()
    print(f"実行時間: {end - start:.4f} seconds\n")

benchmark_cpu()
benchmark_gpu()
```

## 結果

上記のコードのCPUでの実行結果は以下のようになります。

```md
========== OS 情報 ==========
System     : Linux
Node Name  : 07de74ea16c1
Release    : 6.1.85+
Version    : #1 SMP PREEMPT_DYNAMIC Thu Jun 27 21:05:47 UTC 2024
Machine    : x86_64
Processor  : x86_64

========== CPU 情報 ==========
Physical cores : 1
Total cores    : 2
Max Frequency  : 0.00 Mhz
Min Frequency  : 0.00 Mhz
Current Frequency: 2200.21 Mhz
CPU Usage Per Core:
  Core 0: 30.3%
  Core 1: 16.0%
Total CPU Usage: 19.9%

========== Memory 情報 ==========
Total     : 12.67GB
Available : 10.93GB
Used      : 1.44GB
Percentage: 13.8%

========== GPU 情報 ==========
GPU 情報の取得に失敗しました: [Errno 2] No such file or directory: 'nvidia-smi'

----- CPU ベンチマーク (NumPy 行列積) -----
実行時間: 0.1201 seconds

----- GPU ベンチマーク (TensorFlow 行列積) -----
GPU が検出されませんでした。
```

## 各環境の比較結果

以下の表は、ローカルランタイム、CPU 専用、GPU 専用、TPU 環境のシステム情報とベンチマーク結果の比較です。

~~自分のマシンが思った以上に貧弱でショックです…~~

| 項目               | ローカルランタイム、CPU                                                                                                     | CPU 専用環境                                                                                       | GPU 専用環境                                                                                       | TPU 環境                                                                                          |
|--------------------|-----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| **OS 情報**        | Linux<br>WSL2: 5.15.167.4-microsoft-standard-WSL2<br>#1 SMP Tue Nov 5 00:21:55 UTC 2024                                  | Linux<br>6.1.85+<br>#1 SMP PREEMPT_DYNAMIC Thu Jun 27 21:05:47 UTC 2024                             | Linux<br>6.1.85+<br>#1 SMP PREEMPT_DYNAMIC Thu Jun 27 21:05:47 UTC 2024                              | Linux<br>6.1.85+<br>#1 SMP PREEMPT_DYNAMIC Thu Jun 27 21:05:47 UTC 2024                             |
| **CPU 情報**       | 6 physical / 12 logical<br>Current Frequency: 1608.00 Mhz<br>Total Usage: 4.7%                                         | 1 physical / 2 logical<br>Current Frequency: 2200.21 Mhz<br>Total Usage: 19.9%                      | 1 physical / 2 logical<br>Current Frequency: 2000.11 Mhz<br>Total Usage: 81.9%                       | 48 physical / 96 logical<br>Current Frequency: 2000.21 Mhz<br>Total Usage: 1.6%                     |
| **Memory 情報**    | 15.62GB total<br>12.02GB available<br>3.14GB used (23.1%)                                                              | 12.67GB total<br>10.93GB available<br>1.44GB used (13.8%)                                          | 12.67GB total<br>11.32GB available<br>1.05GB used (10.7%)                                          | 334.56GB total<br>329.65GB available<br>2.73GB used (1.5%)                                          |
| **GPU 情報**       | NVIDIA GeForce GTX 1650 with Max‑Q Design<br>Driver: 551.86<br>4096 MiB total, 577 MiB used, 3362 MiB free<br>Temp: 58°C, 23% utilization | GPU 情報取得失敗（nvidia-smi が存在しない）                                                      | Tesla T4<br>Driver: 550.54.15<br>15360 MiB total, 0 MiB used, 15095 MiB free<br>Temp: 48°C, 0% utilization | GPU 情報取得失敗（nvidia-smi が存在しない）                                                      |
| **CPU ベンチマーク** | 0.1532 seconds                                                                                                        | 0.1201 seconds                                                                                    | 0.1401 seconds                                                                                     | 0.0067 seconds                                                                                    |
| **GPU ベンチマーク** | 0.0740 seconds                                                                                                        | GPU 非検出                                                                                       | 0.0203 seconds                                                                                     | GPU 非検出                                                                                       |

## まとめ

今回の実験では、Google Colab 上で各種環境のシステム情報やベンチマーク結果を Python を使って取得しました。  
- **ローカルランタイム** では GPU 情報が正しく取得され、CPU・GPU 両方のベンチマーク結果が得られました。  
- **CPU 専用環境** では GPU 情報が取得できず、GPU ベンチマークは実施されませんでした。  
- **GPU 専用環境** では Tesla T4 により高速な GPU ベンチマーク結果が得られました。  
- **TPU 環境** は CPU ベンチマークのみとなり、GPU 情報の取得はできませんでした。

各環境ごとに使用状況や性能が大きく異なるため、用途に合わせた環境選択が重要です。
