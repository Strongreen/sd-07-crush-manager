const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';
const fs = require('fs')


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  const crushList = JSON.parse(fs.readFileSync('./crush.json', 'utf8'))
  if (crushList.length > 0) {
    return res.status(200).json(crushList);  
  }
  if (crushList.lenght === 0) {
    return res.status(200).json([])
  }
})

app.get('/crush/:idtofind', (req, res) => {
  console.log('entrou no :id')

  const { idtofind } = req.params;

  const crushList = JSON.parse(fs.readFileSync('./crush.json', 'utf8'))
  const crushIndex = crushList.findIndex(({ id }) => id == idtofind);
  if (crushIndex === -1) {
    res.status(404).send({"message": "Crush não encontrado"})
  }
  res.send(crushList[crushIndex])
})

app.listen(PORT, () => { console.log('Online'); });
