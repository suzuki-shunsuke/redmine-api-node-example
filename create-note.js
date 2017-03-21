/**
 * noteの投稿(ticketの更新)
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
    body: 'ファイルのcontent !!!',
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


function createNote(issueId, filename, token) {
  const options = {
    url: `${config.base_url}/issues/${issueId}.json`,
    qs: {
      key: config.api_key,
    },
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      issue: {
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
  return createNote(ISSUE_ID, 'test.txt', token);
}).then(response => {
  console.log('success');
}, error => {
  console.log('error');
});
