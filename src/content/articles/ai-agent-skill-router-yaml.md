---
title: "AIエージェントに全部読ませない。YAMLでSkill Routerを実装する"
date: 2026-09-08T15:33:00+09:00
description: "AIエージェントへ大量のルールを常時読み込ませる代わりに、タスクに応じて必要なSkillだけを選ぶRouterをYAMLで実装する方法を、最小構成のコード付きで整理します。"
tags:
  - AI
  - LLM
  - AIエージェント
  - YAML
  - Python
categories:
  - AI
draft: false
legacySlug: ai-agent-skill-router-yaml
---

# AIエージェントに全部読ませない。YAMLでSkill Routerを実装する

以前、[AIエージェントは「ルールを増やしすぎても」壊れる](/ai-agent-rule-overload/)という記事を書きました。

そこで書いた結論の一つが、

```text
すべてのルールを常時読む
```

のではなく、

```text
今回必要なSkillへRoutingする
```

という構成です。

ただ、これだけでは設計論で終わります。

そこで今回は、**YAMLでSkill Registryを定義し、Pythonで必要なSkillだけ選ぶ最小実装**まで落とします。

## 作るもの

全体像は次のようにします。

```text
ユーザー依頼
   ↓
Task分類
   ↓
Skill Router
   ↓
skills/index.yaml
   ↓
必要なSkillだけ取得
   ↓
LLMへ渡す
```

Repository構成はこれくらいで十分です。

```text
agent/
├─ router.py
└─ skills/
   ├─ index.yaml
   ├─ github.md
   ├─ article-writing.md
   └─ image-generation.md
```

重要なのは、Skill本文を全部promptへ入れないことです。

`index.yaml`は**Skill本文への索引**として使います。

## まずSkill Registryを書く

例えば次のようなYAMLを用意します。

```yaml
skills:
  github:
    path: github.md
    triggers:
      - GitHub
      - repository
      - commit
      - pull request
    provides:
      - repository inspection
      - file changes
      - commit verification

  article-writing:
    path: article-writing.md
    triggers:
      - article
      - blog
      - 記事
      - ブログ
    provides:
      - outline
      - drafting
      - editing

  image-generation:
    path: image-generation.md
    triggers:
      - image
      - illustration
      - 画像
      - イラスト
    provides:
      - prompt design
      - visual verification
```

このYAMLには、Skillの詳細手順を書きません。

詳細は各Markdownへ置きます。

```text
index.yaml = 何があるか
Skill本文 = どう実行するか
```

と責務を分けます。

## 最小RouterをPythonで書く

まずは単純なキーワード一致でも動きます。

```python
from pathlib import Path
import yaml

ROOT = Path(__file__).parent
SKILL_DIR = ROOT / 'skills'


def load_registry():
    with open(SKILL_DIR / 'index.yaml', encoding='utf-8') as f:
        return yaml.safe_load(f)['skills']


def route(message: str):
    registry = load_registry()
    text = message.lower()
    selected = []

    for skill_id, meta in registry.items():
        triggers = [str(x).lower() for x in meta.get('triggers', [])]
        if any(trigger in text for trigger in triggers):
            selected.append(skill_id)

    return selected
```

実行すると、

```python
print(route('GitHubのRepositoryにブログ記事を追加して'))
```

例えば次の結果になります。

```python
['github', 'article-writing']
```

ここで初めて、該当Skill本文を読みます。

## 選ばれたSkillだけロードする

```python
def load_skills(skill_ids):
    registry = load_registry()
    loaded = []

    for skill_id in skill_ids:
        meta = registry[skill_id]
        path = SKILL_DIR / meta['path']
        loaded.append({
            'id': skill_id,
            'content': path.read_text(encoding='utf-8'),
        })

    return loaded
```

これで、

```python
ids = route('GitHubのRepositoryにブログ記事を追加して')
skills = load_skills(ids)
```

とすれば、画像生成Skillなどは読み込まれません。

## なぜindexと本文を分けるのか

全部一つの巨大YAMLにしても動きます。

ただし、それではRouter自身が巨大化します。

例えばSkill本文がそれぞれ数千文字あり、Skillが50個あったとします。

Routerが判断するだけなのに、毎回50個分の詳細手順まで渡すのは本末転倒です。

そこで、Routing時点では高信号な情報だけ残します。

```yaml
triggers:
provides:
path:
```

必要になってから本文を読む構造にします。

## 単純なキーワード一致だけでは足りない

ここまでのコードには弱点があります。

例えば、

```text
GitHubに置いてある画像を記事に使いたい
```

という依頼では、

```text
GitHub
画像
記事
```

の三つが引っかかる可能性があります。

しかし、「画像を生成する」のではなく「既存画像を使う」だけなら、画像生成Skillは不要かもしれません。

つまりRouterには、単語ではなく**タスクの意味**を見る段階が必要です。

## Task Shapeを先に作る

そこで、Routingの前に依頼を小さな構造へ変換します。

```yaml
objective: ブログ記事を追加する
artifact: article
source: GitHub repository
operations:
  - inspect repository
  - write article
  - commit file
image_generation: false
```

この構造を`Task Shape`として扱います。

するとRouter側は、

```text
GitHubという単語があるからgithub Skill
```

ではなく、

```text
repository inspectionが必要だからgithub Skill
```

と判断できます。

## triggersよりcapabilitiesを見る

YAMLも少し進化させます。

```yaml
skills:
  github:
    path: github.md
    capabilities:
      - inspect_repository
      - modify_repository
      - verify_commit

  article-writing:
    path: article-writing.md
    capabilities:
      - design_article
      - draft_article
      - edit_article

  image-generation:
    path: image-generation.md
    capabilities:
      - generate_image
      - edit_image
```

