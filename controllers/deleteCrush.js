const fs = require('fs');
const { getCrushs, validateToken } = require('../functions');
const { SUCCESS } = require('../consts');

module.exports = (req, res) => {
  const { authorization } = req.headers;
  if (!validateToken(authorization, res)) {
    const crushsArray = [...getCrushs()];
    const id = Number(req.params.id);
    const newCrushsArray = crushsArray.filter((crush) => crush.id !== id);
    fs.writeFileSync(`${__dirname}/../crush.json`, JSON.stringify(newCrushsArray));
    res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
  }
};
