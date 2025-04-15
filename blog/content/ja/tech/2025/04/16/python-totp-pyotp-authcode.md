---
title: "【Python】2段階認証コード（TOTP）を自作する方法【pyotpライブラリ活用】"
date: 2025-04-16T01:30:00+09:00
description: Pythonライブラリ`pyotp`を使って、スマホを使わずに自分でTOTP認証コードを生成する方法をご紹介します。
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

# 【Python】2段階認証コード（TOTP）を自作する方法【pyotpライブラリ活用】

「2段階認証って便利だけど、いちいちスマホを取り出すのが面倒くさい…」  
そんな風に感じたことはありませんか？

**Pythonライブラリ`pyotp`を使って、スマホを使わずに自分でTOTP認証コードを生成する方法**をご紹介します。

---

## 🔐 そもそもTOTPって何？

TOTP（Time-based One-Time Password）は、**一定時間ごとに変わるワンタイムパスワード**のこと。  
多くのサービスで使われている2段階認証の仕組みで、Google Authenticatorなどもこの方式です。

仕組みは以下の通りです：

- ユーザーに発行された「**シークレットキー**」と
- 現在時刻を使って
- 6桁の認証コードを生成

これをサーバーとクライアント（例：認証アプリや自作ツール）が同時に行うことで、時刻同期されたコードをチェックできます。

---

## 📦 ライブラリのインストール

まずはTOTPを簡単に扱えるPythonライブラリ `pyotp` をインストールします。

```bash
pip install pyotp
```

---

## 🧪 TOTP認証コードを生成してみよう

以下のPythonコードで、**シークレットキーからTOTPコードを生成**できます。

```python
import pyotp

# シークレットキー（Google Authenticatorなどから取得したもの）
secret = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"  # 実際のキーに置き換えてください

# TOTP インスタンス生成
totp = pyotp.TOTP(secret)

# 現在時刻に対応する認証コード（6桁）
code = totp.now()

print("認証コード:", code)
```

### ✅ 実行結果（例）

```
認証コード: 123456
```

このコードは約30秒ごとに切り替わります。  
複数回実行すると、そのたびに異なるコードが得られるはずです。

---

## 💡 実際にどんな場面で便利？

- **サーバーへのSSHログイン**時に2段階認証が必要だけど、スマホを取り出すのが面倒…
- **VPN接続や管理画面ログイン**など、頻繁にコードを確認するシーン

こうした場面では、**このスクリプトを実行するだけで即コード取得**できるので、時短＆スマート！

---

## ⚠️ 注意点：セキュリティ意識は忘れずに！

便利とはいえ、**シークレットキーをPC上に平文で保存しておくのはリスク**があります。  
次のような対策がオススメです：

- `.env`ファイルや環境変数に保存してコード内で直接書かない
- GitHub等に公開しない（`.gitignore`設定を忘れずに）
- ファイルやディレクトリに適切な権限を設定

## 参考

- <a href="pyotp公式GitHub" target="_blank" rel="nofollow noopener">[MDN Web Docs - SpeechSynthesis](https://github.com/pyauth/pyotp)</a>
- <a href="RFC 6238 – TOTP: Time-Based One-Time Password Algorithm" target="_blank" rel="nofollow noopener">https://datatracker.ietf.org/doc/html/rfc6238</a>

---

## 🧭 まとめ

| 項目 | 内容 |
|------|------|
| ライブラリ | pyotp |
| 入力 | シークレットキー（Base32） |
| 出力 | 時刻ベースの6桁コード |
| 実行タイミング | 任意。コードは30秒ごとに変化 |

スマホを取り出す手間を省き、**自分のPCで手軽にTOTPコードを生成できる**というのはかなり便利な工夫です。  
ぜひあなたの開発・運用環境に取り入れてみてください！
