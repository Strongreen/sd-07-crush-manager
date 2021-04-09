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

// Requisito 1
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

// Requisito 2
app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const response = await fs.readFile(path.join(__dirname, './crush.json'));
  const data = JSON.parse(response);
  const data2 = data.filter((element) => element.id === +id)[0];
  try {
    if (!data2) return res.status(404).send({ message: 'Crush não encontrado' });
    res.status(200).send(data2);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
