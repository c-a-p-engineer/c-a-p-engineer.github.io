---
title: "【Git】 作業ブランチにリベースを使って指定のブランチと最新の状態にマージする"
date: 2022-03-06T05:00:00+09:00
description: "作業ブランチで作業していると元ブランチとずっと枝分かれ状態で履歴が追いにくくなるので作業ブランチと指定のブランチをリベースを使ってマージする方法"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Git
categories: 
- Git
image: images/thumbnail/git.png
libraries:
- mermaid
---

# 【【Git】 作業ブランチにリベースを使って指定のブランチと最新の状態にマージする
作業ブランチで作業していると元ブランチとずっと枝分かれ状態で履歴が追いにくくなるので作業ブランチと指定のブランチをリベースを使ってマージする方法。

例えば現状、古いところから枝分かれしたブランチを最新の状態に付け替えたい時にすることです。
```mermaid
gitGraph:
options
{
    "nodeSpacing": 150,
    "nodeRadius": 10
}
end
commit
branch newbranch
checkout newbranch
commit
checkout master
commit
```

こうしたい。
```mermaid
gitGraph:
options
{
    "nodeSpacing": 150,
    "nodeRadius": 10
}
end
commit
commit
branch newbranch
checkout newbranch
commit
```

## リベースを使ってマージをする

### 1. 前準備
リベース元になる指定ブランチをまずは最新化します。
```
git checkout [指定ブランチ]
git pull
```

### 2. 作業ブランチに切り替える
```
git checkout [作業ブランチ]
```

### 3. 対象のブランチから派生させる
```
git rebase [指定のブランチ]
```

### 4. 競合が発生した場合
競合を解決してインデックスに追加後。
```
git rebase --continue
```

### 5. 確認
完了したら修正されているか確認しましょう。
```
git log --graph --all --format="%x09%an%x09%h %d %s"
```

コミット履歴がこういう風になっていれば成功です。
```mermaid
gitGraph:
options
{
    "nodeSpacing": 150,
    "nodeRadius": 10
}
end
commit
commit
branch newbranch
checkout newbranch
commit
```

### 5. プッシュ
修正したら強制プッシュしてコミット履歴を修正。
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
* <a href="https://www.atlassian.com/ja/git/tutorials/rewriting-history/git-rebase" target="_blank" rel="nofollow noopener">git rebase | Atlassian Git Tutorial</a>
* <a href="https://qiita.com/MG-54/items/ed6d8afac5282591569b" target="_blank" rel="nofollow noopener">【Git】git rebaseで作業ブランチに最新のmasterを持ってくる方法 - Qiita</a>

