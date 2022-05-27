---
title: "【AWS】MFA デバイスの削除する"
date: 2022-02-20T13:40:00+09:00
description: "MFA設定途中に中断してしまってMFAデバイスを認証せずに残ってしまった際の対処メモ"
draft: false
enableToc: true
enableTocContent: true
tags: 
- AWS
categories: 
- AWS
image: images/thumbnail/Amazon_Web_Services_Logo.svg
---

# 【AWS】MFA デバイスの削除する
MFA設定途中に中断してしまってMFAデバイスを認証せずに残ってしまった際の対処メモ

## 問題の発生

1. MFAデバイスの設定
2. 仮想デバイスの設定
3. **エンディティが既に存在します** と表示された。

これは前回設定途中に中断してしまったことから発生。

## AWS CLIで対処
ログインは出来ていたのでシークレットキーの発行を行い AWS CLI を駆使して確認。

### デバイスの確認
まずはデバイスの確認を行います。
<a href="https://docs.aws.amazon.com/cli/latest/reference/iam/list-virtual-mfa-devices.html" target="_blank" rel="nofollow noopener">aws iam list-virtual-mfa-devices</a>
```
aws iam list-virtual-mfa-devices
```

実行結果
```json
{
  "VirtualMFADevices": [
    {
      "SerialNumber": "arn:aws:iam::123456789012:mfa/ExampleMFADevice"
    },
    {
      "SerialNumber": "arn:aws:iam::123456789012:mfa/Fred"
    }
  ]
}
```

### デバイスの削除
デバイスの確認で自分の中途半端に残ったデバイスのシリアルナンバーを特定して削除。
<a href="https://docs.aws.amazon.com/cli/latest/reference/iam/delete-virtual-mfa-device.html" target="_blank" rel="nofollow noopener">aws iam delete-virtual-mfa-device</a>
```
aws iam delete-virtual-mfa-device --serial-number arn:aws:iam::123456789012:mfa/MFATest
```

これを実行することで再度MFAの設定が可能になります。

## 参考
* <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_general.html#troubleshoot_general_access-denied-delete-mfa" target="_blank" rel="nofollow noopener">Troubleshooting general IAM issues - I am not authorized to perform: iam:DeleteVirtualMFADevice</a>
