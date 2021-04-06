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

route.post('/', rescue(async (req, res) => {
  try {
    const newCrush = req.body;

    const content = await fs.promises.readFile(`${__dirname}/../crush.json`, 'utf-8');
    const crushesArray = JSON.parse(content);
    const newCrushWithId = { ...newCrush, id: crushesArray.length + 1 };

    const newContent = crushesArray.concat([newCrushWithId]);

    await fs.promises.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newContent));

    return res.status(201).json(newCrushWithId);
  } catch (e) {
    throw new Error(e);
  }
}));

module.exports = route;
