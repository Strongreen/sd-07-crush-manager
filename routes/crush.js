const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;

async function getCrushs() {
  const crushs = await fs.promises.readFile(`${__dirname}/../crush.json`);  
  return JSON.parse(crushs.toString('utf-8'));
}

app.get('/', async (_request, response) => {
  response.status(SUCCESS).send(await getCrushs());
});

module.exports = app;