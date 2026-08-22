---
title: "【FFmpeg】「最新版」ではなく SHA-256 で固定した理由"
date: 2026-08-05T14:17:00+09:00
description: "動画生成環境の再現性を高めるため、FFmpegの取得先・Release・アーカイブ・SHA-256・必要機能を固定した設計と、最新版追従をやめた理由を解説します。"
tags: []
categories: []
draft: false
legacySlug: ffmpeg-sha256-lock
image: "images/thumbnail/video_editor.webp"
---

# 【FFmpeg】「最新版」ではなく SHA-256 で固定した理由

動画生成ツールを開発していると、同じソースコードと同じ入力ファイルを使っているはずなのに、環境を作り直した途端にレンダー結果が変わったり、CIだけ失敗したりすることがあります。

原因の一つが、FFmpegの取得方法です。

開発当初は「FFmpeg 8系を使う」「最新のビルドを取得する」といった指定でも十分に見えます。しかし、継続的に動画を生成する環境では、バージョン番号だけを合わせても再現性を確保できない場合があります。

そこで、動画生成OSSの<a href="https://github.com/c-a-p-engineer/zundamotion" target="_blank" rel="nofollow noopener">ずんだもーしょん</a>では、FFmpegを最新版として取得するのではなく、使用する配布アーカイブをSHA-256まで含めて固定しました。

## 結論

FFmpegを固定した目的は、単に古いバージョンを使い続けるためではありません。

目的は次の3点です。

- 毎回同じFFmpegバイナリを取得する
- 必要なエンコーダーやビルドオプションが含まれていることを検査する
- FFmpegの更新を、暗黙的な変化ではなく明示的な変更作業にする

SHA-256による固定は、この仕組みの一部です。

## 「最新版を取得する」が危険になる理由

最新版を取得する構成には、分かりやすさという利点があります。

```dockerfile
RUN apt-get update \
    && apt-get install -y ffmpeg
```

この方法なら、Dockerイメージのビルド時点で利用可能なFFmpegを簡単に導入できます。

ただし、同じDockerfileを翌月にビルドしたとき、同じバイナリが入る保証はありません。

パッケージリポジトリ側の更新によって、以下が変わる可能性があります。

- FFmpegのバージョン
- パッチレベル
- 依存ライブラリ
- 有効化されているエンコーダー
- configureオプション
- ハードウェアエンコード対応

Dockerfileが変わっていなくても、外部の配布物が変われば、実行環境は変わります。

動画生成では、この差がレンダー速度、利用可能なコーデック、フィルターの挙動、出力結果などに影響します。

## バージョン番号の固定だけでは足りない

次のようにバージョン番号を固定すれば十分に見えるかもしれません。

```text
FFmpeg 8.1.2
```

しかし、FFmpegは同じ公式バージョンでも、配布元やビルド条件によって利用できる機能が異なります。

たとえば、動画生成で使用する可能性がある機能には次のようなものがあります。

- `libx264`
- `libx265`
- `libmp3lame`
- `h264_nvenc`
- `hevc_nvenc`
- `libfreetype`
- `ffnvcodec`

同じ「FFmpeg 8.1.2」と表示されても、これらが有効とは限りません。

そのため、固定する対象を単なるバージョン番号ではなく、配布元、Release、アーカイブ名、ファイル内容まで広げました。

## runtime.lock.jsonで固定している内容

ずんだもーしょんでは、実行環境の情報を`.devcontainer/runtime.lock.json`にまとめています。

FFmpeg部分は次のようになっています。

```json
{
  "ffmpeg": {
    "official_version": "8.1.2",
    "provider": "btbn",
    "release_tag": "autobuild-2026-07-20-14-10",
    "asset": "ffmpeg-n8.1.2-29-g703dcc25b9-linux64-gpl-8.1.tar.xz",
    "sha256": "1beb1d21b4485962baeb2fff4f01e8b91faa6d1017567b07b8f26df1a93cbdfe",
    "expected_version_prefix": "ffmpeg version n8.1.2"
  }
}
```

ここでは次の情報を固定しています。

- FFmpegの公式バージョン
- 配布元
- 固定されたReleaseタグ
- 取得するアーカイブ名
- アーカイブのSHA-256
- 実行時に期待するバージョン文字列

`latest`のような可変タグは使用しません。

## SHA-256で何を確認しているのか

SHA-256は、取得したファイルの内容から計算するハッシュ値です。

ダウンロードしたアーカイブのSHA-256が、事前に記録した値と一致すれば、少なくとも「承認時と同じ内容のファイルを取得した」と判定できます。

Linuxでは次のように確認できます。

```bash
sha256sum ffmpeg-n8.1.2-29-g703dcc25b9-linux64-gpl-8.1.tar.xz
```

PowerShellの場合は次のコマンドです。

```powershell
Get-FileHash \
  -Algorithm SHA256 \
  .\ffmpeg-n8.1.2-29-g703dcc25b9-linux64-gpl-8.1.tar.xz
```

ずんだもーしょんのインストールスクリプトでは、ダウンロードしながらSHA-256を計算しています。

```python
digest = hashlib.sha256()

with urllib.request.urlopen(url, timeout=120) as response, archive.open("wb") as output:
    while chunk := response.read(1024 * 1024):
        digest.update(chunk)
        output.write(chunk)

if digest.hexdigest() != ffmpeg["sha256"]:
    raise LockedFfmpegError("checksum_mismatch")
```

値が一致しなければ、インストールを続行せずに停止します。

なお、SHA-256の一致だけで配布元の正当性まで証明できるわけではありません。信頼する配布元と取得経路を決めたうえで、承認済みファイルと同一かを確認するために使用しています。

## 固定した後に必要な機能を検査する

