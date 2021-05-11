const fs = require('fs');

module.exports = async (path) => {
  const promise = await new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log('deu ruim');
        reject(err);
      }
      const crushesJson = JSON.parse(data);
      resolve(crushesJson);
    });
  });
  return promise;
};
