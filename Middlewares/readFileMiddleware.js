const fs = require('fs');

function readFileMiddleware(_req, res) {
  const path = `${__dirname}/../crush.json`;
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
     res.status(400).send(err);
    }
    res.status(200).send(JSON.parse(data));
  });
}

module.exports = readFileMiddleware;
