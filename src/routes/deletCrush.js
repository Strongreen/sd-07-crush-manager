const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { tokenMiddleware, dataValidations } = require('../middlewares');

const route = express.Router();

const dataDirectory = path.join(__dirname, '../../crush.json');

route.delete('/crush/:id', tokenMiddleware, dataValidations, async (req, res) => {
  let crushes = await fs.readFile(dataDirectory);
  crushes = JSON.parse(crushes);
  const crush = crushes.find((element) => element.id === +req.body.id);
  const index = crushes.indexOf(crush);
  const result = crushes.slice(index, 1);
  try {
    await fs.writeFile(dataDirectory, JSON.stringify(result));
    return res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = route;