---
title: "【Terraform】defaultワークスペースを使わせない方法"
date: 2025-08-28T12:30:00+09:00
description: "Terraformでは、デフォルトで default というワークスペースが存在しますが、これは環境を意図せず共有してしまうリスクがあるため、チーム運用では使用を避けたいケースが多いです。"
tags: []
categories: []
draft: false
legacySlug: terraform-default-workspace-not-use
image: "images/thumbnail/Amazon_Web_Services_Logo.svg"
---

# 【Terraform】defaultワークスペースを使わせない方法

Terraformでは、デフォルトで `default` というワークスペースが存在しますが、これは**環境を意図せず共有してしまうリスク**があるため、チーム運用では使用を避けたいケースが多いです。

---

## 📌 問題：default ワークスペースの危険性

Terraformを複数環境（dev/stg/prod）で運用する際、ワークスペースを使って状態ファイルを分離するのが一般的です。

しかし、何も指定しないと `default` ワークスペースが使用されてしまいます。

```bash
$ terraform workspace show
default
```

この状態で `terraform apply` を実行してしまうと、**意図しないリソース操作が発生**する恐れがあります。

---

## ✅ 解決策：`lifecycle.precondition` で明示的にブロック

Terraform v1.2以降では、リソースに対して**前提条件（precondition）**を設定できます。
これを使って、`default` ワークスペースでの操作を**事前に失敗させる**ことが可能です。

### 実装例

```hcl
# default ワークスペースを禁止するダミーリソース
resource "null_resource" "forbid_default_workspace" {
  lifecycle {
    precondition {
      condition     = terraform.workspace != "default"
      error_message = "Workspace 'default' is forbidden. Use a named workspace (dev/stg/prod)."
    }
  }
}
```

### 実行結果（例）

```bash
$ terraform plan

╷
│ Error: Workspace 'default' is forbidden. Use a named workspace (dev/stg/prod).
│
│   with null_resource.forbid_default_workspace,
│   on main.tf line 1, in resource "null_resource" "forbid_default_workspace":
│    1: resource "null_resource" "forbid_default_workspace" {
│
╵
```

---

## 💡 メリット

| 項目                | 内容                         |
| ----------------- | -------------------------- |
| 🔐 安全性            | Plan段階で `default` をブロックできる |
| 🧼 シンプルさ          | ダミーの `null_resource` 1つで完結 |
| ⚙️ 移植性            | どのProviderでも使える汎用的な方法      |
| 🧪 Terraformバージョン | v1.2以降で利用可能（2022年5月リリース）   |


---

## 🔗 関連リンク

- <a href="https://developer.hashicorp.com/terraform/language/state/workspaces" target="_blank" rel="nofollow noopener">Terraform公式ドキュメント：Workspaces</a>
- <a href="https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle#precondition" target="_blank" rel="nofollow noopener">Terraform公式ドキュメント：Resource Lifecycle - precondition</a>
