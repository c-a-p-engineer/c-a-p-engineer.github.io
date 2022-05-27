---
title: "WSL2 を入れてみる"
date: 2021-09-06T10:00:00+09:00
description: "通称 WSL と呼ばれる Windows Subsystem for Linux を導入してみました。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Windows
categories: 
- Windows
image: images/thumbnail/linux.png
---

# WSL2 を入れてみる
通称 `WSL` と呼ばれる `Windows Subsystem for Linux` を導入してみました。

公式のインストールガイドはこちらになります。
<a href="https://docs.microsoft.com/ja-jp/windows/wsl/install-win10" target="_blank" rel="nofollow noopener">Windows 10 用 Windows Subsystem for Linux のインストール ガイド</a>

## 動作要件
> WSL 2 に更新するには、Windows 10 を実行している必要があります。
> ・x64 システムの場合:バージョン 1903 以降、ビルド 18362 以上。
> ・ARM64 システムの場合:バージョン 2004 以降、ビルド 19041 以上。
> ・18362 より前のビルドは WSL 2 をサポートしていません。 Windows 更新アシスタントを使用して、お使いのバージョンの Windows を更新します。

## 簡易的な手順
コマンド一発で簡単にインストールも可能です。
<a href="https://docs.microsoft.com/ja-jp/windows/wsl/install-win10#simplified-installation-for-windows-insiders" target="_blank" rel="nofollow noopener">Windows Insider 用の簡略化されたインストール</a>
``` PowerShell
wsl --install
```

## 手順

1. 管理者権限で `PowerShell` を実行
2. Linux 用 Windows サブシステム" オプション機能を有効にする
``` PowerShell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```
3. 仮想マシンの機能を有効にする
``` PowerShell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
4. Linuxカーネル更新プログラムをダウンロード
<a href="https://docs.microsoft.com/ja-jp/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package" target="_blank" rel="nofollow noopener">Linux カーネル更新プログラム パッケージをダウンロードする</a>

5. WSL 2 を既定のバージョンとして設定する
``` PowerShell
wsl --set-default-version 2
``` 
6. Windows Store から Linux ディストリビューションを選択<br>  <a href="https://docs.microsoft.com/ja-jp/windows/wsl/install-win10#step-6---install-your-linux-distribution-of-choice" target="_blank" rel="nofollow noopener">選択した Linux ディストリビューションをインストールする</a>
7. インストール完了後に起動
8. 起動後にアカウント名/パスワードを設定

これで完了です。
詳細はインストールページ見てわかるかとは思いますがメモを残しておきました。

## WSLメモ

### WSLの確認
`PowerShell` から以下のコマンドでディストリビューション名が確認できます。

``` PowerShell
wsl --list --verbose
```

### Linuxにログイン
`PowerShell` から以下のコマンドで指定のディストリビューション。
ディストリビューション名の指定がない場合はデフォルトのディストリビューションにログインします。
``` PowerShell
wsl -d {ディストリビューション名}
```

### root でログイン
``` PowerShell
wsl -u root
```

### ユーザの追加
``` wsl
sudo adduser hoge_user
```

### ユーザ指定でログイン
``` PowerShell
wsl -u hoge_user
```

### Windowsからディストリビューションに接続
ファイルエクスプローラーに `\\wsl$` を入力


### ディストリビューションのアンイストール
``` PowerShell
wsl --unregister {ディストリビューション名}
```

## 参考
* <a href="https://docs.microsoft.com/ja-jp/windows/wsl/install-win10" target="_blank" rel="nofollow noopener">Windows 10 用 Windows Subsystem for Linux のインストール ガイド</a>
* <a href="https://qiita.com/rubytomato@github/items/a290ecef2ea86ea8350f#%E6%96%B0%E3%81%97%E3%81%84%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%92%E7%99%BB%E9%8C%B2%E3%81%99%E3%82%8B" target="_blank" rel="nofollow noopener">WSL2の初歩メモ - Qiita</a>
