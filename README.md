# Redmine連携(Redmine REST API)

Redmine REST APIを使ったRedmine 連携のサンプルコード。
Node.jsで実装。

## サンプルの動かし方

### 環境

* Node.js 6.7.0

### セットアップ

```
$ npm i
```

設定は config.jsonという設定ファイルで管理していますが、APIキーなども含むため.gitignoreに追加しています。
template.config.jsonというテンプレートをコピーして自分のAPIキーをセットしてください。

```
$ copy template.config.json config.json
$ vim config.json
```

### 実行

```
$ node list-project.js  # プロジェクトの一覧を取得
$ node list-issue.js   # issueの一覧を取得
$ node create-issue.js  # issueの新規作成
$ node create-note.js  # issueの更新(noteの投稿)
```
