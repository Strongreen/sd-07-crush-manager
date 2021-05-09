const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const PATH = './crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// readFile Promise
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

// requirement 1
app.get('/crush', (req, res) => {
  promiseReadFile(PATH)
    .then((resolve) => res.status(200).send(resolve))
    .catch(() => res.status(200).send());
});

// requirement 2
app.get('/crush/:id', (req, res) => {
  const { id: idCrush } = req.params;
  promiseReadFile(PATH)
    .then((resolve) => {
      const crush = resolve.find(({ id }) => id === parseInt(idCrush, 10));
      if (!crush) res.status(404).send({ message: 'Crush não encontrado' });
      res.status(200).send(crush);
    })
    .catch(() => res.status(404).send({ message: 'Crush não encontrado' }));
});

app.listen(PORT, () => { console.log('Online'); });
