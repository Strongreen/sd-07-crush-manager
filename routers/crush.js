const express = require('express');
const fs = require('fs');
const rescue = require('express-rescue');
const data = require('../crush.json');

const router = express.Router();
const SUCCESS = 200;
const NOTFOUND = 404;

router.get('/', (req, res) => {
  if (data.length === 0) return res.status(SUCCESS).send([]);
  return res.status(SUCCESS).send(data);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const crush = data.find((item) => item.id.toString() === id);
  if (!crush) {
    return res.status(NOTFOUND).send({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).send(crush);
});

router.post('/', rescue(async (req, res) => {
  try {
    const { name, age, date } = req.body;
    data.push({ name, age, date });
    console.log(data);
    await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
    res.status(200).send({ message: 'Novo crush adicionado com sucesso!' });
  } catch (error) {
    console.log(error);
  }
}));

module.exports = router;
