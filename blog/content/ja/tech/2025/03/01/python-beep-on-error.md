---
title: "【Python】エラー発生時にベル音を鳴らす方法【クロスプラットフォーム対応】"
date: 2025-03-01T02:30:00+09:00
description: Pythonのエラー処理において、ユーザーに視覚だけでなく音でも通知したい場合があります。この記事では、エラー発生時にベル音を鳴らし、キー入力があればそのベル音を停止する方法を、WindowsとLinux（macOS含む）両方で動作する形で解説します。
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

# 【Python】エラー発生時にベル音を鳴らす方法【クロスプラットフォーム対応】

Pythonのエラー処理において、ユーザーに視覚だけでなく音でも通知したい場合があります。この記事では、エラー発生時にベル音を鳴らし、キー入力があればそのベル音を停止する方法を、WindowsとLinux（macOS含む）両方で動作する形で解説します。

## 実装のポイント

- **クロスプラットフォーム対応**  
  Windowsの場合は `msvcrt` を、Linux/macOSの場合は `select` モジュールを使用し、標準入力からのキー入力を非ブロッキングで監視します。

- **ベル音の出力**  
  `print("\a")` を使用してASCIIベル文字を出力。ターミナルやシステム設定によっては音が鳴らない場合があるため、環境の設定も確認しましょう。

- **シンプルな関数化**  
  ベル音を鳴らす処理を関数 `beep_until_key()` にまとめることで、再利用性の高いコードにしています。

## コード解説

以下は、エラー発生後に2秒ごとにベル音を鳴らし、キー入力で停止する処理を関数化したサンプルコードです。

```python
import os
import time
import sys

# プラットフォームに応じた入力監視モジュールのインポート
if os.name == 'nt':  # Windowsの場合
    import msvcrt
else:  # Linux, macOSの場合
    import select

def beep_until_key(interval=2):
    """
    キー入力があるまで、指定した間隔でベル音を鳴らし続ける関数。
    
    Args:
        interval (int, optional): ベル音を鳴らす間隔（秒）。デフォルトは2秒。
    """
    print(f"キー入力があるまでベル音を{interval}秒ごとに鳴らします。")
    while True:
        # ASCIIベル文字を出力（ターミナルが対応していれば音が鳴る）
        print("\a", end='', flush=True)
        time.sleep(interval)
        
        if os.name == 'nt':
            # Windows: msvcrtを利用して非ブロッキングにキー入力をチェック
            if msvcrt.kbhit():
                msvcrt.getch()  # 入力されたキーを読み捨て
                break
        else:
            # Linux/macOS: selectを利用してstdinの入力を非ブロッキングで監視
            dr, _, _ = select.select([sys.stdin], [], [], 0)
            if dr:
                sys.stdin.readline()  # 入力があれば読み捨て
                break

# エラー発生時の使用例
try:
    1 / 0  # 故意にエラーを発生させる例
except Exception as e:
    print("エラー:", e)
    beep_until_key(2)
```

### コードのポイント

- **クロスプラットフォームのキー入力監視**  
  - **Windows**: `msvcrt.kbhit()` でキー入力の有無を確認し、入力があれば `msvcrt.getch()` でそのキー入力を処理します。  
  - **Linux/macOS**: `select.select()` を使って `sys.stdin` の状態を監視し、入力があれば `sys.stdin.readline()` で受け取ります。

- **ベル音の出力**  
  `print("\a", end='', flush=True)` により、ターミナルがベル音に対応している場合は音が鳴ります。ベル音が鳴らない場合は、環境設定を見直してください。

## 参考

- <a href="https://docs.python.org/ja/3/library/msvcrt.html" target="_blank" rel="nofollow noopener">Python公式ドキュメント - msvcrtモジュール</a>
- <a href="https://docs.python.org/ja/3/library/select.html" target="_blank" rel="nofollow noopener">Python公式ドキュメント - selectモジュール</a>
- <a href="https://docs.python.org/ja/3/library/time.html" target="_blank" rel="nofollow noopener">Python公式ドキュメント - timeモジュール</a>
