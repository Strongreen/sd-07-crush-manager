const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  try {
    const response = await fs.readFile(path.join(__dirname, './crush.json'));
    const data = await JSON.parse(response);
    if (response.length === 0) return res.status(200).send([]);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
