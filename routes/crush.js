const express = require('express');
const fs = require('fs').promises;

const app = express();
const SUCCESS = 200;

app.get('/crush', (req, res) => {
  fs.readFile(`${__dirname}/../crush.json`, 'utf-8')
    .then((result) => res.status(SUCCESS).send(JSON.parse(result)))
    .catch((_err) => console.log(_err));
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const data = await JSON.parse(await fs.readFile(`${__dirname}/../crush.json`, 'utf-8'));
  const find = data.find((elem) => parseInt(id, 10) === elem.id);
  if (find) return res.status(SUCCESS).send(find);
  res.status(404).send({
    message: 'Crush não encontrado',
  });
});

module.exports = app;
