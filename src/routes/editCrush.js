const express = require('express');
const fs = require('fs').promises;
const middlewares = require('../middlewares');
const crushList = require('../../crush.json');

const router = express.Router();
const { validationsMiddleware, tokenMiddleware } = middlewares;

router.put('/crush/:id',
  tokenMiddleware,
  validationsMiddleware,
  async (req, res) => {
    const { id } = req.params;
  crushList[id - 1] = {
    id: Number(req.params.id),
    name: req.body.name,
    age: req.body.age,
    date: {
      datedAt: req.body.date.datedAt,
      rate: req.body.date.rate,
    },
  };
  try {
        await fs.writeFile((`${__dirname}/../../crush.json`), JSON.stringify(crushList, null, 2));
        return res.status(200).send(crushList[id - 1]);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;