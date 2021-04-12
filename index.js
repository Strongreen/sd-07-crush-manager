const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const token = { token: '7mqaVRXJSp886CGr' };

const PORT = 3000;
const rota = '/crush/:id';

// MIDDLEWARE DE AUTHORIZATION
const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization !== token.token) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

// MIDDLEWARE DE ERRO
const errorMiddleware = (err, req, res, _next) => {
  res.status(400).json({
    message: err.message,
  });
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(200).send();
});

// FUNÇÕES PARA LER E ESCREVER NO ARQUIVO crush.json
const getData = () => JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
const writeFile = async (content) => fs.writeFileSync('./crush.json', content);

// REQUISITO #1: retornar todos os crushes cadastrados
app.get('/crush', (_req, res) => {
    res.status(200).json(getData());
});

// REQUISITO #7: pesquisa por crushes
// com necessidade de autenticação
app.get('/crush/search', checkToken, async (req, res) => {
  const { q } = req.query;
  const crushes = await getData();
  let filteredCrushes = crushes;

  if (!q) filteredCrushes = crushes;
  else {
    filteredCrushes = crushes.filter((crush) => crush.name.includes(q));
  }

  return res.status(200).json(filteredCrushes);
});

// REQUISITO #2: retornar um crush cadastrado
app.get(rota, (req, res) => {
  const { id: reqId } = req.params;
  const crushes = getData();
  const message = { message: 'Crush não encontrado' };
  const result = crushes.find(({ id: crushId }) => crushId === Number(reqId));
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(404).json(message);
});

// FUNCÕES DE VERIFICAÇÃO DE DADOS
function verifyEmail(email) {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return emailRegex.test(email);
}

function verifyPassword(password) {
  const passwordRegex = /^\d{6,}$/;
  return passwordRegex.test(password);
}

function verifyDateAt(date) {
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  return dateRegex.test(date);
}

// REQUISITO #3: retornar token se usuário for válido
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailIsValid = verifyEmail(email);
  const passwordIsValid = verifyPassword(password);
  
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailIsValid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!passwordIsValid) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json(token);
});

// abaixo requisitos com necessidade de autenticação
app.use(checkToken);

// FUNÇÕES DE VALIDAÇÃO DOS REQUISITOS #4 #5
function nameIsValid(name) {
  if (!name) {
    throw new Error('O campo "name" é obrigatório');
  } else if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
}
function ageIsValid(age) {
  if (!age) {
    throw new Error('O campo "age" é obrigatório');
  } else if (age < 18) {
    throw new Error('O crush deve ser maior de idade');
  }
}
function dateIsValid(date) {
  if (!date || !date.datedAt || date.rate === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
}

function rateIsValid(date) {
  if (date.rate < 1 || date.rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
}

function dateAtIsValid(date) {
  const dateAtTestResult = verifyDateAt(date.datedAt);

  if (!dateAtTestResult) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }
}

function newCrushIsValid(reqCrush) {
  nameIsValid(reqCrush.name);
  ageIsValid(reqCrush.age);
  dateIsValid(reqCrush.date);
  rateIsValid(reqCrush.date);
  dateAtIsValid(reqCrush.date);
}

// REQUISITO #4: criar novo crush
app.post('/crush', async (req, res, next) => {
  const reqCrush = req.body;
  const { name, age, date } = req.body;
 
  try {
    newCrushIsValid(reqCrush);
    const crushes = await getData();
    const addedCrush = { id: crushes.length + 1, name, age, date };
    const newCrush = crushes.concat(addedCrush);
  
    await writeFile(JSON.stringify(newCrush));
  
    res.status(201).json(addedCrush);
  } catch (error) {
    next(error);
  }
});

// REQUISITO #5: atualizar crush
app.put(rota, async (req, res, next) => {
  const reqCrush = req.body;
  const { name, age, date } = req.body;
  
  try {
    newCrushIsValid(reqCrush);
    const { id } = req.params;
    const crushes = await getData();
    const updatedCrush = { name, age, id: +id, date };
    crushes[id - 1] = updatedCrush;
    await writeFile(JSON.stringify(crushes));
  
    res.status(200).json(updatedCrush);
  } catch (error) {
    next(error);
  }
});

// REQUISITO #6: deletar crush
app.delete(rota, async (req, res) => {
  const { id } = req.params;

  const crushData = await getData();
  const filteredCrushes = crushData.filter((crush) => crush.id !== Number(id));

  await writeFile(JSON.stringify(filteredCrushes));

  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

// para tratamento de erros
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