Task Shape側で必要能力を出します。

```yaml
requires:
  - inspect_repository
  - design_article
  - draft_article
  - modify_repository
  - verify_commit
```

Routerは`requires`を満たすSkillを選びます。

## capabilityベースのRouter

```python
def route_by_capabilities(required):
    registry = load_registry()
    required = set(required)
    selected = []

    for skill_id, meta in registry.items():
        capabilities = set(meta.get('capabilities', []))
        if capabilities & required:
            selected.append(skill_id)

    return selected
```

これなら表面的な単語への依存を減らせます。

## Compositionも持たせる

実際のタスクでは、複数Skillがセットで必要になることがあります。

例えばRepository変更なら、

```text
現状確認
↓
変更
↓
検証
```

までが一まとまりです。

そこでCompositionをYAMLへ持たせます。

```yaml
compositions:
  repository_article_change:
    when:
      artifact: article
      operation: repository_change
    skills:
      - github
      - article-writing
      - verification
```

Compositionは便利ですが、増やしすぎると今度はRouter自体がルール地獄になります。

そのため、

- 頻繁に再利用する組み合わせ
- 一つ欠けると失敗しやすい組み合わせ
- 完了条件が共通する組み合わせ

に絞る方が扱いやすいです。

## requiresで依存関係を閉じる

Skill同士に依存がある場合もあります。

```yaml
skills:
  article-writing:
    path: article-writing.md
    requires:
      - source-check
```

この場合、`article-writing`が選ばれたら`source-check`も追加します。

```python
def resolve_dependencies(skill_ids, registry):
    resolved = set(skill_ids)
    pending = list(skill_ids)

    while pending:
        skill_id = pending.pop()
        for required in registry[skill_id].get('requires', []):
            if required not in resolved:
                resolved.add(required)
                pending.append(required)

    return list(resolved)
```

ここで大事なのは、件数で切らないことです。

```text
最大3Skillまで
```

のような制限を入れると、4個目が本当に必要な場合に壊れます。

制限すべきなのは件数ではなく、**今回の成功条件に必要かどうか**です。

## RootルールはRouterの外に置く

Routingできるからといって、すべてをSkillへ落とすべきではありません。

例えば、

```text
実行していないことを完了と報告しない
権限を越えた操作をしない
課金が発生する操作を勝手にしない
```

のようなものは、画像生成でも記事作成でもGitHub操作でも必要です。

これはSkillではなくRootです。

```text
Root
  ↓
Task Shape
  ↓
Router
  ↓
Skill
  ↓
Execution
  ↓
Verification
```

この層を混ぜない方が、後から整理しやすくなります。

## RouterをLLMだけに任せるか

選択肢は大きく三つあります。

### 1. 完全にルールベース

キーワードやcapabilityで決めます。

利点は再現性です。

欠点は曖昧な自然言語に弱いことです。

### 2. LLMに分類させる

LLMへTask Shapeを作らせます。

```json
{
  "artifact": "article",
  "operation": "repository_change",
  "requires": [
    "inspect_repository",
    "draft_article",
    "verify_commit"
  ]
}
```

その結果を決定的なRouterへ渡します。

自然言語への対応力が上がります。

### 3. Hybrid

実運用ではこれが扱いやすいです。

```text
LLM
  ↓
Task Shape生成
  ↓
決定的なRegistry照合
  ↓
Skill選択
```

LLMに「存在しないSkill名」を自由生成させず、**候補の確定はRegistry側**で行います。

## Skillを増やす前に見ること

Skill Routerを作ると、何でもSkill化したくなります。

しかし、これもルール追加と同じ罠があります。

新しいSkillを作る前に、

```text
既存Skillで表現できないか
既存Skillのcapability追加で済まないか
単なるRepository固有ルールではないか
機械的なvalidationにすべきではないか
```

を確認します。

例えば、

```text
このブログの記事はsrc/content/articlesへ置く
```

は汎用Skillではありません。

Repository側の`AGENTS.md`やREADMEに置く情報です。

## Routingした後の検証まで設計する

Routerが正しくても、成果物が正しいとは限りません。

```text
正しいSkillを選んだ
↓
実装に失敗した
```

ということは普通にあります。

そのため最後にVerificationを置きます。

```yaml
completion:
  - required files exist
  - tests pass
  - generated artifact opens
  - external state matches requested state
```

Routerは「何を使うか」を決めるだけです。

完了判定までRouterへ背負わせない方が責務が明確になります。

## 最小構成から始める

最初から巨大なAgent Harnessを作る必要はありません。

まずは、

```text
skills/index.yaml
skills/*.md
router.py
```

だけでも十分です。

さらに必要になったら、

```text
Task Shape
Composition
Dependency resolution
Verification
```

を追加します。

最初から100個のSkillと複雑な優先順位表を作ると、結局「大量のルールを全部読む問題」をRouterの中に再発させます。

## まとめ

Skill Routerの目的は、AIを賢く見せることではありません。

**今回のタスクに不要な判断面を減らすこと**です。

最小構成なら、

```text
1. YAMLでSkill Registryを作る
2. Taskを分類する
3. 必要Skillだけ選ぶ
4. 選ばれた本文だけロードする
5. 最後に成果物を検証する
```

で成立します。

大量のルールを持つこと自体は悪くありません。

問題は、

> **大量のルールを、毎回すべて判断対象にしてしまうこと。**

Skill Routerは、その問題を「プロンプトを削る」だけではなく、**必要な能力へ到達する仕組み**として解決するための一つの実装方法です。
