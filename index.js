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
  try {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
  } catch (error) {
    return error;
  } 
};

app.get('/crush', async (req, res) => {
  const crushes = await readCrushFile();
  res.status(200).send(crushes);  
});

app.get('/crush/:id', async (req, res) => {
  const crushes = await readCrushFile();
  const { id } = req.params;
  const filteredCrush = crushes.find((crush) => crush.id === Number(id));
  if (!filteredCrush) return res.status(404).send({ message: 'Crush não encontrado' });  
  res.status(200).send(filteredCrush);  
});

app.listen(PORT, () => { console.log('Online'); });
