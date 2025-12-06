---
title: 管理者権限なしで Git をインストールして VSCode で使う最短手順【Scoop 利用・Windows】
date: 2025-10-26T05:00:00+09:00
description: ソフトウェアのインストールに管理者権限が使えないことがありますそんな環境でも問題なく Git を導入できるの方法があります。 
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

# 管理者権限なしで Git をインストールして VSCode で使う最短手順【Scoop 利用・Windows】

ソフトウェアのインストールに **管理者権限が使えない**ことがあります。  
そんな環境でも問題なく Git を導入できるのが **Scoop（ユーザー権限で動作するパッケージマネージャー）** です。

本記事では、管理者権限なしでできる **Scoop のセットアップ → Git のインストール → VSCode で利用可能にする手順** を最短距離で解説します。

---

## 管理者権限なしで Scoop をインストールする

Scoop は **管理者権限を一切使わずにインストールできる** 点が大きな特徴です。  
まずは通常権限の PowerShell を起動し、以下を実行します。

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

成功すると、Scoop はユーザー領域に次のように展開されます：



この仕組みにより、管理者権限が不要のままツールを管理できます。

---

## Scoop を使って Git をインストールする（管理者権限不要）

Scoop の利点は、Git などの開発ツールも **管理者権限なしで追加できる**ことです。

```powershell
scoop install git
```

確認：

```powershell
git --version
```

問題なくバージョンが表示されればセットアップ完了です。
PATH の設定も Scoop が自動で行うため、追加作業は不要です。

---

## VSCode のデフォルトターミナルを Gitbash に設定する

権限に関係なく、VSCode 側で PowerShell を使う設定を行えば、Scoop 版 Git をそのまま利用できます。

### 方法 A：GUI で変更する方法（手軽）

1. VSCode → **Ctrl + Shift + P**
2. `Terminal: Select Default Profile`
3. **PowerShell** を選択

Scoop 版 Git は PATH に追加されているため、VSCode でもすぐに使えます。

---

### 方法 B：settings.json で固定する方法（明示的）

```json
{
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "terminal.integrated.profiles.windows": {
    "Git Bash": {
      "path": "%USERPROFILE%\\scoop\\apps\\git\\current\\bin\\bash.exe",
      "icon": "terminal-bash"
    }
  }
}
```

VSCode の統合ターミナルが PowerShell に固定され、Git の利用環境が安定します。

---

## 最短手順まとめ（コピペ用）

```powershell
# 管理者権限なしで Scoop を導入
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Git のインストール
scoop install git
```

VSCode → `Terminal: Select Default Profile` → **Git Bash** を選択すれば、Scoop 版 Git を VSCode で利用できます。
