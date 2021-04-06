const express = require('express');
const fs = require('fs');
const rescue = require('express-rescue');

const { checkedName, checkedAge, checkedDateExists,
  checkedDate, checkedTokenMiddleware } = require('../middlewares');

const router = express.Router();
const SUCCESS_200 = 200;
const NOTFOUND_404 = 404;
const SUCEESS_201 = 201;

router.get('/', (req, res) => {
  try {
      const data = fs.readFileSync(`${__dirname}/../crush.json`, 'utf-8');
      console.log(data);
      if (data.length === 0) return res.status(SUCCESS_200).send([]);

      return res.status(SUCCESS_200).send(JSON.parse(data));
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
      return res.status(NOTFOUND_404).send({ message: 'Crush não encontrado' });
    }
    return res.status(SUCCESS_200).send(crush);
  } catch (error) {
    console.log('ERRO na leitura do arquivo!', error.message);
  }
});

router.use(checkedTokenMiddleware);

router.post(
  '/', checkedName, checkedAge, checkedDateExists, checkedDate, rescue(async (req, res) => {
  try {
    const { name, age, date } = req.body;
    const data = fs.readFileSync(`${__dirname}/../crush.json`, 'utf-8');
    const crush = JSON.parse(data);
    const id = crush.length + 1;
    const newCrush = { name, age, id, date };
    crush.push(newCrush);

    await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(crush));
    res.status(SUCEESS_201).send(newCrush);
  } catch (error) {
    console.log(error);
  }
}),
);

module.exports = router;
