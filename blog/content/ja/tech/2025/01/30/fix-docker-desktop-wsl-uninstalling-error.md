---
title: "【Docker】WSLでDockerが壊れた？ docker-desktop Uninstalling のエラー原因と解決策"
date: 2025-01-30T12:00:00+09:00
description: Windows Updateを行ったらDockerがドッカーンしたので対処方法まとめ
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】WSLでDockerが壊れた？ docker-desktop Uninstalling のエラー原因と解決策

Windows Updateを行ったらDockerがドッカーンしたので対処方法まとめ

## エラーの概要

Docker Desktop を WSL2 で利用していると、Windows Updateを行ったら、以下のようなエラーが発生することがあります。

```sh
docker-desktop    Uninstalling    2
```

`wsl --list --verbose` コマンドを実行すると、`docker-desktop` の状態が **"Uninstalling"（アンインストール中）** となり、Docker が起動しなくなる現象です。

このエラーの影響として、
- `docker ps` や `docker run` などのコマンドが動作しない
- Docker Desktop が起動しない
- WSL の `docker-desktop` ディストリビューションが削除できない

といった問題が発生します。

---

## エラー発生の原因

この現象は主に以下の理由で発生します。

### Docker Desktop のアップデートやアンインストールが失敗した

Docker Desktop のアップデートが途中で止まる、またはアンインストールプロセスが失敗すると、`docker-desktop` が「アンインストール中」の状態のまま残ってしまうことがあります。

### WSL の環境が破損している

WSL のアップデートや設定の不整合が原因で、Docker の WSL インテグレーションが正しく動作しなくなる場合があります。

### Windows Update の影響
Windows Update による WSL2 カーネルの変更が原因で、Docker が正常に動作しなくなることもあります。

---

## 解決策

以下の手順を順番に試して僕の環境は治りました。

---

### WSL のシャットダウン

まず、WSL を完全にシャットダウンしてみましょう。

```powershell
wsl --shutdown
```

その後、Docker Desktop を再起動し、正常に動作するか確認してください。

---

### docker-desktop を手動で削除

WSL の `docker-desktop` がアンインストールに失敗している場合、手動で削除します。

**PowerShell（管理者権限）で実行:**
```powershell
wsl --unregister docker-desktop
```

再度、WSL の状態を確認：
```powershell
wsl --list --verbose
```
`docker-desktop` が消えていることを確認してください。

これでDocker Desktopを再起動すれば起動するはずです。
