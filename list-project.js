/**
 * プロジェクトの一覧を取得
 *
 * http://www.redmine.org/projects/redmine/wiki/Rest_Projects
 */

const fs = require('fs');
const path = require('path');
const request = require('request');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8')); 

const options = {
  url: `${config.base_url}/projects.json`,
  qs: {
    key: config.api_key,
    // 関連するトラッカーのリストも取得
    include: ['trackers'].join(','),
  },
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  json: true,
}

function listProject() {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

listProject().then(response => {
  console.log(response.body);
});
