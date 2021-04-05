const express = require('express');

const router = express.Router();
const data = require('../crush.json');

router.get('/', (req, res) => res.status(200).send([...data]));

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