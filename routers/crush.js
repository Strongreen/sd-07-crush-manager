const express = require('express');

const router = express.Router();
const fs = require('fs');
const verifyToken = require('../middlewares/verifyToken');
const verifyName = require('../middlewares/verifyName');
const verifyAge = require('../middlewares/verifyAge');
const verifyDate = require('../middlewares/verifyDate');
const verifyDateObj = require('../middlewares/verifyDateObj');

const replaceFile = async (info) => {
  await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(info));
};

router.get('/', async (req, res) => {
  const response = await fs.promises.readFile(`${__dirname}/../crush.json`, 'utf8');
  return res.status(200).send(JSON.parse(response));
});

router.get('/search', verifyToken, async (req, res) => {
  const query = req.query.q;
  const response = JSON.parse(await fs.promises.readFile(`${__dirname}/../crush.json`, 'utf8'));
  const data = response.filter((value) => value.name.toUpperCase().includes(query.toUpperCase()));
  return res.status(200).send(data);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const data = JSON.parse(await fs.promises.readFile(`${__dirname}/../crush.json`, 'utf8'));
  const object = data.find((value) => value.id === id);
  if (!object) {
 return res.status(404).send({
    message: 'Crush não encontrado',
  }); 
}
  return res.status(200).send(object);
});

router.post('/', verifyToken,
                      verifyName, verifyAge, verifyDate, verifyDateObj, async (req, res) => {
    const { name, age, date } = req.body;
    const data = JSON.parse(await fs.promises.readFile(`${__dirname}/../crush.json`, 'utf8'));
    const newObj = {
      id: data.length + 1,
      name,
      age,
      date,
    };
    try {
      data.push(newObj);
      replaceFile(data);
      return res.status(201).send(newObj);
    } catch (error) {
      throw new Error(error);
    }
});

router.put('/:id', verifyToken,
                        verifyName, verifyAge, verifyDate, verifyDateObj, async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  const newObj = {
    id: Number(id),
    name,
    age,
    date,
  };
  try {
    const data = JSON.parse(await fs.promises.readFile(`${__dirname}/../crush.json`, 'utf8'));
    data[id - 1] = newObj;
    await replaceFile(data);
    return res.status(200).send(newObj);
  } catch (error) {
    throw new Error(error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const data = JSON.parse(await fs.promises.readFile(`${__dirname}/../crush.json`, 'utf8'));
    const newData = data.filter((item) => item.id === id);
    replaceFile(newData);
    return res.status(200).send({
      message: 'Crush deletado com sucesso',
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;