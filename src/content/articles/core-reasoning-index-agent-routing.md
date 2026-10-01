---
title: "AIエージェントのSkill Routingを軽くするCore Reasoning Index――再現可能な設計仕様"
date: 2026-10-01T16:00:00+09:00
description: "Skill Registryを正本のまま維持し、compact derived indexで候補探索だけを軽量化する設計を、入力・出力schema、freshness、fallback、CI、Living Roadmapまで再現可能な仕様としてまとめる。"
tags:
  - AI
  - AI Agent
  - Context Engineering
  - Go
  - GitHub Actions
categories:
  - AI
draft: true
legacySlug: core-reasoning-index-agent-routing
---

# AIエージェントのSkill Routingを軽くするCore Reasoning Index――再現可能な設計仕様

AIエージェントへRule、Memory、Skillを追加していくと、ある段階から「知識が足りない」以外の問題が出てきます。

**どの知識を今読むかを決めるための情報自体が大きくなる。**

私は以前、Obsidian Vaultに対して、全文を最初から読む代わりに「小さい索引から候補を絞り、最後は正本へ戻る」Reasoning Indexを作りました。

その発想をAIエージェント自身のSkill Routingへ適用したところ、最終的に次の静的削減を確認できました。

| Routing surface | Canonical | Compact runtime | Reduction |
| --- | ---: | ---: | ---: |
| Skill | 38,533 chars | 10,657 chars | 72.3% |
| Memory | 33,301 chars | 6,678 chars | 79.9% |

これはtoken数やlatencyが同率で改善したという意味ではありません。

確認できたのは、 **runtimeの最初に読むrouting用テキストを小さくできた** ということです。

この記事では、その仕組みを特定のPrivate Repositoryへ依存しない形で再現できるように、設計契約としてまとめます。

## 目的

この設計の目的は、generated indexを新しいデータベースにすることではありません。

次を同時に成立させることです。

1. Skill / Memoryの正規定義は既存のYAMLやMarkdownに残す
2. runtimeの候補探索だけ小さくする
3. candidate確定後は必ず正本へ戻る
4. generated indexが古ければ使用しない
5. ambiguousならfull Registryへfallbackする
6. task-critical Skill本文は、少なくとも初期rolloutでは全文読む
7. CIで派生Indexのfreshnessとサイズを検証する

## 最小Architecture

実装する層は4つです。

| Layer | Responsibility | Authority |
| --- | --- | --- |
| Fast Router | 高頻度で明確なTaskを即決 | policy |
| Compact Routing Index | candidate探索 | derived / non-authoritative |
| Canonical Registry | Skill / Composition / Memoryの正式定義 | canonical |
| Canonical Skill / Memory | 実際の手順・制約・知識 | canonical |

処理順は次です。

1. Taskを受け取る
2. Fast Routerで必要集合が明確ならそのまま進む
3. Fast Routerで閉じなければcompact indexを見る
4. candidate idとcanonical line rangeを得る
5. 正規Registryの該当entryを読む
6. Composition・forced rule・dependencyを含む最終集合を閉じる
7. task-critical Skill本文を読む
8. stale / missing / ambiguous / insufficientならfull Registryへ戻る

最も重要な不変条件はこれです。

> Compact Indexから直接Skillを実行しない。Indexは候補発見までで、正式判断はCanonical Registryへ戻す。

## Canonical input例

`skills.yaml` を正本にします。

```yaml
schema_version: 1

skills:
  repository-change:
    path: skills/repository-change.md
    priority: P0
    triggers:
      - repository change
      - 実装修正
      - 設定変更

  grounded-research:
    path: skills/grounded-research.md
    priority: P0
    triggers:
      - 調査
      - 最新情報
      - 出典

  document-production:
    path: skills/document-production.md
    priority: P1
    triggers:
      - 記事
      - 仕様書
      - 文書作成

composition:
  software-change:
    - repository-change

  article-writing:
    - grounded-research
    - document-production
```

このファイルだけを人間・AIが編集します。

generated JSONは手編集しません。

## Compact runtime schema

runtime向けには、候補探索に必要な情報だけを残します。

```json
{
  "v": 1,
  "authority": "skills.yaml",
  "source_sha256": "...",
  "skill_fields": [
    "id",
    "source_start",
    "source_end",
    "triggers"
  ],
  "skills": [
    [
      "repository-change",
      4,
      10,
      [
        "repository change",
        "実装修正",
        "設定変更"
      ]
    ]
  ],
  "composition_fields": [
    "id",
    "source_start",
    "source_end"
  ],
  "compositions": [
    [
      "software-change",
      28,
      29
    ]
  ]
}
```

tupleにしているのはfield名の反復を避けるためです。

