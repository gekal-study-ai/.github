# GitHub運用ポリシー

## Organization

- Organization ownerは最小人数にし、全員が2要素認証またはパスキーを使用する
- 通常作業は個人への直接付与ではなくTeamを介して最小権限で付与する
- 新規リポジトリは原則privateで作成し、公開前に秘密情報、ライセンス、README、セキュリティ設定を確認する
- Organization secretsとrepository secretsを用途別に分け、環境固有の秘密情報はEnvironmentで保護する

## Repository

- デフォルトブランチは`main`とし、直接pushやforce push、削除を禁止する
- 変更はPull Requestで行い、CI成功後に原則squash mergeする
- 作業ブランチはマージ後に自動削除する
- Issue、Wiki、Projects、Discussionsは用途がある場合だけ有効化する
- README、ライセンス、セキュリティポリシー、依存関係更新設定を整備する

## 推奨Ruleset

デフォルトブランチを対象に、次のルールをOrganizationまたは各リポジトリで適用します。

- Pull Requestを必須にする
- 少なくとも1件の承認を必須にする（単独運用で継続不能になる場合は0件とし、CIを必須にする）
- 会話の解決と必須status checkの成功を要求する
- linear historyを要求する
- force pushとブランチ削除を禁止する
- 管理者を恒常的なbypass対象にしない

新しいルールは、既存の開発を止めないことを確認してからActiveにします。

## Actionsとサプライチェーン

- Workflowの`permissions`は原則`contents: read`から始め、jobごとに必要最小限へ追加する
- 外部Actionは完全なcommit SHAへ固定し、Dependabotで更新する
- fork由来Pull Requestへ秘密情報を渡さない
- 依存関係ロックファイルをコミットし、Dependabot alertsとsecurity updatesを有効にする
- secret scanningとpush protectionを利用可能な全リポジトリで有効にする

## 定期確認

四半期ごと、またはメンバー・公開範囲・主要依存関係が変わったときに次を確認します。

- owner、member、outside collaborator、Team権限
- Ruleset、Actions policy、secrets、deploy key、GitHub App
- Dependabot、secret scanning、code scanningのアラート
- 使用していないリポジトリ、ブランチ、Environment、成果物
