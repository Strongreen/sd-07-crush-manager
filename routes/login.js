const express = require('express');
const rescue = require('express-rescue');
const helpers = require('./helpers');

const loginRoute = express.Router();
const {
  tokenGenerator,
  emailValidator,
  passwordValidator,
} = helpers.loginRouteHelper;

const SUCESSS = 200;
const BAD_REQUEST = 400;

loginRoute.post('/', rescue(async (req, res) => {
  try {
    const { email, password } = req.body;
    emailValidator(email);
    passwordValidator(password);
    res.status(SUCESSS).json({ token: tokenGenerator() });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: error.message, // Identificará a mensagem passada do emailValidator. Referência: Luciano Berchon.
    });
  }
}));

module.exports = loginRoute;