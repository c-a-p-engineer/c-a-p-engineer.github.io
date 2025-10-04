---
title: "【Python】DjangoのCSRFエラー「403 Forbidden」解決方法"
date: 2025-08-28T12:30:00+09:00
description: "DjangoでフォームやAPIリクエストを送信したとき、`403 Forbidden - CSRF verification failed. Request aborted.` というエラーに遭遇したことはありませんか？"
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

# 【Python】DjangoのCSRFエラー「403 Forbidden」解決方法

DjangoでフォームやAPIリクエストを送信したとき、`403 Forbidden - CSRF verification failed. Request aborted.` というエラーに遭遇したことはありませんか？
これは**DjangoのCSRF（Cross Site Request Forgery）保護機構**によって、セキュリティ上の問題が検出されたときに表示されるエラーです。

この記事では、CSRFエラーの意味とその対処方法を、**わかりやすくチェックリスト形式**で対処します。

---

## Djangoで「CSRF verification failed」が出る理由とは？

Djangoには、悪意あるクロスサイト攻撃を防ぐための「CSRF保護機構」が標準搭載されています。
ユーザーの意図しないPOSTリクエストによってデータ改ざんや情報漏洩が起こらないよう、**CSRFトークン**という仕組みを使ってリクエストの正当性を確認しています。

このチェックに失敗すると、**403 Forbidden**エラーが返されます。
開発中に頻出するため、正しい原因を突き止めて適切に対応することが重要です。

---

## エラーメッセージの読み解き方

Djangoで`DEBUG = True`の設定時、以下のような詳細なエラー画面が表示されます。

```
Forbidden (403)

CSRF verification failed. Request aborted.

Reason given for failure:

    Origin checking failed - https://example.com does not match any trusted origins.
```

この例では、リクエストの`Origin`が信頼されていないことが原因でブロックされています。

`DEBUG = False`の場合は、簡素なエラー画面のみ表示され、詳細情報は省略されます。
本番環境ではセキュリティ上の理由から、詳細な情報は非表示になる仕様です。

---

## 原因と解決策チェックリスト

### CSRFトークンがフォームに含まれていない

テンプレート内でPOSTフォームを作る際は、必ず`{% csrf_token %}`をフォームタグの中に含めましょう。

```html
<form method="post">
  {% csrf_token %}
  <!-- フォームの内容 -->
</form>
```

トークンが埋め込まれていないと、リクエストはすべて拒否されます。

---

### ブラウザがCookieをブロックしている

CSRFトークンはDjangoがCookieと連動して管理しています。
**ブラウザの設定や拡張機能がCookieをブロックしている**場合、エラーが発生します。

とくにSafariやChromeのプライバシー設定は要注意です。開発中はCookieの保存が有効になっているか確認しましょう。

---

### JavaScriptによる非同期POSTでトークンが付与されていない

JavaScriptからAJAXやfetch APIでPOSTリクエストを送信する場合、ヘッダーにCSRFトークンを明示的に含める必要があります。

例（JavaScript）：

```js
fetch("/api/update/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie("csrftoken")
  },
  body: JSON.stringify({ data: "..." })
});
```

Django公式ドキュメントにもあるように、`csrftoken`はクッキーから取得し、`X-CSRFToken`ヘッダーにセットします。

---

### `ALLOWED_HOSTS` または `CSRF_TRUSTED_ORIGINS` の不備

Django 4.0以降では、**クロスオリジンからのPOSTリクエスト**を許可するために `CSRF_TRUSTED_ORIGINS` を正しく設定する必要があります。

例（`settings.py`）：

```python
CSRF_TRUSTED_ORIGINS = [
    "https://example.com",
]
```

また、`ALLOWED_HOSTS` に対象ドメインを追加することも忘れずに。

---

### HTTPSとHTTPが混在している

HTTPSで配信されているページから、HTTPで送信されたリクエストは「安全でない」と判断されてブロックされます。
とくにフロントエンドとAPIが別ドメイン・別プロトコルで動いている場合に起こりやすいです。

→ 全体をHTTPSに統一するのが基本です。

---

### セッションが切れてトークンが無効になった

ログイン後に時間が経過してからPOST操作をすると、**セッショントークンの期限切れ**でエラーが発生することがあります。

→ ページを**リロードしてトークンを更新**することで解消できます。

---

## よくあるケース別の対処法

### ログイン後にエラーが出る

ログイン処理後はCSRFトークンが再生成されるため、**ブラウザの「戻る」ボタンでフォームを開いた場合、トークンが古い状態**になります。

→ ログイン後は必ずリダイレクトさせ、新しいトークンを生成させるのが安全です。

---

### フロントエンド（React/Vueなど）からAPIを叩いたとき

SPA構成では、CSRFトークンの取得・保持をJavaScript側で行う必要があります。

→ Djangoテンプレートからトークンを埋め込む、あるいは `/api/csrf/` のような専用エンドポイントを作って取得させましょう。

---

### 管理画面にログインできないとき

管理画面ログインでCSRFエラーが出る場合、ブラウザのCookie設定やプロキシ構成が影響していることがあります。

→ Cookie制限や`X-Forwarded-Proto`ヘッダーを見直してください。

---

## セキュリティを損なわない対処のポイント

CSRFチェックを**無効化するのは推奨されません**。
開発中にどうしてもチェックを外す必要がある場合は、以下のようにビュー関数単位で一時的に無効化します。

```python
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def my_view(request):
    ...
```

しかし、本番環境ではCSRF保護を常に有効にし、安全な実装を徹底しましょう。

---

## まとめ：CSRFエラーは「疑ってチェック」から始めよう

CSRFエラーはDjangoが安全に動作している証拠でもあります。
焦らず以下のチェックリストを辿って確認しましょう。

* フォームに `{% csrf_token %}` を含めたか
* Cookieがブロックされていないか
* JavaScript経由のリクエストにトークンを付与したか
* `CSRF_TRUSTED_ORIGINS` に正しいドメインを設定したか
* HTTPとHTTPSの混在がないか
* セッションやログイン直後の動作に問題がないか

これらを確認するだけで、大半の403エラーは解決できます。

---

## 📎参考リンク

- <a href="https://docs.djangoproject.com/en/stable/ref/csrf/" target="_blank" rel="nofollow noopener">CSRF protection | Django documentation</a>
- <a href="https://docs.djangoproject.com/en/stable/ref/settings/#csrf-trusted-origins" target="_blank" rel="nofollow noopener">CSRF_TRUSTED_ORIGINS の公式説明</a>
