const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const NOTFOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_request, response) => {

  fs.promises.readFile('./crush.json', 'utf-8')
    .then(content => {
      const data = JSON.parse(content)
      response.status(SUCCESS).send(data);
    })
    .catch(error => { console.error(`Erro: ${error.message}`) })
})



app.get('/crush/:id', (request, response) => {
  const { id } = (request.params)
  console.log(typeof (id))
  fs.promises.readFile('./crush.json', 'utf-8')
    .then(content => {
      const data = JSON.parse(content);
      const findCrush = data.find(crush => crush.id === Number(id))
      if (!findCrush) {
        return response.status(NOTFOUND).send({ "message": "Crush não encontrado" })
      } else {
        response.status(SUCCESS).send(findCrush);
      }
    })
    .catch(error => {
      console.error(`Erro: ${error.message}`)
      response.status(NOTFOUND).send({ "message": "Crush não encontrado" })
    })
})


app.listen(PORT, () => { console.log('Online'); });
