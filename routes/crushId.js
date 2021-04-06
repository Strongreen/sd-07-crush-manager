const express = require('express');
const fs = require('fs');
const rescue = require('express-rescue');

const {
  auth,
  validateName,
  validateAge,
  dateValidation,
  dateRateMW,
} = require('../middlewares');

const route = express.Router();

route.get(
  '/:id',
  rescue(async (req, res) => {
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
  }),
);

route.put(
  '/:id',
  auth,
  validateName,
  validateAge,
  dateValidation,
  dateRateMW,
  rescue(async (req, res) => {
    try {
      const { id } = req.params;
      const crushInfo = req.body;
      const newCrush = { ...crushInfo, id: Number(id) };
      const content = await fs.promises.readFile(`${__dirname}/../crush.json`);
      const crushesArray = JSON.parse(content);
      const filteredCrushes = crushesArray.filter(
        (crush) => crush.id !== Number(id),
      );
      const newCrushesArray = [...filteredCrushes, newCrush];
      await fs.promises.writeFile(
        `${__dirname}/../crush.json`,
        JSON.stringify(newCrushesArray),
      );
      return res.status(200).json(newCrush);
    } catch (e) {
      throw new Error(e);
    }
  }),
);

route.delete(
  '/:id',
  auth,
  rescue(async (req, res) => {
    const { id } = req.params;

    const content = await fs.promises.readFile(`${__dirname}/../crush.json`);
    const crushesArray = JSON.parse(content);

    const filteredCrushes = crushesArray.filter(
      (crush) => crush.id !== Number(id),
    );

    await fs.promises.writeFile(
      `${__dirname}/../crush.json`,
      JSON.stringify(filteredCrushes),
    );

    return res.status(200).json({
      message: 'Crush deletado com sucesso',
    });
  }),
  );

module.exports = route;
