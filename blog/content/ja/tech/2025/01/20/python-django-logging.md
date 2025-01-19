---
title: "【Python】Django のロギング設定メモ"
date: 2025-01-20T01:30:00+09:00
description: Django でロギングを設定する方法について詳しく解説します。ロギングを適切に設定することで、アプリケーションのエラーハンドリングやデバッグが容易になります。
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

# Django のロギング設定メモ

Django でロギングを設定する方法について詳しく解説します。ロギングを適切に設定することで、アプリケーションのエラーハンドリングやデバッグが容易になります。

## ロギングの概要

Django には組み込みのロギング機能があり、設定ファイル（`settings.py`）で詳細な設定を行うことができます。ロギングを設定することで、アプリケーションの挙動を監視し、問題発生時に迅速に対応できるようになります。

## ロギング設定のサンプルコード

以下は、Django プロジェクトにおけるロギング設定の例です。

```python
import os
from logging.handlers import TimedRotatingFileHandler

# プロジェクトのベースディレクトリ
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ログを保存するディレクトリ
LOG_DIR = os.path.join(BASE_DIR, "logs")

# ログディレクトリが存在しない場合は作成
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

LOGGING = {
    "version": 1,  # ロギングの設定バージョン（1固定）
    "disable_existing_loggers": False,  # 既存のロガーを無効化しない
    "handlers": {
        "file": {
            "level": "DEBUG",  # DEBUG レベル以上のログを記録
            "class": "logging.handlers.TimedRotatingFileHandler",  # 時間でログをローテーション
            "filename": os.path.join(LOG_DIR, "django.log"),
            "when": "midnight",  # 毎日ログをローテーション
            "interval": 1,        # 1日ごとにローテーション
            "backupCount": 7,     # 7日分のログを保持
            "formatter": "verbose",
            "encoding": "utf-8",  # 文字化け防止
        },
        "console": {
            "level": "DEBUG",  # DEBUG レベル以上のログをコンソール出力
            "class": "logging.StreamHandler",  # コンソール用のハンドラ
            "formatter": "verbose",
        },
    },
    "formatters": {
        "verbose": {
            "format": "\t".join(
                [
                    "[%(levelname)s]",  # ログレベル（INFO, DEBUG など）
                    "asctime:%(asctime)s",  # ログの出力日時
                    "module:%(module)s",  # モジュール名
                    "message:%(message)s",  # ログメッセージ
                ]
            )
        },
    },
    "root": {
        "handlers": ["file", "console"],  # ルートロガーの出力先
        "level": "INFO",  # ルートロガーのログレベル（INFO以上）
    },
    "loggers": {
        "django": {
            "handlers": ["file", "console"],  # Django 内部のロギングを記録
            "level": "INFO",  # INFO レベル以上のログを記録
            "propagate": True,  # 上位のロガーにもログを伝播
        },
        "django.utils.autoreload": {
            "handlers": ["file", "console"],  # Django の自動リロード時のログ設定
            "level": "CRITICAL",  # CRITICAL レベル以上のみ記録
            "propagate": False,  # 上位のロガーには伝播しない
        },
    },
}
```

## 設定のポイント

### ログディレクトリの作成

ログを保存するディレクトリ `logs/` が存在しない場合、自動的に作成する処理を追加しています。

```python
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)
```

これにより、アプリケーションを実行した際にエラーが発生することを防ぎます。

### TimedRotatingFileHandler の利用

- `TimedRotatingFileHandler` を使用することで、毎日 0 時にログをローテーション（新しいファイルに切り替え）します。
- `backupCount: 7` を指定することで、過去 7 日分のログを保持し、それ以前のログは削除されます。

### ログのフォーマット

ログのフォーマットを `verbose` という名前で設定し、以下のような情報を記録するようにしています。

```python
"format": "\t".join(
    [
        "[%(levelname)s]",
        "asctime:%(asctime)s",
        "module:%(module)s",
        "message:%(message)s",
    ]
)
```

これにより、ログが見やすく整理され、デバッグしやすくなります。

### root ロガーの設定

- すべてのログを `file` と `console` に出力します。
- `level: INFO` に設定し、`INFO` 以上のレベルのログを記録します。

### django.utils.autoreload の CRITICAL 設定

Django の自動リロードに関するログは `CRITICAL` レベルのみ記録し、不要な情報を減らしています。

## ログレベルの説明

| レベル | 説明 |
|--------|--------------------------------------------------|
| DEBUG | デバッグ用の詳細な情報 |
| INFO | 一般的な操作ログ |
| WARNING | 潜在的な問題が発生した場合の警告 |
| ERROR | エラー発生時のログ |
| CRITICAL | 致命的なエラー |

## ログの出力例

設定したログフォーマットにより、以下のようなログが記録されます。

```
[INFO]    asctime:2024-01-20 12:34:56,789    module:views    message:ユーザーがログインしました。
[ERROR]    asctime:2024-01-20 12:35:10,123    module:views    message:ログイン処理でエラーが発生しました。
```

## まとめ

Django のロギング設定を適切に行うことで、アプリケーションのエラーや動作状況を記録し、トラブルシューティングが容易になります。
ぜひ、Django プロジェクトでのロギング設定に活用してください！

## 参考

- <a href="https://docs.djangoproject.com/en/stable/topics/logging/" target="_blank" rel="nofollow noopener">Django Logging Configuration</a>
- <a href="https://docs.python.org/3/library/logging.html" target="_blank" rel="nofollow noopener">Python logging モジュール</a>
