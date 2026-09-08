---
title: "Astro 7 + GitHub Pagesへ移行しても昔のURLを壊さない — legacySlugでURLを固定する"
date: 2026-09-08T15:34:00+09:00
description: "Hugoなど既存ブログからAstro 7へ移行するとき、記事ファイル名やContent CollectionのIDではなくlegacySlugをURLの正本として使い、昔のURLを維持する設計を実例付きで解説します。"
tags:
  - Astro
  - GitHub Pages
  - Markdown
  - SSG
  - 移行
categories:
  - JavaScript
draft: true
legacySlug: astro-legacy-slug-migration
---

# Astro 7 + GitHub Pagesへ移行しても昔のURLを壊さない — legacySlugでURLを固定する

このブログは現在、Astro 7の静的サイトとしてGitHub Pagesへデプロイしています。

ただし、記事自体はAstroで書き始めたものだけではありません。

過去には別の静的サイト構成で公開していた記事があり、それぞれ既にURLを持っていました。

移行時に一番避けたかったのが、

```text
サイトは新しくなった
でも昔の記事URLが全部変わった
```

という状態です。

そこで現在は、記事ファイルの名前やAstro Content CollectionのIDをそのままURLにせず、Front Matterに`legacySlug`を持たせています。

この記事では、このブログで実際に使っている、

```text
Markdown
  ↓
legacySlug
  ↓
getStaticPaths()
  ↓
昔と同じroot-level URL
```

という構成を整理します。

## 先に結論

Astroへ移行するとき、URLと内部ファイル名を同じものとして扱う必要はありません。

例えば記事ファイルが、

```text
src/content/articles/docker-msys-no-pathconv.md
```

でも、公開URLはFront Matterの値から決められます。

```yaml
---
title: "記事タイトル"
legacySlug: docker-msys-no-pathconv
---
```

そして`src/pages/[slug].astro`の`getStaticPaths()`で、

```text
/docker-msys-no-pathconv/
```

を生成します。

この`legacySlug`はAstro標準機能の名前ではありません。

**このブログ側で定義している、URL互換性のための独自フィールド**です。

## なぜファイル名をURLの正本にしないのか

新規サイトだけなら、Markdownのファイル名をそのままURLへ使う構成でも十分です。

例えば、

```text
hello-world.md
```

から、

```text
/articles/hello-world/
```

を作るような構成です。

しかし移行サイトでは事情が変わります。

既に、

```text
/example-old-url/
```

へ検索エンジン、SNS、他サイト、ブックマークなどからリンクされているかもしれません。

移行先の都合だけで、

```text
/articles/2026/example-old-url/
```

へ変えると、過去URLとの互換性が壊れます。

もちろん301 Redirectを用意する方法もあります。

ただ、GitHub Pagesのような純粋な静的ホスティングでは、任意のHTTP Redirectをサーバー設定で自由に扱う構成ではありません。

**最初から同じURLを静的生成できるなら、その方が単純**です。

## このブログの構成

現在のRepositoryでは、記事を次へ置いています。

```text
src/content/articles/
```

AstroはContent Collectionsを使い、Markdownを読み込みます。

