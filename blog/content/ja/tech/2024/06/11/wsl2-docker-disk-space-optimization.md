---
title: 【Docker】WSL 2とDockerによるディスク容量の削減方法
date: 2024-06-11T01:30:00+09:00
description: LibreTranslateは、オープンソースの翻訳ツールで、無料で多言語の翻訳サービスを提供します。機械学習を利用してテキスト翻訳を行います。
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】WSL 2とDockerによるディスク容量の削減方法

WSL 2（Windows Subsystem for Linux 2）とDockerを使用していると、時には大量のディスク容量を消費することがあります。

とくに、`C:\Users\Username\AppData\Local\Docker\wsl\data\ext4.vhdx`のファイルが大きくなることが問題となる場合があります。この記事では、ディスク容量を削減するための具体的な方法について解説します。

ちなみにはこれらの方法で肥大した容量を100GB程度削減できました。

## 不要なファイルの削除

まず、WSL 2ディストリビューション内の不要なファイルやパッケージを削除します。以下のコマンドを使用して、ディストリビューションにアクセスし、不要なファイルを削除しましょう。

```bash
# WSLにアクセス
wsl

# 不要なファイルを削除 (例: キャッシュ、ログファイル)
sudo apt-get clean
sudo rm -rf /var/cache/apt/archives/*
sudo rm -rf /var/log/*
```

## Dockerのクリーンアップ

Dockerが大量のディスク容量を使用している場合、以下のコマンドで不要なイメージ、コンテナ、ボリューム、ネットワークを削除できます。

```bash
# 不要なイメージを削除
docker image prune -a

# 停止中のコンテナを削除
docker container prune

# 使われていないボリュームを削除
docker volume prune

# 不要なネットワークを削除
docker network prune

# 一括クリーンアップ
docker system prune -a --volumes
```

## WSL 2 ディストリビューションの圧縮

`ext4.vhdx`ファイルのサイズを削減するために、WSL 2ディストリビューションを圧縮します。以下の手順をPowerShellで実行します。

```powershell
# PowerShellを管理者権限で実行

# WSL 2 ディストリビューションの名前を確認
wsl --list --verbose

# 圧縮コマンド
wsl --shutdown
optimize-vhd -Path "C:\Users\Username\AppData\Local\Docker\wsl\data\ext4.vhdx" -Mode full

# WSLを再起動
wsl
```

## ディストリビューションの再インストール

最終手段として、WSL 2ディストリビューションを再インストールする方法があります。この方法を行う前に、必ずデータのバックアップを行ってください。

```powershell
# 現在のディストリビューションをエクスポート
wsl --export <DistributionName> <BackupFileName>.tar

# 現在のディストリビューションを削除
wsl --unregister <DistributionName>

# バックアップからインポート
wsl --import <DistributionName> <InstallLocation> <BackupFileName>.tar
```

## まとめ

- **不要なファイルの削除**: WSL 2内のキャッシュやログファイルを削除。
- **Dockerのクリーンアップ**: 不要なイメージ、コンテナ、ボリューム、ネットワークを削除。
- **WSL 2ディストリビューションの圧縮**: `ext4.vhdx`ファイルのサイズを圧縮し、WSLを再起動。
- **ディストリビューションの再インストール**: 必要に応じてディストリビューションを再インストール。

これらの方法を活用して、WSL 2とDockerによるディスク使用量を効率的に管理しましょう。定期的なメンテナンスで、快適な開発環境を維持することができます。

## 参考

- <a href="https://docs.microsoft.com/en-us/windows/wsl/" target="_blank" rel="nofollow noopener">WSL 2 Documentation</a>
- <a href="https://docs.docker.com/" target="_blank" rel="nofollow noopener">Docker Documentation</a>
