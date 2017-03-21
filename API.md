# Redmine REST API

## issueを作成

http://www.redmine.org/projects/redmine/wiki/Rest_Issues
http://www.redmine.org/projects/redmine/wiki/Rest_api#Attaching-files

REST API でファイル添付出来るのはredmineのバージョン1.4.0以降

1. ファイルをアップロード -> レスポンスにファイルを示すトークンがある
2. チケットを作成 -> リクエストパラメータにファイルを示すトークンを含める

### ファイルアップロード

```
POST /uploads.json
request
  body ファイルのcontent
  Content-type application/octet-stream
response
  {"upload":{"token":"トークン"}}
```

### issueを作成

```
POST /issues.json

{
  "issue": {
    "project_id": "1",
    "subject": "Creating an issue with a uploaded file",
    "uploads": [
      {"token": "トークン", "filename": "image.png", "content_type": "image/png"}
    ]
  }
}
```