可読性を重視するinspection用には、別のpretty JSONを生成して構いません。

### RuntimeとInspectionを分離する

最初の実装では、runtime catalogに次も入れていました。

- path
- priority
- status
- source metadata
- full Composition membership
- pretty-print whitespace

結果、正規Skill Registry 38,533文字に対してgenerated catalogは27,103文字でした。

約30%減です。

軽くはなりましたが、「first-read index」としては弱い。

そこで責務を分離しました。

```text
canonical source
  -> generator
      -> routing.min.json    # runtime
      -> catalog.json        # inspection
      -> documents.json      # optional heading metadata
```

runtime側をcandidate id・trigger・canonical rangeへ絞ると10,657文字まで下がりました。

ここで得た一般則は、

> Debugに便利な情報とruntimeに必要な情報を同じ派生物へ詰めない。

です。

## Freshness contract

generated indexには、生成元のcontent hashを持たせます。

Git object IDを使っても構いませんが、汎用実装ならSHA-256で十分です。

```go
func sourceSHA256(raw []byte) string {
    sum := sha256.Sum256(raw)
    return hex.EncodeToString(sum[:])
}
```

利用時は現在の正本と比較します。

```text
current canonical hash == generated source hash
    -> candidate routingに利用可能

current canonical hash != generated source hash
    -> generated indexを使わない
    -> canonical Registryへfallback
```

staleなIndexとの差分をLLMへ推測させません。

「古いがたぶん使える」を許すと、最適化層がAuthority化し始めます。

## Canonical line rangeを持たせる理由

Indexに正式pathやComposition memberを全部コピーする代わりに、正規Registry内の行範囲を持たせます。

```json
["article-writing", 31, 33]
```

candidateが`article-writing`なら、31〜33行を正規Registryから読みます。

そこに現在のmember一覧があります。

これで、

- Indexが小さくなる
- 正式定義の二重管理を避けられる
- candidateから正本へ戻る経路が明確になる

という3つを同時に満たせます。

## Generatorの最小アルゴリズム

AIへ実装を依頼する場合、次の擬似仕様で十分に再現できます。

```text
INPUT:
  canonical registry YAML

PARSE:
  skills mapping
  composition mapping

FOR each skill:
  read id
  read triggers
  determine canonical entry start line
  determine end line from next entry
  append [id, start, end, triggers]

FOR each composition:
  determine canonical entry line range
  append [id, start, end]

OUTPUT:
  schema version
  authority path
  source content hash
  tuple field definitions
  sorted skill tuples
  sorted composition tuples

SERIALIZE:
  deterministic order
  minified JSON
```

決定的であることが重要です。

同じcanonical sourceから毎回異なるIndexが出ると、CI差分がnoiseになります。

## Runtime routing contract

candidate selectionは次の三段階にします。

```text
if direct fast route is complete:
    use direct route

else if compact index is fresh
     and candidate is sufficiently clear:
    read canonical candidate entry
    close required Skill set

else:
    read full canonical Registry
```

「sufficiently clear」の条件はHarnessごとに異なります。

最低限、次の場合はfull Registryへ上げた方が安全です。

- 複数candidateが競合する
- 高リスクTask
- forced ruleの有無が結論を変える
- Compositionが複数候補になる
- trigger一致だけではdependency closureを保証できない
- generated indexが存在しない
- source hashが一致しない

## task-critical Skill本文は最初から部分読みにしない

MarkdownのHeading Indexを作ると、Skill本文も必要な節だけ読めそうに見えます。

しかしSkill本文の後半に、

- Safety
- 禁止事項
- verification
- completion criteria
- fallback

がある場合があります。

candidate routingを軽量化できたからといって、Skill本文の部分読みまで同時に導入する必要はありません。

初期rolloutでは、

```text
Skill selection:
  compact

selected task-critical Skill:
  full canonical read
```

に分けます。

section-level loadingは、それ単体でRegressionを取ってから昇格させます。

## CI contract

生成物をRepositoryへ置くなら、少なくとも4種類のcheckを入れます。

### 1. Deterministic regeneration

```bash
go run ./cmd/build-index
git diff --exit-code -- generated/
```

差分が出ればstaleです。

### 2. Source hash match

generated index内のhashと、現在のcanonical sourceを比較します。

### 3. Authority invariant

generated fileの`authority`が正規Registryを指していることを検査します。

### 4. Compactness regression

例えば、

```text
routing.min size < canonical registry size * 0.70
```

のような構造テストを置きます。

70%は普遍値ではありません。

「compact indexを導入したのに、いつの間にか正本と同じ大きさへ戻る」ことを検出するためのRepository固有budgetです。

## Living Roadmapも一緒に持つ

この仕組みは一度作れば終わりではありません。

