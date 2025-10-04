# リポジトリ共通ガイドライン

## スコープ
この指針はリポジトリ直下の全ディレクトリに適用されます。`blog/` 以下の更新時は、サブディレクトリの `AGENTS.md` も必ず参照してください。

## 全体方針
- Hugo ブログと付随するドキュメント資産を安全かつ確実に運用することを最優先とします。
- 変更は最小限に保ち、既存のビルド/デプロイパイプラインを壊さないことを確認してください。
- コミットメッセージおよび PR タイトル/本文は Conventional Commits 形式を推奨します。

## 作業手順
1. 作業前に `git pull --rebase` で最新化してください。
2. 変更箇所に関連する `AGENTS.md` をすべて読み、指示が矛盾する場合はより深いディレクトリのものを優先します。
3. 変更後は `git status` で差分を確認し、不要な生成物が含まれていないかチェックします。
4. CI やローカルで可能な範囲のテスト・ビルドを実行し、結果を PR に記載してください。

## ブログ記事作成時の依頼対応
- 基本操作
  - 新規記事は `blog/content/ja/tech/YYYY/MM/DD/` 配下に Markdown ファイルとして作成します。`YYYY/MM/DD` は公開予定日で、ファイル名は英小文字+ハイフンの slug を推奨します（例: `blog/content/ja/tech/2024/05/12/my-new-post.md`）。
  - Hugo コマンドを利用する場合は `hugo new --kind post ja/tech/YYYY/MM/DD/<slug>.md` を指定すると雛形が生成されます。生成後に必要な項目を埋めてください。
  - フロントマターは YAML 形式で管理し、最低限 `title`, `date`, `description`, `tags`, `categories`, `thumbnail` を設定します。
- 日時の扱い
  - `date` は ISO 8601 (`YYYY-MM-DDTHH:MM:SS+09:00` など) で JST 基準とします。
  - 公開予約が必要な場合は `publishDate` を併用し、ドラフト中は `draft: true` を指定します。公開時は `draft` を削除または `false` に更新します。
- サムネイル運用
  - サムネイル画像は必ず `blog/static/images/thumbnail/` 内に保存されている既存ファイルまたは新規追加ファイルから選定します。必要に応じてディレクトリを作成できますが、ファイルは 200KB 以内を目安に最適化してください。
  - フロントマターの `thumbnail` には `images/thumbnail/<ファイル名>` の形式で相対パスを指定します（例: `thumbnail: "images/thumbnail/cloud-architecture.png"`）。
  - 画像クレジットが必要な場合は本文末尾に記載し、ライセンス要件を満たすことを確認してください。
- その他のメタ情報
  - 固定ページでない限り `slug` は英小文字+ハイフンを推奨します（多言語 URL 問題を回避）。
  - SNS シェア向け `description` は 120 文字程度を目安とし、要約かつキーワードを含めます。
- ライティングの参考
  - 既存のテックカテゴリ記事（例: `blog/content/ja/tech/2024/03/01/terraform-best-practices.md` など）を読み、見出し構成やコードブロックの書き方を踏襲してください。
  - リンクの書き方（例: `<a href="https://example.com" target="_blank" rel="nofollow noopener">Example.com</a>` リンク先と名前は修正）
  - 以下はサンプルとなるフロントマターと本文の骨子です。必要に応じて調整してください。

    ```markdown
    ---
    title: "クラウド移行で押さえたい 5 つの設計ポイント"
    date: 2024-05-12T09:00:00+09:00
    publishDate: 2024-05-12T09:00:00+09:00
    description: "クラウド移行時に考慮すべきアーキテクチャ設計の要点を、実プロジェクトの知見から整理しました。"
    tags: ["cloud", "architecture", "migration"]
    categories: ["cloud"]
    image: "images/thumbnail/cloud-architecture.png"
    draft: false
    ---

    # クラウド移行で押さえたい 5 つの設計ポイント
    - 背景と課題意識を 2〜3 文でまとめます。

    ## 設計ポイント1: ネットワーク分離
    - 既存記事同様、箇条書きやコードブロックを活用して具体的に説明します。

    ## まとめ
    - 読者がすぐ実践できるチェックポイントで締めます。

    ## 参考文献
    - <a href="https://example.com" target="_blank" rel="nofollow noopener">Example.com</a>

    ```

## レビュー/PR 作成時のチェックリスト
- [ ] `hugo --minify` でビルドが成功するか確認しました。
- [ ] 追加/更新した画像は最適化済みで、パスを実際にプレビューで確認しました。
- [ ] フロントマターの日付・タイムゾーン・ドラフトフラグを見直しました。
- [ ] 外部リンク/埋め込みは有効であり、利用規約に抵触しません。
- [ ] 変更内容を PR の Summary/Testing に明記し、関連 Issue があればリンクしました。

## 連絡事項
- ブログに関する依頼を受けた場合、必要に応じて Hugo バージョンとテーマ (`zzo`) の互換性を確認してください。
- 大規模な構成変更や依存追加が必要な場合は、事前にメンテナから合意を得てください。

