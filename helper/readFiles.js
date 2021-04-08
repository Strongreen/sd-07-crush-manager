const fs = require('fs');

const BAD = 400;
const SUCCESS = 200;

function readFiles(_req, res) {
  const path = `${__dirname}/../crush.json`;
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
     return res.status(BAD).send(err);
    }
    return res.status(SUCCESS).send(JSON.parse(data));
  });
}

module.exports = { readFiles };
