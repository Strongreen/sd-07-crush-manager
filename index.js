const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;

function gerarToken(tamanhoToken) {
  const caracteres = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789';
  const qtdCaracteres = caracteres.length;
  let token = '';
  for (let i = 1; i <= tamanhoToken; i += 1) {
    const sorteado = Math.floor(Math.random() * qtdCaracteres);
    token += caracteres.charAt(sorteado);
  }
  return token;
}

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// REQUISITO 1
app.get('/crush', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  if (data.length > 0) {
    res.status(200).send(data);
  } else {
    res.status(200).send([]);
  }
});

// REQUISITO 2
app.get('/crush/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 2);
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].id === id) {
      res.status(200).send(data[i]);
      return;
    }
  }
  res.status(404).send({
    message: 'Crush não encontrado',
  });
});

// REQUISITO 3
// app.post('/login', (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const token = gerarToken(16)
//   res.send({
//     token, // CONTINUAR REQUISITO 3 (VALIDAÇÕES DE EMAIL E SENHA)
//   });  
// });

app.listen(3000, () => { console.log('Rodando...'); });
