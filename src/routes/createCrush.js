const express = require('express');
const fs = require('fs').promises;
const middlewares = require('../middlewares');
const crushList = require('../../crush.json');

const router = express.Router();
const { validationsMiddleware, tokenMiddleware } = middlewares;

const size = crushList.length;

router.post('/crush',
  tokenMiddleware,
  validationsMiddleware,
  async (req, res) => {
  crushList[size] = {
    id: size + 1,
    name: req.body.name,
    age: req.body.age,
    date: {
      datedAt: req.body.date.datedAt,
      rate: req.body.date.rate,
    },
  };
  try {
        await fs.writeFile((`${__dirname}/../../crush.json`), JSON.stringify(crushList, null, 2));
        return res.status(201).send(crushList[size]);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;