アーカイブが同じでも、ロックファイルの記述ミスや更新作業の漏れは起こり得ます。

そのため、インストール後にも検査を行います。

### バージョンの確認

```python
version = subprocess.check_output([binary, "-version"], text=True)

if not version.lower().startswith(
    ffmpeg["expected_version_prefix"].lower()
):
    raise LockedFfmpegError("version_mismatch")
```

### 必要なエンコーダーの確認

```json
{
  "required": {
    "encoders": [
      "aac",
      "libx264",
      "libx265",
      "libmp3lame",
      "h264_nvenc",
      "hevc_nvenc"
    ]
  }
}
```

`ffmpeg -encoders`の結果を調べ、必要なエンコーダーが一つでも欠けていればエラーにします。

### configureオプションの確認

```json
{
  "required": {
    "configure_flags": [
      "--enable-libfreetype",
      "--enable-libx264",
      "--enable-libx265",
      "--enable-libmp3lame",
      "--enable-ffnvcodec"
    ]
  }
}
```

`ffmpeg -buildconf`を確認し、必要なビルドオプションが含まれているかも検査します。

つまり、「指定したファイルを取得できた」だけで完了とはせず、「このプロジェクトに必要なFFmpegとして使用できるか」まで確認しています。

## GitHub Actionsでも同じFFmpegを使用する

ローカル環境だけを固定しても、CIが別のFFmpegを使っていたら意味がありません。

GitHub Actionsでも、同じロックファイルとインストールスクリプトを使います。

```yaml
- name: Validate runtime lock before environment setup
  run: python3 scripts/check_runtime_lock.py

- name: Install checksum-locked BtbN FFmpeg
  run: |
    sudo python scripts/install_locked_ffmpeg.py \
      --lock .devcontainer/runtime.lock.json \
      --prefix /opt/ffmpeg
    ffmpeg -version | head -n 1
    ffprobe -version | head -n 1
```

これにより、開発環境とCIで異なるFFmpegが混入する可能性を減らせます。

CIではさらに、FFmpegを使った結合テスト、レンダーのスモークテスト、再現性検証も実行しています。

## SHA-256を固定しても完全な再現性は保証できない

ここは注意が必要です。

FFmpegのアーカイブをSHA-256で固定しても、それだけで動画出力が必ずビット単位で一致するとは限りません。

動画生成結果には、ほかにも次の要素が影響します。

- CPUとGPUの違い
- ハードウェアエンコーダーの種類
- GPUドライバー
- スレッド数
- 入力ファイル
- フォント
- Pythonや依存ライブラリ
- 音声合成エンジン
- ファイルに付加される日時やメタデータ

そのため、実際のロックファイルではFFmpegだけでなく、PythonのDockerイメージ、VOICEVOXのDockerイメージ、フォントのパスなども管理しています。

SHA-256固定は、再現性を構成する一要素です。重要なのは、結果へ影響する可変要素を洗い出し、一つずつ管理対象にすることです。

## 更新しないのではなく、勝手に更新させない

固定運用には欠点もあります。

何もしなければ、セキュリティ修正や新機能は自動的に取り込まれません。

そのため、「一度固定したら永久に変更しない」のではなく、更新手順を明示します。

1. 採用するFFmpegのReleaseとアーカイブを選ぶ
2. アーカイブを取得してSHA-256を計算する
3. `runtime.lock.json`を更新する
4. バージョン、エンコーダー、configureオプションを検査する
5. 結合テストとレンダースモークテストを実行する
6. 出力結果と性能への影響を確認してから反映する

この手順にすると、FFmpegの更新は外部環境によって突然起きるものではなく、レビュー可能な変更になります。

## 最新版を使うべき場面もある

最新版の利用そのものが悪いわけではありません。

次のような場面では、最新版をすぐ試せる構成の方が効率的です。

- 個人の一時的な検証
- 新しいフィルターやコーデックの評価
- 環境を長期間維持しない試作
- 出力の完全な互換性を求めない処理

一方、次のような環境では固定の価値が高くなります。

- CIで動画を生成する
- 複数人が同じ環境を使う
- 長期間継続して成果物を作る
- 過去の不具合を再現する必要がある
- リリース済み成果物の生成条件を説明する必要がある

試作では最新版を使い、採用すると決めた時点で固定する運用も現実的です。

## まとめ

FFmpegをSHA-256で固定した理由は、単にバージョンアップを避けるためではありません。

- 使用する配布物を一意に決める
- ダウンロードしたファイルが承認済みの内容と一致するか確認する
- 必要なエンコーダーとビルドオプションを検査する
- ローカルとCIで同じ導入手順を使う
- 更新を明示的かつレビュー可能な作業にする

「最新版を使う」という指定は簡単ですが、将来も同じ環境を作れるという意味ではありません。

再現性が必要な処理では、バージョン番号だけでなく、実際に使用する配布物と機能まで固定することが重要です。

## 参考

- <a href="https://github.com/BtbN/FFmpeg-Builds/releases" target="_blank" rel="nofollow noopener">BtbN FFmpeg Builds - Releases</a>
- <a href="https://github.com/c-a-p-engineer/zundamotion/blob/master/.devcontainer/runtime.lock.json" target="_blank" rel="nofollow noopener">ずんだもーしょん runtime.lock.json</a>
- <a href="https://github.com/c-a-p-engineer/zundamotion/blob/master/scripts/install_locked_ffmpeg.py" target="_blank" rel="nofollow noopener">FFmpeg固定インストールスクリプト</a>
- <a href="https://github.com/c-a-p-engineer/zundamotion/blob/master/.github/workflows/ci.yml" target="_blank" rel="nofollow noopener">GitHub Actions CI設定</a>
