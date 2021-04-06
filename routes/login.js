const express = require('express');
const rescue = require('express-rescue');
const generateToken = require('../functions/generateToken');

const route = express.Router();

route.post('/', rescue(async (_req, res) => {
  try {
    const token = generateToken(16);
    return res.status(200).json({ token });
  } catch (e) {
    throw new Error(e);
  }
}));

module.exports = route;