const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
// getAllCrushs
app.get('/crush', (_request, response) => {
  const content = JSON.parse(fs.readFileSync(`${__dirname}/crush.json`));
  response.status(SUCCESS).json([...content]);
});
// getCrushById
app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  let obj = null;
  const content = JSON.parse(fs.readFileSync(`${__dirname}/crush.json`));
  content.forEach((crush) => {
    if (crush.id === id) {
      obj = crush;
    }
  });
  if (obj) {
    response.status(SUCCESS).json(obj);
  } else {
    response.status(404).json({ message: 'Crush não encontrado' });
  }
});

app.listen(PORT, () => { console.log('Online'); });
