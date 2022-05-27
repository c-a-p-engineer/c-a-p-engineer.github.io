---
title: "【AWS Lambda Python】pytzが使えない対応方法"
date: 2021-12-04T03:00:00+09:00
description: "AWS Lambda上で pytz を利用することが出来ません。対応方法メモ。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- AWS
- AWS Lambda
- Python
categories: 
- AWS Lambda
image: images/thumbnail/Amazon_Web_Services_Logo.svg
---

# 【AWS Lambda Python】pytzが使えない対応方法
AWS Lambda上で `pytz` を利用することが出来ません。
対応方法メモ。

## 失敗例
`pytz` を使用すると `AWS Lambda` 上で失敗します。
```python
from datetime import datetime
import pytz

def lambda_handler(event, context):

    # フォーマット
    date_format='%Y/%m/%d %H:%M:%S %Z'
    # タイムゾーン設定
    date = datetime.now(tz=pytz.timezone('Asia/Tokyo'))
    # 表示
    print('Japan DateTime is  :', date.strftime(date_format))
```

```json
Response:
{
  "errorMessage": "Unable to import module 'lambda_function': No module named 'pytz'",
  "errorType": "Runtime.ImportModuleError"
}
```

## 対応方法
`dateutil` を使用するように修正します。
```python
from datetime import datetime
from dateutil import tz

def lambda_handler(event, context):
    # フォーマット
    date_format='%Y/%m/%d %H:%M:%S %Z'
    # タイムゾーン
    time_zone = tz.gettz('Asia/Tokyo')
    # 日付
    date = datetime.now(tz=time_zone)
    # 表示
    print('Japan DateTime is  :', date.strftime(date_format))
```

## 参考
* <a href="https://stackoverflow.com/questions/55212012/python-timezone-using-only-modules-available-in-aws-lambda" target="_blank" rel="nofollow noopener">amazon web services - Python timezone using only modules available in AWS Lambda? - Stack Overflow</a>
