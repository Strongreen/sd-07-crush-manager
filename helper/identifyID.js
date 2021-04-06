const fs = require('fs');

const path = `${__dirname}/../crush.json`;
const SUCCESS = 200;
const BAD = 400;
const NOTFOUND = 404;

function identifyID(req, res) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      res.status(BAD).send(err);
    }
    if (data) {
      const filterCrush = JSON.parse(data).find((crush) => crush.id === Number(req.params.id));
      if (!filterCrush) {
        res.status(NOTFOUND).send({ message: 'Crush não encontrado' });
      } else {
        res.status(SUCCESS).send(filterCrush);
      }
    }
  });
}

module.exports = { identifyID };
