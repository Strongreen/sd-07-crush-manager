const fs = require('fs');

const promiseReadFile = async (path) => {
  const promise = await new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }
      const crushesJson = JSON.parse(data);
      resolve(crushesJson);
    });
  });
  return promise;
};

module.exports = promiseReadFile;
