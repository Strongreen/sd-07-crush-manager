const express = require('express');
const fs = require('fs').promises;
const {
  tokenAuth,
  nameAuth,
  ageAuth,
  dateAuth,
  dateAuth2,
} = require('./validateFunctions.js');

const router = express.Router();

const crushFile = './crush.json';

router.post('/', tokenAuth, nameAuth, ageAuth, dateAuth, dateAuth2, async (req, res) => {
  const { name, age, date } = req.body;
  const crushs = await fs.readFile(crushFile);
  const crushsJson = JSON.parse(crushs);
  const size = crushsJson.length;
  crushsJson[size] = {
    id: `${size + 1}`,
    name,
    age,
    date,
  };
  try {
    await fs.writeFile(crushFile, JSON.stringify(crushsJson));
    res.status(201).json({ id: Number(`${size + 1}`), name, age, date });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
