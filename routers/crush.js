const express = require('express');

const router = express.Router();
const fs = require('fs');
const data = require('../crush.json');
const verifyToken = require('../middlewares/verifyToken');
const verifyName = require('../middlewares/verifyName');
const verifyAge = require('../middlewares/verifyAge');
const verifyDate = require('../middlewares/verifyDate');
const verifyDateObj = require('../middlewares/verifyDateObj');

router.get('/', async (req, res) => {
  const response = await fs.promises.readFile(`${__dirname}/../crush.json`, 'utf8');
  return res.status(200).send(JSON.parse(response));
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const object = data.find((value) => value.id === id);
  if (!object) {
 res.status(404).send({
    message: 'Crush não encontrado',
  }); 
}
  return res.status(200).send(object);
});

router.post('/', verifyToken,
                      verifyName, verifyAge, verifyDate, verifyDateObj, async (req, res) => {
    const { name, age, date } = req.body;
    const newObj = {
      id: data.length + 1,
      name,
      age,
      date,
    };
    try {
      data.push(newObj);
      await fs.promises.writeFile('../crush.json', JSON.stringify(newObj));
      return res.status(201).send(newObj);
    } catch (error) {
      throw new Error(error);
    }
});

module.exports = router;