/**
 * issueを作成
 *
 */

const fs = require('fs');
const path = require('path');
const request = require('request');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8')); 

function uploadFile() {
  const options = {
    url: `${config.base_url}/uploads.json`,
    qs: {
      key: config.api_key,
    },
    body: 'ファイルのcontent',
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream'
    },
    json: true,
  };
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


function createIssue(filename, token, projectId, subject) {
  const options = {
    url: `${config.base_url}/issues.json`,
    qs: {
      key: config.api_key,
    },
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      issue: {
        project_id: projectId,
        subject: subject,
        uploads: [
          {token: token, filename: filename},
        ],
      },
    },
    json: true,
  };
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

uploadFile().then(response => {
  const token = response.body.upload.token;
  return createIssue('test.txt', token, PROJECT_ID, 'Redmine REST API テスト');
}).then(response => {
  console.log('success');
}, error => {
  console.log('error');
});
