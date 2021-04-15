const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const crushJSON = './crush.json';

// reads content from file crush.json
const readCrushs = async () => {
  try {
    const content = await fs.readFile(crushJSON, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Cannot read file');
  }
};
// returns an array of all crushes (requirement n1)
app.get('/crush', async (req, res) => {
  const allCrushs = await readCrushs();
  res.status(SUCCESS).send(allCrushs);
});

// returns a crush from an id (requirement n2)
app.get('/crush/:id', async (req, res) => {
  const allCrushs = await readCrushs();
  const selectedCrush = allCrushs.find((crush) => crush.id === Number(req.params.id));
  if (selectedCrush) {
    res.status(SUCCESS).send(selectedCrush);
  } else {
    res.status(NOT_FOUND).send({
      message: 'Crush não encontrado',
    });
  }
});

app.listen(PORT, () => { console.log('Online'); });
