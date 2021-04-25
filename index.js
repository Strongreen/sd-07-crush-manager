const express = require('express');
const fs = require('fs');

const app = express();
const source = './crush.json';
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';
const data = JSON.parse(fs.readFileSync(source, 'utf8'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush/', (req, res) => {
  if (!data.length) return res.status(SUCCESS).send([]);
  return res.status(SUCCESS).send(data);
});

app.get('/crush/:id', (req, res) => {
  const idCrush = parseInt(req.params.id, 10);
  const findCrush = data.find((search) => search.id === idCrush);
  if (findCrush) return res.status(200).send(findCrush);
  return res.status(404).json({ message: 'Crush não encontrado' });
});
  
app.listen(PORT, () => { console.log('Online'); });