公式ドキュメントでも、静的出力でContent Collectionからページを生成する場合、`getCollection()`で記事を取得し、動的ルートの`getStaticPaths()`から生成対象パスを返す構成が説明されています。

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro Routing](https://docs.astro.build/en/guides/routing/)

このブログでは、その`params`へ記事IDではなく`legacySlug`を渡します。

## Front MatterへlegacySlugを持たせる

記事は次のようなFront Matterを持ちます。

```yaml
---
title: "【Docker】Git BashでDockerを実行するときの設定"
date: 2026-05-19T10:30:00+09:00
description: "記事の説明"
tags:
  - Docker
categories:
  - Docker
draft: false
legacySlug: docker-msys-no-pathconv
---
```

ここで重要なのは、

```yaml
legacySlug: docker-msys-no-pathconv
```

です。

このフィールドを、公開URLの正本として扱います。

## Content Collectionのschemaへ追加する

Astro側ではFront Matterをschemaで検証できます。

このブログでは概念的には次のように定義します。

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const article = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/articles',
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    legacySlug: z.string(),
  }),
});
```

こうしておけば、`legacySlug`を書き忘れた記事はbuild時に検出できます。

移行後にURL互換性を維持したいなら、これは重要です。

## [slug].astroでroot-level URLを生成する

現在のブログでは、root直下へ記事URLを生成するために、

```text
src/pages/[slug].astro
```

を使っています。

読みやすく整形すると、中心部分は次のような構造です。

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const entries = await getCollection(
    'articles',
    ({ data }) => !data.draft,
  );

  const seen = new Set<string>();

  return entries.map((entry) => {
    if (seen.has(entry.data.legacySlug)) {
      throw new Error(
        `Duplicate legacy slug: ${entry.data.legacySlug}`,
      );
    }

    seen.add(entry.data.legacySlug);

    return {
      params: {
        slug: entry.data.legacySlug,
      },
      props: {
        entry,
      },
    };
  });
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<BaseLayout
  title={`${entry.data.title} | Copy & Paste Engineer`}
  description={entry.data.description}
>
  <article>
    <h1>{entry.data.title}</h1>
    <Content />
  </article>
</BaseLayout>
```

Astroの静的モードでは、動的ルートで生成するパスを`getStaticPaths()`から返します。

つまり、

```ts
params: {
  slug: entry.data.legacySlug,
}
```

とすれば、ファイル名とは別に公開URLを決められます。

## draftは静的生成対象から外す

移行時に地味に重要だったのが、下書き記事をURL生成しないことです。

```ts
const entries = await getCollection(
  'articles',
  ({ data }) => !data.draft,
);
```

このfilterを入れると、

```yaml
draft: true
```

の記事は`getStaticPaths()`へ入りません。

つまりbuildしても公開ページが生成されません。

## legacySlugの重複はbuild前に止める

URLの正本を独自フィールドへ分離すると、次に問題になるのが重複です。

例えば二つの記事が、

```yaml
legacySlug: docker-example
```

を持ったら、どちらを`/docker-example/`へ出すのか決められません。

そのため、現在のルート生成処理では`Set`を使って重複を検出しています。

```ts
const seen = new Set<string>();

if (seen.has(entry.data.legacySlug)) {
  throw new Error(
    `Duplicate legacy slug: ${entry.data.legacySlug}`,
  );
}

seen.add(entry.data.legacySlug);
```

移行処理でも、同じURLへ複数記事が衝突する場合はエラーにします。

URL互換性を守るなら、

```text
重複していたらどちらか適当に採用する
```

ではなく、**buildを失敗させる**方が安全です。

## 移行スクリプトでlegacySlugを自動生成する

過去記事が数本なら手作業でも構いません。

しかし記事数が多い場合、Front Matterを一つずつ書き換えるのは現実的ではありません。

このブログでは移行スクリプトを用意し、旧記事のパスやslugから`legacySlug`を生成しています。

概念的には次のような処理です。

```python
from pathlib import Path

old_path = 'blog/content/ja/tech/2024/example.md'
slug = Path(old_path).stem.lower()

frontmatter = f'''---
title: "Example"
draft: false
legacySlug: {slug}
---
'''
```

元記事側に明示的なslugがある場合は、ファイル名よりそちらを優先します。

```python
slug = fields.get('slug') or Path(path).stem.lower()
```

ここでの目的は「新サイト向けのきれいなslugを作ること」ではありません。

**旧サイトですでに公開されていたURLを復元すること**です。

## 画像パスも同時に移行する

URLだけ維持できても、本文画像が404では移行成功とは言えません。

旧サイトでは記事相対パスだった画像を、Astro側の公開ディレクトリへ移す必要があります。

例えば、

```markdown
![sample](./images/sample.png)
```

を、

```markdown
![sample](/legacy-assets/example/images/sample.png)
```

のように変換します。

