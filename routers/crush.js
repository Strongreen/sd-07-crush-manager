const express = require('express');
const fs = require('fs');
const rescue = require('express-rescue');

const router = express.Router();
const SUCCESS = 200;
const NOTFOUND = 404;
const BADREQUESTERROR = 400;

router.get('/', (req, res) => {
  try {
      const data = fs.readFileSync(`${__dirname}/../crush.json`, 'utf-8');
      console.log(data);
      if (data.length === 0) return res.status(SUCCESS).send([]);

      return res.status(SUCCESS).send(JSON.parse(data));
  } catch (error) {
    console.log('ERRO na leitura do arquivo!', error.message);
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync(`${__dirname}/../crush.json`, 'utf-8');
    const crush = JSON.parse(data).find((item) => item.id.toString() === id);
    if (!crush) {
      return res.status(NOTFOUND).send({ message: 'Crush não encontrado' });
    }
    return res.status(SUCCESS).send(crush);
  } catch (error) {
    console.log('ERRO na leitura do arquivo!', error.message);
  }
});

const checkedName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(BADREQUESTERROR).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) { 
    return res.status(BADREQUESTERROR)
    .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

router.post('/', checkedName, rescue(async (req, res) => {
  try {
    const { name, age, date } = req.body;
    const data = fs.readFileSync(`${__dirname}/../crush.json`, 'utf-8');
    const crush = JSON.parse(data);
    crush.push({ name, age, date });
    console.log(crush);
    await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(crush));
    res.status(200).send({ message: 'Novo crush adicionado com sucesso!' });
  } catch (error) {
    console.log(error);
  }
}));

module.exports = router;
