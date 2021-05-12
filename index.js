const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { middlewareLogin, writeFile } = require('./middlewares/middlewareLogin');

const fileCrushs = './crush.json';

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// 1
app.get('/crush', (req, res) => {
  const crushs = JSON.parse(fs.readFileSync(fileCrushs), 'utf-8');  
  res.status(SUCCESS).send(crushs);
});

// 2
app.get('/crush/:id', (req, res) => {
  const crushs = JSON.parse(fs.readFileSync(fileCrushs), 'utf-8');  
  const { id } = req.params;
  const crushId = crushs.find((element) => element.id === parseInt(id, 10));

  if (crushId) {
    res.status(SUCCESS).send(crushId);
  }

  res.status(404).send(
    { message: 'Crush não encontrado' },
  );
});

app.get('/crush/search', middlewareLogin, (req, res) => {
  const crushs = JSON.parse(fs.readFileSync(fileCrushs), 'utf-8');
  const { q } = req.query;

  if (q === undefined) {
    return res.status(SUCCESS).send([]);
  } if (q === '') {
    return res.status(SUCCESS).send(crushs);
  }

  const crushContains = crushs.filter((element) => element.name.match(q));

  return res.status(SUCCESS).send(crushContains);
});

app.delete('/crush/:id', middlewareLogin, async (req, res) => { // 7
  const crushs = JSON.parse(fs.readFileSync(fileCrushs), 'utf-8'); 
  const { id } = req.params;
  const newCrushFiltered = crushs.filter((element) => element.id !== parseInt(id, 10));

  await writeFile(newCrushFiltered);

  return res.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => { console.log('Online'); });
