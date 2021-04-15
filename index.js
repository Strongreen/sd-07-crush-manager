const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const crush = './crush.json';

// reads content from file crush.json
const readCrushes = async () => {
  try {
    const content = await fs.readFile(crush, 'utf-8');
    return JSON.parse(content);
  }
  catch (error) {
    console.error(`Cannot read file`);
  }
}
// returns an array of all crushes (requirement n1)
app.get('/crush', async(req, res) => {
  const allCrushes = await readCrushes();
  res.status(SUCCESS).send(allCrushes);
});

app.listen(PORT, () => { console.log('Online'); });
