const express = require('express');

const router = express.Router();
const fs = require('fs');
const data = require('../crush.json');

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

module.exports = router;