const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const dataCrush = require('./crush.json');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

const crushList = 'crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const crush = await fs.promises.readFile(crushList);
  if (crush) {
    return res.status(200).json(JSON.parse(crush));
  }
  return res.status(200).json([]);
});

app.get('/crush/:id', (req, res) => {
  const { id: reqId } = req.params;
  const crushId = dataCrush.find(({ id }) => id === Number(reqId));
  if (crushId) {
    return res.status(200).json(crushId);
  }
  return res.status(404).json({
    message: 'Crush não encontrado',
  });
});

app.get('/crush', (_req, res) => res.status(200).json(dataCrush));

app.listen(PORT, () => { console.log('Online'); });
