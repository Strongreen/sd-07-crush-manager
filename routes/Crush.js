const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;

// app.get e fs.promises fonte: https://github.com/tryber/sd-07-crush-manager/blob/alexandrefaustino-sd-07-crush-manager/routes/crush.js

async function getAllCrushes() {
  const data = await fs.promises.readFile(`${__dirname}/../crush.json`);
  return JSON.parse(data.toString('utf-8'));
}

app.get('/', async (_request, response) => {
  response.status(SUCCESS).send(await getAllCrushes());
});

module.exports = app;
