const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const helpers = require('./helper/validate');

const app = express();

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { body } = req;

  try {
    const emailIsValid = helpers.validateEmail(body);
    const passwordIsValid = helpers.verifypassword(body);

    if (emailIsValid && passwordIsValid) {
      const token = crypto.randomBytes(8).toString('hex');
      return res.status(200).json({ token });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = app;
