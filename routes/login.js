const express = require('express');

const router = express.Router();

const middleware = require('../middlewares');
const utils = require('../utils');

const SUCCESS = 200;

const {
  validateEmailMiddleware, 
  validatePasswordMiddleware,  
} = middleware;

router.post('/', validateEmailMiddleware, validatePasswordMiddleware, (request, response) => {
  const token = utils.generateToken();  
  response.status(SUCCESS).send({ token: `${token}` }); 
});

module.exports = router;
