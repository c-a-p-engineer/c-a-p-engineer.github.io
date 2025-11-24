---
title: PowerShellでモジュールを管理者権限なしでインストールする方法【User Scope対応】
date: 2025-10-26T05:00:00+09:00
description: 社内PCや共有環境で開発作業をする際、PowerShellモジュールのインストールで制限に直面することがあります。
draft: false
enableToc: true
enableTocContent: true
tags:
  - Windows
  - PowerShell
categories:
  - PowerShell
image: images/thumbnail/power_shell.png
---

# PowerShellでモジュールを管理者権限なしでインストールする方法【User Scope対応】

## 管理者権限がない開発者の壁

社内PCや共有環境で開発作業をする際、PowerShellモジュールのインストールで以下のような制限に直面することがあります。

- `Install-Module` を実行すると「管理者権限が必要です」と表示される
- `ImportExcel` や `PSReadLine` など、便利なモジュールが使えない
- セキュリティの都合でローカル管理者アカウントの利用が許可されていない

この記事では、**管理者権限がない環境でもPowerShellモジュールをインストールする方法**として、`-Scope CurrentUser` オプションの活用法を紹介します。

---

## PowerShellモジュールのインストール方法とスコープの基礎

PowerShellでは、`Install-Module` を使用してモジュールをインストールします。
インストール先のスコープ（範囲）は以下の2種類：

| スコープ           | 説明                      | 管理者権限    |
| -------------- | ----------------------- | -------- |
| `AllUsers`（既定） | システム全体にインストール           | 必要       |
| `CurrentUser`  | 現在のユーザーのプロファイル配下にインストール | **不要*- ✅ |

```powershell
# 例：管理者権限なしでImportExcelモジュールをインストール
Install-Module -Name ImportExcel -Scope CurrentUser
```

---

## Scope CurrentUser を使えばユーザーレベルで導入可能

`-Scope CurrentUser` を指定すれば、モジュールは以下のディレクトリにインストールされます：

```powershell
$env:USERPROFILE\Documents\WindowsPowerShell\Modules
```

このディレクトリは管理者権限なしでも書き込み可能なため、`Install-Module` が成功します。

---

## 実践：ImportExcelモジュールをユーザースコープで導入する手順

ここでは、Excelファイルを簡単に読み書きできる人気モジュール `ImportExcel` を例に、実際の手順を解説します。

### PowerShellの実行ポリシー確認

一部環境ではスクリプト実行が制限されています。以下で確認しておきましょう。

```powershell
Get-ExecutionPolicy
```

結果が `Restricted` の場合は、ユーザースコープで一時的に変更できます：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

> 💡 **RemoteSigned**：ローカルのスクリプトは許可、インターネット由来のスクリプトには署名を要求。

---

### Install-Moduleの実行

次に、モジュールをユーザースコープにインストールします。

```powershell
Install-Module -Name ImportExcel -Scope CurrentUser -Force
```

> ✅ `-Force` を付けることで、既存バージョンの上書きや確認プロンプトをスキップできます。

---

### モジュールのインポート確認

インストール後、モジュールが使えるか確認します：

```powershell
Import-Module ImportExcel
Get-Command -Module ImportExcel
```

代表的なコマンド例：

```powershell
# Excelファイルの読み込み
$data = Import-Excel -Path "sample.xlsx"

# データをExcelに書き出す
$data | Export-Excel -Path "output.xlsx" -AutoSize
```

## まとめ：社内PCでもPowerShellは活用できる

- `Install-Module -Scope CurrentUser` を使えば、**管理者権限がなくてもモジュールを導入可能**
- `ImportExcel` などの便利ツールを使えば、Excel連携やログ整形も簡単
- セキュリティ制限がある環境でも、PowerShellの機能を最大限活用できる

---

## 🔗 関連リンク

- <a href="https://www.powershellgallery.com/packages/ImportExcel" target="_blank" rel="nofollow noopener">PowerShell Gallery - ImportExcel</a>
- <a href="https://learn.microsoft.com/en-us/powershell/module/powershellget/install-module" target="_blank" rel="nofollow noopener">公式ドキュメント：Install-Module (Microsoft)</a>