このブログでは、移行した記事固有のassetを`public/legacy-assets/`へ置く構成にしています。

これでMarkdown側からroot-relative pathとして参照できます。

## Hugo shortcodeをそのまま持ち込まない

旧ブログがHugoだった場合、Markdown内にHugo shortcodeが残っている可能性があります。

例えば、

```text
{{< expand "詳細" >}}
```

のような記法です。

Astroへそのまま移しても意味がありません。

そこで移行時に、

- `<details>`へ変換する
- 通常のMarkdownへ変換する
- 対応できないshortcodeが残ったらエラーにする

という処理を入れています。

これはURL互換性とは別問題ですが、**「ファイルを移した」ではなく「公開ページとして成立した」まで確認する**ために必要でした。

## content検証をbuildと分ける

このブログでは、Astro buildの前にcontent専用の検証スクリプトも持っています。

確認しているのは例えば、

```text
Front Matterがあるか
legacySlugがあるか
legacySlugの形式が正しいか
重複していないか
未変換shortcodeが残っていないか
```

です。

Astroのschemaだけでも多くは検証できますが、移行特有の条件は専用スクリプトへ分けた方が分かりやすい場合があります。

実行は次の二段階です。

```bash
npm run verify:content
npm run build
```

これで、

```text
移行データの整合性
↓
Astroとしてbuild可能か
```

を分けて確認できます。

## GitHub PagesへはActionsでdeployする

現在は、Astroで生成した静的ファイルをGitHub ActionsからGitHub Pagesへdeployしています。

GitHubの公式ドキュメントでも、Pagesのcustom workflowでは概ね、

```text
checkout
↓
build
↓
upload-pages-artifact
↓
deploy-pages
```

という流れが案内されています。

- [GitHub Pages - Using custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

Pages設定側では、Build and deploymentのSourceをGitHub Actionsへします。

- [GitHub Pages - Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

URL互換性はAstroの静的生成側で解決し、deploymentは通常のPages workflowへ任せる構成です。

## Redirectより同じURLを生成する方が良いケース

すべての移行で同じURLを維持すべきとは限りません。

URL設計そのものを変更したいなら、Redirectの方が適切なこともあります。

ただし、次の条件なら同じURLを生成する方が単純です。

- 旧URLに問題がない
- root-level URLをそのまま維持できる
- GitHub Pagesの静的構成で完結したい
- 過去記事への外部リンクを壊したくない
- URL変更自体に利用者メリットがない

逆に、

```text
旧URLが不規則すぎる
カテゴリー設計を完全に変える
ドメインも含めて移行する
```

なら、Redirect mapを明示的に設計した方が良いです。

## URLと内部構造を分離すると移行しやすい

今回の設計で一番重要だったのは、

```text
Markdownファイルの保存場所
Astro内部のentry ID
公開URL
```

を同一視しないことでした。

公開URLだけは、互換性契約として`legacySlug`へ固定します。

```text
内部構造は変えてよい
        ↓
URL契約は変えない
```

こうすると、将来記事ファイルを整理しても、公開URLまで連動して変わる事故を避けやすくなります。

## まとめ

Astro 7へブログを移行しても、昔のURLを壊す必要はありません。

このブログでは、

```text
1. Front MatterへlegacySlugを持たせる
2. Content Collectionで必須項目として扱う
3. [slug].astroのgetStaticPaths()へlegacySlugを渡す
4. 重複slugはエラーにする
5. draftは生成対象から外す
6. 画像とshortcodeも移行時に変換する
7. content検証後にAstro buildする
8. GitHub ActionsからPagesへdeployする
```

という構成にしています。

ポイントは、`legacySlug`という名前そのものではありません。

> **公開済みURLを、内部ファイル構造とは別の互換性契約として持つこと。**

静的サイトジェネレータを入れ替えても、URLまで一緒に作り直さなければならないわけではありません。

内部実装は新しくしつつ、外から見える入口だけは維持する。

移行サイトでは、この分離がかなり効きます。
