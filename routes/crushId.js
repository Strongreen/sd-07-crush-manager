const express = require('express');
const fs = require('fs');
const rescue = require('express-rescue');

const route = express.Router();

route.get('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;

    const content = await fs.promises.readFile(`${__dirname}/../crush.json`);
    const crushesArray = JSON.parse(content);

    const resultCrush = crushesArray.find((crush) => crush.id === Number(id));

    if (!resultCrush) {
      return res.status(404).send({ message: 'Crush não encontrado' });
    }

    res.status(200).json(resultCrush);
  } catch (e) {
    throw new Error(e);
  }
}));

// route.put('/:id', rescue(async (req, res) => {
//   try {
//     const { id } = req.params;
//   } catch (e) {

//   }
// }));

module.exports = route;
