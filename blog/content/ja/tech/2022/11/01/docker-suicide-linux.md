---
title: "【Docker】コマンドを間違うと死ぬ 自殺Linux"
date: 2022-11-01T16:00:00+09:00
description: "コマンドを間違うと rm -rf / を実行して自殺するLinux"
draft: false
enableToc: true
enableTocContent: true
tags: 
- Docker
- Linux
- ネタ
categories: 
- Docker
image: images/thumbnail/docker.png
---

# 【Docker】コマンドを間違うと死ぬ 自殺Linux
コマンドを間違うと `rm -rf /` を実行して自殺するLinux

こちらの GitHub になります。
<a href="https://github.com/tiagoad/suicide-linux" target="_blank" rel="nofollow noopener">tiagoad/suicide-linux</a>

## 遊び方
実行するとDocker内に入ります。
```bash
docker run --rm -it tiagoad/suicide-linux
```

存在しないコマンドを打ってみます。
```bash
$ ll
Oops, looks like you misspelt something >:)
```

これで自殺します。

ちなみにGitHub上の `Running (danger mode)` は絶対にしない方がいいです。
`-v /:/host` でホスト側と繋ぐ設定にしているため失敗するとホスト側のファイルも削除されてしまいます。

コマンドの打ち間違いをしないように勉強するにはとても有用そうです。

### 備考
ちなみに自殺する作り込みは以下の箇所でやっています。
なにかの参考になるかも知れません。
<a href="https://github.com/tiagoad/suicide-linux/blob/master/bash.bashrc" target="_blank" rel="nofollow noopener">bash.bashrc</a>

## 参考
* <a href="https://github.com/tiagoad/suicide-linux" target="_blank" rel="nofollow noopener">tiagoad/suicide-linux</a>
