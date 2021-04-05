const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;
const jsonPath = './crush.json';

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

// function validaToken(token) {
//   let contaNum = 0;
//   let contaChar = 0;
//   for (let i = 0; i < token.length; i += 1) {
//     if (isNaN(parseInt(token.charAt(i)))) {
//       contaNum += 1;
//     } else {
//       contaChar += 1;
//     }
//   }
//   console.log(contaNum + ' ' + contaChar)
// }

function validaNome(name) {
  if (name === '' || name === undefined) {
    throw new Error('O campo "name" é obrigatório');
  } else if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
}

function validaIdade(idade) {
  if (idade === '' || idade === undefined) {
    throw new Error('O campo "age" é obrigatório');
  } else if (idade < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
}

function validaDatedAtIsValid(newCrush) {
  if (newCrush.date.datedAt === '' || newCrush.date.datedAt === undefined) {
    return true;
  }
}

// function validaRateIsValid(newCrus) {
//   if (newCrush.date.rate === '' || newCrush.date.rate === undefined) {
//     return true;
//   } else {
//     return false;
//   }
// }

function validaDate(newCrush) {
  if (
    newCrush.date === undefined
    || validaDatedAtIsValid(newCrush)
    // || validaRateIsValid(newCrush)
    // || newCrush.date.datedAt === ''
    // || newCrush.date.datedAt === undefined
    || newCrush.date.rate === ''
    || newCrush.date.rate === undefined
    ) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
}

function validaDatedAt(datedAt) {
  const formatoValido = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!formatoValido.test(datedAt)) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
}

function validaRate(rate) {
  if (rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// REQUISITO 1
app.get('/crush', (req, res) => {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
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
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
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

function req4validations(newCrush) {
  validaNome(newCrush.name);
  validaIdade(newCrush.age);
  validaDate(newCrush);
  validaDatedAt(newCrush.date.datedAt);
  validaRate(newCrush.date.rate);
}

// REQUISITO 4
app.post('/crush', (req, res) => {
  const newCrush = req.body;
  const token = req.headers.authorization;
  if (token === undefined) {
    res.status(401).send({ message: 'Token não encontrado' });
  } else if (token.length < 16) {
    res.status(401).send({ message: 'Token inválido' });
  }
  req4validations(newCrush);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let lastId = 0;
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].id > lastId) {
      lastId = data[i].id;
    }
  }
  newCrush.id = lastId + 1;
  fs.writeFileSync(jsonPath, JSON.stringify(data.push(newCrush)));
  res.status(201).send(newCrush);
});

/* MIDDLEWARE DE ERRO */
app.use((err, req, res, _next) => {
  res.status(400).json({ message: err.message });
  }); 

app.listen(3000, () => { console.log('Rodando...'); });
