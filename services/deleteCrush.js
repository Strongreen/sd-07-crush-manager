const express = require('express');
const fs = require('fs').promises;
const {
  tokenAuth,
} = require('../validateFunctions.js');

const router = express.Router();

const crushFile = './crush.json';

router.delete('/:id', tokenAuth, async (req, res) => {
  const crushs = await fs.readFile(crushFile);
  const crushsJson = JSON.parse(crushs);
  const deleteId = req.params.id;
  const index = deleteId - 1;
  crushsJson.splice(index, 1);

  try {
    await fs.writeFile(crushFile, JSON.stringify(crushsJson));
    res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
