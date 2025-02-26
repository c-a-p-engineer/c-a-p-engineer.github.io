---
title: "【Github】SSHでの複数リポジトリ対応方法"
date: 2025-02-19T02:30:00+09:00
description: "GitHubなどのサービスで、用途やアカウントごとに異なるSSHキーを使い分ける方法をご紹介します。"
draft: false
enableToc: true
enableTocContent: true
tags: 
- GitHub
categories: 
- GitHub
image: images/thumbnail/GitHub_Logo_White.png
---

# 【Github】SSHでの複数リポジトリ対応方法

GitHubなどのサービスで、用途やアカウントごとに異なるSSHキーを使い分ける方法をご紹介します。
既存のSSHキーと別に新たなキーを作成し、`~/.ssh/config` を用いて複数リポジトリやアカウントに対応する設定手順を詳しく解説します。

---

## 新しいSSHキーの生成

既存のキーと混同しないよう、用途ごとに別のSSHキーを作成します。たとえば、仕事用アカウント専用のキーを生成する場合は、以下のコマンドを実行します。

```bash
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/github-work
```

- **-t ed25519**: 安全性の高いED25519アルゴリズムを使用
- **-C "your_email@example.com"**: キーの識別用コメント
- **-f ~/.ssh/github-work**: キーを保存するファイル名（既存のキーと重複しないように）

---

## SSHエージェントへのキー追加

生成した新しいSSHキーを、SSHエージェントに登録しておくと、以降の接続時に毎回パスフレーズを入力する手間が省けます。

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github-work
```

---

## GitHubアカウントへの公開鍵登録

生成した公開鍵（`~/.ssh/github-work.pub`）を対象のGitHubアカウントに登録します。  
GitHubの「SSH and GPG keys」ページにアクセスし、「New SSH key」からキーを追加してください。

---

## SSH設定ファイルの編集

複数のSSHキーを使い分けるため、`~/.ssh/config` ファイルにホストごとの設定を記述します。以下はサンプル設定です。

```config
# 個人用GitHubアカウント（既存のキー）
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519

# 仕事用GitHubアカウント（新しく生成したキー）
Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/github-work
```

- **Host**: 任意のエイリアス名。ここでは「github-work」として、仕事用の接続先を指定します。
- **HostName**: 実際のサーバ名（GitHubの場合は「github.com」）。
- **User**: 接続時に使用するユーザ（GitHubでは「git」）。
- **IdentityFile**: 使用する秘密鍵のパスを指定。

この設定により、仕事用リポジトリをクローンする際は、以下のようにエイリアスを利用します。

```bash
git clone git@github-work:work-username/repository.git
```

SSHクライアントは「github-work」の設定を参照し、指定された秘密鍵（`~/.ssh/github-work`）を使用して接続を行います。

---

## まとめ

- **用途ごとに新しいSSHキーを生成**  
  コマンドで別のファイル名を指定し、安全に運用。
- **SSHエージェントに追加**  
  キーの自動読み込みで作業効率アップ。
- **対象GitHubアカウントに公開鍵を登録**  
  各アカウントごとに適切な公開鍵を追加。
- **`~/.ssh/config`でエイリアス設定**  
  リポジトリのクローン時にエイリアスを使い分け、複数アカウントの管理を簡単に。

これらの手順により、同一マシン上で複数のGitHubアカウントや用途に合わせたSSH接続をスムーズに運用できます。

---

## 参考URL

- <a href="https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent" target="_blank" rel="nofollow noopener">GitHub公式ドキュメント - SSHキーの生成と登録</a>
- <a href="https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account" target="_blank" rel="nofollow noopener">GitHub公式ドキュメント - SSHキーの追加</a>
