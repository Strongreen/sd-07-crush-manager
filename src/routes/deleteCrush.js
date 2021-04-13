const express = require('express');
const fs = require('fs').promises;
const middlewares = require('../middlewares');
const crushList = require('../../crush.json');

const router = express.Router();
const { tokenMiddleware } = middlewares;

router.delete('/crush/:id',
  tokenMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const index = Number(id - 1);
    crushList.splice(index, 1);
  try {
        await fs.writeFile((`${__dirname}/../../crush.json`), JSON.stringify(crushList, null, 2));
        return res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;