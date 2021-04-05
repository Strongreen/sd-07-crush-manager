const express = require('express');
const STATUSCODE = require('../statusCode.json');

const router = express.Router();
router.use(express.json());

router.post('/', (request, response) => {
  const obj = {
    token: '7mqaVRXJSp886CGr',
  };
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  const { email, password } = request.body;
  if (!email) return response.status(STATUSCODE.BAD_REQUEST).json('O campo "email" é obrigatório');
  if (!email.test(email)) {
    return response
      .status(STATUSCODE.BAD_REQUEST)
      .json('O "email" deve ter o formato "email@email.com"');
    }
  response.status(STATUSCODE.SUCCESS).json(obj);
});

module.exports = router;
