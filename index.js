const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const readCrushFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

app.get('/crush', async (_req, res) => {
  const result = await readCrushFile();
  if (result.length === 0) res.status(200).send([]);
  res.status(200).send(result);
});
app.get('/crush/:id', async (req, res) => {
  const result = await readCrushFile();
  const { id } = req.params;
  const crushId = parseInt(id, 10);  
  const filteredCrush = result.find((crush) => crush.id === crushId);
  if (filteredCrush) res.status(200).send(filteredCrush);
  res.status(404).send({ message: 'Crush não encontrado' });  
});

app.use((err, _req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(PORT, () => { console.log('Online'); });
