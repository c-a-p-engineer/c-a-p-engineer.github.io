---
title: "Stable Hordeで無料画像生成！APIキーなしでもOKな非同期スクリプト"
date: 2025-06-12T19:00:00+09:00
description: "Stable HordeをGoogle Colabで手軽に使って画像生成！簡略スクリプトと、非同期処理の仕組みを解説。"
tags: []
categories: []
draft: false
legacySlug: stable_horde_colab_article
image: "images/thumbnail/ai_robot.jpg"
---

# Stable Hordeで無料画像生成！APIキーなしでもOKな非同期スクリプト
画像生成AIを使ってみたいけど、
- PCが非力…
- モデルが重すぎてローカルで動かせない…

という人は少なくないはず。

そんな方に最適なのが、**無料・分散型で画像を生成してくれるAPI「[Stable Horde](https://stablehorde.net/)」**です。

本記事では、Google Colab上でStable Hordeを使って、**プロンプトから画像を非同期生成するPythonコード**を紹介します。

---

## 特徴とポイント

- ✅ Colabで完結：環境構築不要
- ✅ **APIキーなしでも使える**（後述）
- ✅ 非同期処理＆ログで状態が見える
- ✅ 初心者向けに簡略化済みスクリプト

---

## Stable Hordeとは？

Stable Hordeは、**Stable Diffusion**などの画像生成AIを、**有志による分散コンピューティングで動かす無料サービス**です。

- アカウント登録不要
- 無料
- Web UI不要、APIで完結

---

## APIキー「0000000000」でも動く理由

```python
API_KEY = "0000000000"
```

これは実は**「匿名ユーザー」として扱われる特別な値**です。Stable Hordeの設計上：

- 認証されたユーザー（自分のAPIキー） → 優先処理・高スロット
- 匿名ユーザー（"0000000000"） → スロット少なめ・制限あり

ただし匿名でも**少量の生成テストや学習には十分**な性能があります。

📌 **本格的に使いたい場合は、[こちら](https://stablehorde.net/register)から無料登録してAPIキーを取得しましょう。**

---

## 最小構成のスクリプト（Colab対応）

以下をColabセルにコピー＆ペーストすればすぐ実行可能です👇

```python
!pip install --quiet requests pillow

import requests, time, base64, io
from PIL import Image
from IPython.display import display

API_KEY = "0000000000"
headers = {"apikey": API_KEY, "Client-Agent": "colab-demo/0.1"}
payload = {
    "prompt": "夜桜の並木道を歩く少女",
    "params": {"width": 1280, "height": 704, "steps": 25, "cfg_scale": 7.5},
    "n": 1
}

res = requests.post("https://stablehorde.net/api/v2/generate/async", json=payload, headers=headers)
job_id = res.json().get("id")
print("ジョブ送信:", job_id)

while True:
    r = requests.get(f"https://stablehorde.net/api/v2/generate/status/{job_id}", headers=headers).json()
    if r.get("done"):
        img_data = r["generations"][0]["img"]
        break
    print("待機中..."); time.sleep(10)

img_bytes = base64.b64decode(img_data.split(",")[1]) if img_data.startswith("data:image") else requests.get(img_data).content
img = Image.open(io.BytesIO(img_bytes))
display(img)
img.save("output.png")
```

実行結果

<img src="./sample.png" width="300" />


---

## 実行するとどうなる？

- プロンプトに従って画像が生成される
- Colab上で表示
- `output.png`として保存もされる

🔁 状況により待機時間（数秒〜数分）が発生します。

---

## 応用：プロンプト変更、複数生成、サンプラー切り替え

生成結果が気に入らない場合は：

- `prompt`を英語で工夫する（例: "a girl walking under cherry blossoms at night"）
- `"n": 3` にして複数枚生成
- `"sampler_name": "k_lms"` などを試す

---

## まとめ

| 項目               | 内容                                  |
|--------------------|---------------------------------------|
| 利用サービス        | [Stable Horde](https://stablehorde.net/) |
| 必要なもの          | Colab + このスクリプトだけ             |
| APIキー             | なくてもOK（匿名枠で動作）             |
| メリット            | 無料、高品質、サーバ不要               |

---
