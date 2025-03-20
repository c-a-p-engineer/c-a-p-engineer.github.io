---
title: "【AI】Google Gemini の無料APIキーを取得する方法"
date: 2025-03-15T03:30:00+09:00
description: "Gemini APIを利用するためには、APIキーが必要です。Google AI StudioでGemini APIキーを取得する手順と、その後の利用方法についてメモします。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- AI
categories: 
- AI
image: images/thumbnail/ai_robot.jpg
---

# 【AI】Google Gemini の無料APIキーを取得する方法

Gemini APIを利用するためには、APIキーが必要です。
Google AI StudioでGemini APIキーを取得する手順と、その後の利用方法についてメモします。

<a href="https://aistudio.google.com/" target="_blank" rel="nofollow noopener">Google AI Studio</a> 

## Gemini APIキーの取得手順

### Google AI Studioにアクセス

1. <a href="https://aistudio.google.com/" target="_blank" rel="nofollow noopener">Google AI Studio</a>  にアクセスします。
1. サイドバーの「Get API Key」を押下
1. 「APIキーを作成」を押下
1. APIキーが発行される
  1. 「Gemini API」プロジェクトが作成される

## サンプル

`GEMINI_API_KEY` を発行したAPIキーにしてください。

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY" \
-H 'Content-Type: application/json' \
-X POST \
-d '{
  "contents": [{
    "parts":[{"text": "Explain how AI works"}]
    }]
   }'

```

## 料金

**現在は無料で使用可能**、作られたGemini APIは支払先が設定されてないはずなので課金されるようになってもおそらく使用不可になるだけです。
ですが課金されたくない場合などはとくに注意してみてください。

ただ該当のプロジェクトに課金アカウント連携して課金APIを使用していたら課金されるかとは思います。

## 注意点

- **APIキーの管理とセキュリティ**  
  APIキーは機密情報です。安全に管理し、GitHubなどの公開リポジトリにアップロードしないよう注意してください。

- **利用規約の確認**  
  Gemini APIを利用する前に、必ず最新の利用規約を確認してください。

## まとめ

本記事では、Gemini APIキーの取得手順と、取得後のAPIキーの使用方法について解説しました。  
手順に沿ってAPIキーを取得し、コード内で適切に利用することで、Gemini APIをさまざまな用途に活用できるようになります。  
ぜひ、実際に試してみてください。

## 参考資料

- <a href="https://aistudio.google.com/" target="_blank" rel="nofollow noopener">Google AI Studio</a>
- <a href="https://ai.google.dev/gemini-api" target="_blank" rel="nofollow noopener">Gemini APIドキュメント</a>
