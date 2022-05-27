---
title: "【Git】 複数のコミットを rebase を使って1つにまとめる"
date: 2022-03-06T02:00:00+09:00
description: "複数のコミットログを rebase を使って1つのコミットとしてきれいにする方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
---

# 【Git】 複数のコミットを rebase を使って1つにまとめる
複数のコミットログを rebase を使って1つのコミットとしてきれいにする方法

## rebase を使って複数コミットをまとめる

### 1. リベースを実行
* `~` を使って指定
`~` の数に応じてコミットをまとめます。
`~` 4つなら4つのコミットを1つにします。
```
git rebase -i HEAD~~~~
```
<br>
* 数値を指定
数値を指定してまとめるコミット数を指定します。
```
git rebase -i HEAD~4
```
<br>
* ハッシュ値を指定
どこまでもコミットをまとめるかをハッシュ値を指定します。
```
git rebase [ハッシュ値]
```

### 2. コミットメッセージ修正
リベースを実行するとエディタが起動します。
指定された箇所までのコミットが表示されます。
※特に設定してなければ `Vim` が起動すると思うので使い慣れてない方は注意してください。
```
pick d39e256 コミット1
pick a5264f4 コミット2
pick 1acc768 コミット3
pick a5264f4 コミット4
```

* (p)pick 	    コミットをそのまま残す。
* (r)reword     コミットメッセージを変更。
* (e)edit       コミット自体の内容を編集。
* (s)squash     直前のpickを指定したコミットに統合。メッセージも統合。
* (f)fixup 	    直前のpickを指定したコミットに統合。メッセージは破棄。

エディタで編集して以下のようにするとすべてのコミットは **コミット1とコミット2はコミット1** に **コミット3とコミット4はコミット3** に統合されます。
```
pick d39e256 コミット1
f a5264f4 コミット2
pick 1acc768 コミット3
f a5264f4 コミット4
```

コミットメッセージを統合するためにエディタが開かれるので以下のようにメッセージを修正します。
```
# This is a combination of 2 commits.
# The first commit's message is:

コミット1とコミット2統合

# This is the 2nd commit message:

コミット3とコミット統合
```

完了したら修正されているか確認しましょう。
```
git log --graph --all --format="%x09%an%x09%h %d %s"
```

### 3. プッシュ
最後に修正したコミットをプッシュします。
※この時に今までの履歴を修正するので強制プッシュする必要がありますが強制プッシュは他にメンバーが居る際にブランチを上書きするので注意してください。
```
git push -f
```

## rebase オプション

### リベースをやめる
リベースをやめる際に以下のコマンドを実行することでリベース前の状態に戻されます。
```
git rebase --abort
```

### コンクリフトの対処
リベースを行った際に以前の他のブランチからマージしたものなども統合するのでコンクリフトが発生することがあります。
その際はコンクリフトを解決してから該当ファイルをインデックスに追加後して以下のコマンドを行ってください。

そうするとリベースが再開されます。
```
git rebase --continue
```

### コンクリフトのスキップ
コンクリフトをスキップしてリベースを続けます。
競合未解決のままでもリベースが続行されます。

また`git rebase --continue` をして `No changes - did you forget to use 'git add` とエラーメッセージが出る時に使います。
これは1つ前のコミットと同様になった変更がない扱いになるのでその際に使います。
```
git rebase --skip
```

## 参考
* <a href="https://www.atlassian.com/ja/git/tutorials/rewriting-history#git-rebase-i" target="_blank" rel="nofollow noopener">git rebase -i | Atlassian Git Tutorial</a>
