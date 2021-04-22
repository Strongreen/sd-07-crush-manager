const express = require('express');
const crushes = require('../../crush.json');

const route = express.Router();

route.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const crushFinded = crushes.find((crush) => crush.id === +id);
  if (!crushFinded) return res.status(404).json({ message: 'Crush não encontrado' });
  return res.status(200).json(JSON.parse(crushFinded));
});

module.exports = route;