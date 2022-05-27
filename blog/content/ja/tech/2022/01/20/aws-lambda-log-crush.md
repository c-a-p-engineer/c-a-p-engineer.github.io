---
title: "【AWS Lambda】AWS Lambda でログも出さすに突然の死！"
date: 2022-01-20T02:00:00+09:00
description: "AWS Lambdaがなぜかログも突然の死！何も言わずにただただ死んでいく！？なぜだ！？"
draft: false
enableToc: true
enableTocContent: true
tags: 
- AWS
- AWS Lambda
categories: 
- AWS Lambda
image: images/thumbnail/Amazon_Web_Services_Logo.svg
---

# 【AWS Lambda】AWS Lambda で突然の死！
`AWS Lambda` がなぜかログも突然の死！何も言わずにただただ死んでいく！？
なぜだ！？

## ログが出ない
`AWS Lambda` をでは `stdout` または `stderr` に書き込む事によって `CloudWatch Logs` にログが出されます。
だがなぜか出ない。

以下のような開始、終了、レポートしか出力されない状況に陥ってしまいました。
```shell
START RequestId: c793869b-ee49-115b-a5b6-4fd21e8dedac Version: $LATEST
END RequestId: c793869b-ee49-115b-a5b6-4fd21e8dedac
REPORT RequestId: c793869b-ee49-115b-a5b6-4fd21e8dedac	Duration: 128.83 ms	Billed Duration: 200 ms	Memory Size: 128 MB	Max Memory Used: 74 MB	Init Duration: 166.62 ms	XRAY TraceId: 1-5d9d007f-0a8c7fd02xmpl480aed55ef0	SegmentId: 3d752xmpl1bbe37e	Sampled: true
```

## ログが出ない原因
ログが出ない原因は2つほどありました。

### タイムアウト
処理がタイムアウトするとタイムアウト時点で `Lambda` 落ちるようです。

試してみて以下のような流れを感じました。
`Lambda` 処理終了 → `Lambda` の `stdout` `stderr` を `CloudWatch Logs` に送信 → `Lambda` 終了
この流れのため `Lambda` がタイムアウト時点でいっぱいまで動くとログを送信する時間がないように感じます。

<a href="https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/runtimes-logs-api.html#runtimes-logs-api-buffering" target="_blank" rel="nofollow noopener">バッファリング構成</a>
> timeoutMs - バッチをバッファーする最大時間（ミリ秒単位）。デフォルト: 1,000。最小: 25 最大: 30,000。

対策は **タイムアウトさせない** ことです。

### ログ出力
`Lambda` はログの出力容量が以下の決まっております。

<a href="https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/runtimes-logs-api.html#runtimes-logs-api-buffering" target="_blank" rel="nofollow noopener">バッファリング構成</a>
> maxBytes - メモリにバッファするログの最大サイズ （バイト単位）。デフォルト: 262,144。最小: 262,144。最大: 1,048,576。

このため大量のログを送るとクラッシュします。

> Lambda は、ランタイムがクラッシュした場合など、入力ストリームが閉じられている場合、ログをフラッシュします。

僕の場合、デバッグ用のログを大量に入れていたのでランタイムがクラッシュ → タイムアウトまで時間を食いつぶすという現象でした。

対策は **`stdout` `stderr` を通さず、直接 `CloudWatch Logs` にログを送る** ことです。
そうすることによりランタイムがクラッシュしない、タイムアウトしてもログが `CloudWatch Logs` に残ります。

## 参考
* <a href="https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/monitoring-cloudwatchlogs.html" target="_blank" rel="nofollow noopener">AWS Lambda の Amazon CloudWatch Logs へのアクセス - AWS Lambda</a>
* <a href="https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/runtimes-logs-api.html" target="_blank" rel="nofollow noopener">Lambda ログ API - AWS Lambda</a>
