const express = require('express');
const fs = require('fs').promises;
const {
  tokenAuth,
  nameAuth,
  ageAuth,
  dateAuth,
  dateAuth2,
} = require('../validateFunctions.js');

const router = express.Router();

const crushFile = './crush.json';

router.put(
  '/:id',
  tokenAuth,
  nameAuth,
  ageAuth,
  dateAuth,
  dateAuth2,
  async (req, res) => {
    const { name, age, date } = req.body;
    const crushs = await fs.readFile(crushFile);
    const crushsJson = JSON.parse(crushs);
    const editId = req.params.id;

    crushsJson[editId - 1] = {
      id: Number(editId),
      name,
      age,
      date,
    };
    try {
      await fs.writeFile(crushFile, JSON.stringify(crushsJson));
      res.status(200).json(crushsJson[editId - 1]);
    } catch (error) {
      throw new Error(error);
    }
  },
);

module.exports = router;