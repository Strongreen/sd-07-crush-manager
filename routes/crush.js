const express = require('express');
const fs = require('fs');
const rescue = require('express-rescue');

const route = express.Router();

route.get('/', rescue(async (_req, res) => {
  try {
    const content = await fs.promises.readFile(`${__dirname}/../crush.json`);
    const crushesArray = JSON.parse(content);
    
    return res.status(200).json(crushesArray);
  } catch (e) {
    throw new Error(e);
  }
}));

module.exports = route;
