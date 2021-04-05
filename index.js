const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
const NF = 404;
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
  const obj = { status: NF, response: { message: 'Crush não encontrado' } };
  const content = JSON.parse(fs.readFileSync(`${__dirname}/crush.json`));
  content.forEach((crush) => {
    if (crush.id === Number(id)) {
      obj.status = SUCCESS;
      obj.response = crush;
    }
  });
  response.status(obj.status).json(obj.response);
});

app.listen(PORT, () => { console.log('Online'); });
