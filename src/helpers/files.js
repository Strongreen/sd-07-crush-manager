const fs = require('fs');

function readFilePromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, content) => {
      if (err) return reject(err);
      resolve(JSON.parse(content));
    });
  });
}

function writeFilePromisse(fileName, list) {
  return new Promise(() => {
    fs.writeFile(fileName, list);
  });
}

module.exports = { readFilePromise, writeFilePromisse };
