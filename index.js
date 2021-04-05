const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

const crushList = 'crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const crush = await fs.promises.readFile(crushList);
  if (crush) {
    return res.status(200).json(JSON.parse(crush));
  }
  return res.status(200).json([]);
});

app.listen(PORT, () => { console.log('Online'); });
