/**
 * 指定したプロジェクトのissueの一覧を取得
 *
 * http://www.redmine.org/projects/redmine/wiki/Rest_Issues
 *
 * API的には以下の項目で絞り込み可能
 * project_id
 * assigned_to_id
 * status_id
 *
 * ソートも可能
 *
 * ページネーションも可能
 * offset
 * limit
 */

const fs = require('fs');
const path = require('path');
const request = require('request');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8')); 

const options = {
  url: `${config.base_url}/issues.json`,
  qs: {
    key: config.api_key,
    project_id: 121
  },
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  json: true,
}

request(options, (error, response, body) => {
  console.log(body);
});
