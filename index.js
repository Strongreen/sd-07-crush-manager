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

function validarEmail(email) {
  const parseEmail = /\S+@\S+\.\S+/;
  if (email === '' || email === undefined) {
    throw new Error('O campo "email" é obrigatório');
  } else if (parseEmail.test(email) === false) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
}

function validarSenha(password) {
  if (password === '' || password === undefined) {
    throw new Error('O campo "password" é obrigatório');
  } else if (password.toString().length < 6) {
    throw new Error('O "password" deve ter pelo menos 6 caracteres');
  }
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
app.post('/login', (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  validarEmail(email);
  validarSenha(password);
  const token = gerarToken(16);
  res.send({
    token,
  });  
});

/* MIDDLEWARE DE ERRO */
app.use((err, req, res, _next) => {
  res.status(400).json({ message: err.message });
  }); 

app.listen(3000, () => { console.log('Rodando...'); });
