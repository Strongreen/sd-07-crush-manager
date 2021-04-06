const fs = require('fs');
const { getCrushs, validateCrush } = require('../functions');
const { SUCCESS } = require('../consts');

module.exports = (req, res) => {
  const crushToEdit = req.body;
  const { authorization } = req.headers;

  if (validateCrush(crushToEdit, authorization, res)) {
    const crushsArray = [...getCrushs()];
    const id = Number(req.params.id);

    const index = crushsArray.findIndex((crush) => crush.id === id);

    crushsArray[index] = { ...crushToEdit, id };

    fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(crushsArray));
    res.status(SUCCESS).json(crushsArray[index]);
  }
};