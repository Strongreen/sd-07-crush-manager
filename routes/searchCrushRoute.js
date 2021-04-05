const express = require('express');
const rescue = require('express-rescue');
const middlewares = require('../middlewares');

const { readFile } = require('../helpers/util');

const router = express.Router();

router.use(middlewares.validateTokenMiddleware);
router.get('/', rescue(async (req, res) => {
  try {
    const { q } = req.query;
    const crushes = await readFile('crush');

    const crushesFiltered = crushes.filter(({ name }) => name.includes(q));

    res.status(200).send(crushesFiltered);
  } catch (error) {
    throw new Error(error);
  }
}));

module.exports = router;
