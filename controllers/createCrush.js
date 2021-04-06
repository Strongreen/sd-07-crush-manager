const fs = require('fs');

const { getCrushs, validateCrush } = require('../functions');
const { CREATED } = require('../consts');

module.exports = (req, res) => {
  const crush = req.body;
  const { authorization } = req.headers;

  if (validateCrush(crush, authorization, res)) {
    const crushsArray = getCrushs();
    const id = crushsArray.length + 1;
    const newCrush = { id, ...crush };
    const newCrushsArray = [...crushsArray, newCrush];
    fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(newCrushsArray));
    res.status(CREATED).json(newCrush);
  }
};