Host側がSemantic Retrievalを標準提供するようになれば、自作Indexが不要になる可能性があります。

Skill数が10倍になればflat JSONでは足りなくなるかもしれません。

そのため、成長軸には実装Phaseだけでなく再判断条件を持たせます。

```yaml
routing_index:
  status: limited_live

  next_probe:
    representative tasksで旧routingと比較

  promotion_criteria:
    - required skill recallがbaseline以上
    - stale fallbackが成功
    - routing surfaceがmaterialに減る

  demotion_criteria:
    - activation failureが増える
    - maintenance costが利益を上回る

  replan_triggers:
    - Host-native retrievalが改善
    - ModelのContext特性が変化
    - Skill規模が大幅に変化
    - Router schemaが変更
```

これを **Living Roadmap** と呼んでいます。

名前自体が重要なのではありません。

「一度決めたPhaseを完走すること」ではなく、現在のEvidenceとGoalから次のPhaseを再導出できることが重要です。

## 実際にRoadmapを一度壊した

この設計では、初回verbose catalogが27,103文字だった時点でreplan triggerを発火させました。

旧計画なら、

```text
Skill catalog完成
  -> Memoryへ展開
  -> section retrieval
```

と進むところです。

しかし「runtime first-readを十分小さくする」というGoalに対して弱かった。

そこで、

```text
verbose catalogを完成させる
```

を捨て、

```text
runtime index
inspection catalog
```

へ分離しました。

結果が10,657文字です。

**Roadmapを守るより、Goalを守る。**

このルールまで含めて、長期運用できるAgent Harnessになります。

## AIへ渡す再実装プロンプトの要件

別のAIへこの仕組みを再実装させるなら、最低限次を伝えればよいです。

### Required behavior

- canonical Skill RegistryをAuthorityとして維持する
- generated runtime indexはcandidate discovery専用
- Skill tupleはid / canonical range / triggerだけを基本とする
- Compositionはname / canonical rangeだけを基本とする
- generated fileにsource hashを持つ
- stale時はcanonical Registryへfallbackする
- ambiguous時はfull canonical Registryへfallbackする
- selected task-critical Skillは全文読む
- generated indexはdeterministicに生成する
- CIでfreshnessを検証する
- compactness budgetをRegression testする

### Non-goals

- Vector DBの導入
- Embeddingの導入
- generated JSONのAuthority化
- Skill本文の即時section-only化
- Tool-call数だけを目的関数にする
- 全Featureを永久に維持する

### Acceptance criteria

- 同一入力から同一runtime JSONが生成される
- canonical変更後、古いruntime JSONを検出できる
- missing / stale / ambiguous時にcanonical fallbackできる
- candidateからcanonical entryへ戻れる
- required Skill closureをIndexだけで省略しない
- runtime indexが定めたsize budget内にある
- generated artifactを削除してもcanonical sourceから再生成できる

ここまでを契約にしてから、Repository固有のYAML schemaへ合わせれば再現できます。

## いつVector Searchへ進むか

この方式は万能ではありません。

次の条件が強くなるとSemantic Retrievalの価値が上がります。

- Skill数が非常に多い
- trigger語とTask表現の語彙差が大きい
- 同じ概念に多数のaliasがある
- 明確なtaxonomyを維持できない
- cross-domain candidate rankingが必要

その場合も、構造を全部捨てる必要はありません。

```text
Fast Router
  -> structural compact index
  -> semantic ranking
  -> canonical Registry
  -> canonical Skill
```

のようにHybrid化できます。

Semantic Searchを追加しても、最後に正本へ戻る契約は維持できます。

## まとめ

Core Reasoning Indexで解決したかったのは「検索を高度化すること」ではありません。

**正確さを落とさずに、最初に読むものを小さくすること** でした。

そのために、

- runtimeとinspectionを分離する
- generated stateをAuthorityにしない
- source hashでstaleを検出する
- candidateからcanonical rangeへ戻る
- ambiguousならfull Registryへfallbackする
- Roadmap自体をEvidenceで捨てられるようにする

という境界を置きました。

Context Engineeringでは「どれだけ短くしたか」だけでなく、

> **短くした後も、正しい情報へ戻れるか**

を見る方が重要です。

## 関連資料

- Obsidian Vault向けReasoning Index  
  https://zenn.dev/c_a_p_engineer/articles/obsidian-reasoning-index
- SkillをTaskごとに選ぶAgent Harness設計  
  https://zenn.dev/c_a_p_engineer/articles/ai-agent-skill-routing
- Anthropic — Effective context engineering for AI agents  
  https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Anthropic — Equipping agents for the real world with Agent Skills  
  https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- VectifyAI / PageIndex  
  https://github.com/VectifyAI/PageIndex
