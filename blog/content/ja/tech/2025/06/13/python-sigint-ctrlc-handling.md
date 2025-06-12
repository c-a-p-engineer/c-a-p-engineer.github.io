---
title: "【Python】プログラムをCtrl+Cで安全に停止させる3つの方法【SIGINT対応】"
date: 2025-06-13T02:00:00+09:00
description: Pythonスクリプトを実行中にCtrl+Cで安全に停止させたい場合、シグナル（SIGINT）の正しい扱いが重要です。
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

# 【Python】プログラムをCtrl+Cで安全に停止させる3つの方法【SIGINT対応】

Pythonスクリプトを実行中に`Ctrl+C`で安全に停止させたい場合、**シグナル（SIGINT）**の正しい扱いが重要です。

## try/except KeyboardInterruptで簡潔に捕捉する

### 🔍 概要

`Ctrl+C`はPythonにおいて`KeyboardInterrupt`例外として送出されます。`try/except`でこの例外を捕捉し、終了処理を実装できます。

```python
#!/usr/bin/env python3
import time

def main():
    try:
        print("処理を開始します。Ctrl+Cで中断可能。")
        while True:
            print("…動作中…")
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nKeyboardInterruptを受け取りました。終了処理を実行します。")
        # 例：一時ファイル削除やDB切断など
    finally:
        print("プログラムを終了します。")

if __name__ == "__main__":
    main()
```

### ✅ ポイント

* シンプルで小規模スクリプトに最適
* SIGINT（Ctrl+C）のみ対象、他のシグナルには非対応

---

## signal.signalでSIGINTに専用ハンドラを登録

### 🔍 概要

Pythonの`signal`モジュールで**SIGINTにカスタムハンドラを割り当て**、独自のシャットダウン処理を実行できます。

```python
#!/usr/bin/env python3
import signal
import sys
import time

def sigint_handler(signum, frame):
    print("\nSIGINTを受信しました。グレースフルシャットダウンを開始します。")
    # 例：ログフラッシュ、ネットワーク切断など
    sys.exit(0)

signal.signal(signal.SIGINT, sigint_handler)

print("処理を開始します。Ctrl+Cで停止します。")
while True:
    print("…動作中…")
    time.sleep(1)
```

### ✅ ポイント

* 複数のシグナル（SIGTERM等）にも拡張可能
* Webサーバーやデーモンなど中〜大規模向き

---

## 現在の処理を完了後、次ループで停止する

### 🔍 概要

`Ctrl+C`を受け取っても**現在の処理を完了させ、次ループに入る前に停止**します。
**バッチ処理や重たい処理を中断せず安全に終わらせたいケース**に適します。

```python
#!/usr/bin/env python3
import signal
import sys
import time

stop_next = False

def sigint_handler(signum, frame):
    global stop_next
    print("\nCtrl+C受信：現在の処理を完了後、次のループは実行しません。")
    stop_next = True

signal.signal(signal.SIGINT, sigint_handler)

print("Ctrl+Cで次回ループ開始時に停止します")
while True:
    print("…動作中…（現在の処理を継続）")
    time.sleep(2)  # 長時間処理の例
    if stop_next:
        print("停止フラグ検知：ループを抜けて終了します。")
        sys.exit(0)
```

### ✅ ポイント

* 時間のかかる処理を**強制終了せず**に安全に終えたいときに有効
* 実行タイミングを明示的に制御できる

---

## 使い分けの指針

| ケース          | 推奨方法                                |
| ------------ | ----------------------------------- |
| 小規模スクリプト     | `try/except KeyboardInterrupt` |
| コンテナやデーモン    | `signal.signal`でSIGINT対応       |
| タスクの整合性を保ちたい | ループ終了制御型                       |

---

## 応用テクニック・拡張例

* ✅ **ログ連携**：`logging`モジュールを使って、終了原因や実行履歴を記録
* ✅ **複数シグナル対応**：`SIGTERM`／`SIGHUP`なども`signal.signal()`で捕捉
* ✅ **非同期処理対応**：`asyncio.get_event_loop().add_signal_handler()`を活用
* ✅ **マルチスレッド処理**：`threading.Event()`と連携し安全にスレッド停止
* ✅ **ユニットテスト**：`pytest`＋`os.kill()`等で終了処理の動作確認

---

## 参考リンク

* <a href="https://docs.python.org/ja/3/library/exceptions.html#KeyboardInterrupt" target="_blank" rel="nofollow noopener">Python公式ドキュメント - KeyboardInterrupt</a>
* <a href="https://docs.python.org/ja/3/library/signal.html" target="_blank" rel="nofollow noopener">Python公式ドキュメント - signalモジュール</a>

---

## まとめ

Pythonで`Ctrl+C`による停止を安全に扱うには、**プログラムの規模・性質に応じた設計**が求められます。

それぞれの手法のメリット・制約を理解し、自身のユースケースに最適な方式を選びましょう。
