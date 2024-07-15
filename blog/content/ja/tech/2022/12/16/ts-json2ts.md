---
title: "【TypeScript】JSONを自動的にTypeScriptの型に変換してくれる json2ts"
date: 2022-12-16T02:30:00+09:00
description: "TypeScript で一々型を作るのは面倒と言う時にJSONを入れると自動的にTypeScriptの型に変換してくれる json2ts のご紹介"
draft: false
enableToc: true
enableTocContent: true
tags: 
- TypeScript
categories: 
- TypeScript
image: images/thumbnail/Typescript_logo_2020.svg
---

# 【TypeScript】JSONを自動的にTypeScriptの型に変換してくれる json2ts
TypeScript で一々型を作るのは面倒と言う時にJSONを入れると自動的にTypeScriptの型に変換してくれる json2ts のご紹介
* <a href="http://json2ts.com/" target="_blank" rel="nofollow noopener">json2ts</a>

## 使用方法
1. tsの型にしたいjsonをテキストエリアに入れる
2. 下の `generate TypeScript` ボタンを押すだけ。

以下のようなサンプルのjsonを入れてみてください。
```json
{
  "quotes": [
    {
      "high": 121.64,
      "low": 119.05,
      "currencyPairCode": "EURJPY",
      "comment": "EUR JPY",
    },
    {
      "high": 142.60,
      "low": 140.43,
      "currencyPairCode": "GBPJPY",
      "comment": null
    }
  ]
}
```

以下のような `ts` の内容が出力されます。
後は名前を変更するなどして使用が可能です。
```ts
declare module namespace {

    export interface Quote {
        high: number;
        low: number;
        currencyPairCode: string;
        comment: string;
    }

    export interface RootObject {
        quotes: Quote[];
    }

}
```
{{< notice warning >}}
**注意**
本来であれば `comment: string;` には `null` も入るので `comment?: string;` にならなければいけないです。
json2ts はその辺りがきっちりなっていないので細部には気をつけて使用してください。
{{< /notice >}}

注意点もありますがこれで一々手打ちしなくて良いのが楽でいいです。
