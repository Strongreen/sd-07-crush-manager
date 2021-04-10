const express = require('express');
const fs = require('fs');

const {
  validateToken,
} = require('../middlewares');

const { SUCCESS } = require('../statusCode.json');

const DATAPATH = `${__dirname}/../crush.json`;

const router = express.Router();
router.use(express.json());

router.use(validateToken);

router.get('/', (request, response) => {
  const crushes = fs.readFileSync(DATAPATH);
  const { q } = request.query;
  
  const foundCrushes = JSON.parse(crushes)
    .filter(({ name }) => name.includes(q));
  response.status(SUCCESS).json(foundCrushes);
});

module.exports = router;
