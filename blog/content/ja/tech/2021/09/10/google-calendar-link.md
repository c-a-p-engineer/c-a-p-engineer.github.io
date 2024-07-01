---
title: "Googleカレンダーへ予定を追加するリンクを作る"
date: 2021-09-10T12:00:00+09:00
description: "Googleカレンダーへ予定を追加するリンクを作ってみます。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Google
categories: 
- Google
image: images/thumbnail/calender_schedule_half.png
---

# Googleカレンダーへ予定を追加するリンクを作る
Googleカレンダーへ予定を追加するリンクを作ってみます。

## Googleカレンダー 追加リンク
リンク自体はこのようにすれば簡単に作ることが出来ます。
<a href="https://www.google.com/calendar/render?action=TEMPLATE&text=MTG&dates=20210910T120000/20210910T130000&details=meeting&add=example@example.com" target="_blank" rel="nofollow noopener">https://www.google.com/calendar/render?action=TEMPLATE&text=MTG&dates=20210910T120000/20210910T130000&details=meeting&add=example@example.com</a>

### パラメータ説明
設定できる各種パラメーター

| パラメーター | 必須 | 説明 |
| - | - | :- |
| action | ○ | action=TEMPLATE<br>「TEMPLATE」固定。 |
| text | ○ | 予定の件名 |
| details |  | 詳細 |
| dates |  | 日時 開始日時/終了日時<br>例） dates=20090621T063000Z/20090621T080000Z<br>フォーマット：YYYYMMDDTHHmmSSZ/YYYYMMDDTHHmmSSZ |
| location |  | 場所 |
| add |  | ゲストのメールアドレス |

### リンク作成

| 名称 | 値 |
| - | - |
| 予定名 | <input id="text" type="text" /> |
| 詳細 | <input id="details" type="text" /> |
| 日時 | <input id="dates" type="text" /> |
| 場所 | <input id="text" type="text" /> |
| ゲストのメールアドレス | <input id="add" type="text" /> |
| 予定名 | <input id="text" type="text" /> |

<textarea id="link" style="width:100%:"></textarea>

## 参考
* <a href="https://qiita.com/yuta_sawamura/items/738732565e2cfd11fb23" target="_blank" rel="nofollow noopener">Googleカレンダーの予定を追加するURLリンク - Qiita</a>
* <a href="https://webasterisk.sakura.ne.jp/wp/googlecalendar_eventbuttonsgenerator/" rel="nofollow noopener" target="_blank">Googleカレンダーに追加するURLリンクを自動生成してくれるツール</a>
