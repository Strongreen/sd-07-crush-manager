const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const CRUSH_ROUTE_ID = '/crush/:id';
const PORT = '3000';

const writeFile = async (data) => {
  try {
    await fs.writeFile('./crush.json', JSON.stringify(data));
  } catch (error) {
    return error;
  }
};

const readFile = async () => {
  try {
    const data = await fs.readFile('./crush.json', 'utf-8');
    const result = await JSON.parse(data);
    return result;
  } catch (error) {
    return error;
  }
};

const addCrush = async (crush) => {
  try {
    const data = await readFile();
    const NEW_ID = data.length + 1;
    const newCrush = { id: NEW_ID, ...crush };
    data.push(newCrush);
    await writeFile(data);
    return newCrush;
  } catch (error) {
    return error;
  }
};

const editCrush = async (crushEdit, idEdit) => {
  try {
    const data = await readFile();
    const crushFind = data.find(({ id }) => id === +idEdit);
    const newCrush = {
      ...crushFind,
      ...crushEdit,
    };
    const crushList = data.filter((crush) => crush.id !== +idEdit);
    crushList.push(newCrush);
    await writeFile(crushList);
    return newCrush;
  } catch (error) {
    return error;
  }
};

const deleteCrush = async (idDelete) => {
  try {
    const data = await readFile();
    const crushList = data.filter((crush) => crush.id !== +idDelete);
    await writeFile(crushList);
    return true;
  } catch (error) {
    return error;
  }
};

const searchCrush = async (term) => {
  try {
    const data = await readFile();
    const crushList = (!term) ? data : data.filter(({ name }) => name.includes(term));
    return crushList;
  } catch (error) {
    return error;
  }
};

const emailVerify = (email) => {
  const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return EMAIL_REGEX.test(email);
};

const passwordVerify = (password) => {
  const PASSWORD_REGEX = /^[0-9]{6,16}$/;
  return PASSWORD_REGEX.test(password);
};

const tokenVerify = (token) => {
  const TOKEN_REGEX = /^[a-zA-Z0-9]{16}$/;
  return TOKEN_REGEX.test(token);
};

const dateVerify = (date) => {
  const DATE_REGEX = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return DATE_REGEX.test(date);
};

const rateVerify = (rate) => (rate > 0 && rate < 6);

const fieldDateVerify = (date) => {
  if (!date) return false;
  const { datedAt, rate } = date;
  if (!datedAt || rate === undefined) return false;
  return true;
};

const tokenGenerator = (length) => {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let index = 0; index < length; index += 1) {
     token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

const authMiddleware = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (token) {
    if (!tokenVerify(token)) {
      res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
    } else {
      next();
    }
  } else {
    res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
};

const bodyVerifyMiddleware = (req, res, next) => {
  const { body: { name, age } } = req;
  if (!name) return res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  if (+age < 18) {
    return res.status(BAD_REQUEST).json({ message: 'O crush deve ser maior de idade' });
  }
  next();
};

const dateVerifyMiddleware = (req, res, next) => {
  const { body: { date } } = req;
  if (!fieldDateVerify(date)) {
    return res.status(BAD_REQUEST)
    .json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  const { datedAt, rate } = date;
  if (!dateVerify(datedAt)) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!rateVerify(rate)) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush/search', authMiddleware, async (req, res) => {
  const { query: { q: term } } = req;
  try {
    const result = await searchCrush(term);
    res.status(SUCCESS).send(result);
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor: ${error}` });
  }
});

app.get('/crush', (_req, res) => {
  readFile()
    .then((content) => res.status(SUCCESS).send(content))
    .catch((error) => res.status(501).json({ message: `Erro interno: ${error}` }));
});

app.get(CRUSH_ROUTE_ID, async (req, res) => {
  const { id: idSearch } = req.params;
  try {
    const data = await readFile();
    const result = data.find((crush) => crush.id === +idSearch);
    if (!result) res.status(404).json({ message: 'Crush não encontrado' });
    res.status(SUCCESS).send(result);
  } catch (error) {
    res.status(500).json({ message: `Erro interno: ${error}` });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  if (!password) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!emailVerify(email)) {
    return res.status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!passwordVerify(password)) {
    return res.status(BAD_REQUEST).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(SUCCESS).json({ token: tokenGenerator(16) });
});

app.post('/crush', authMiddleware, bodyVerifyMiddleware, dateVerifyMiddleware, async (req, res) => {
  const { body } = req;
  try {
    const crush = await addCrush(body);
    res.status(CREATED).send(crush);
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor: ${error}` });
  }
});

app.put(
  CRUSH_ROUTE_ID,
  authMiddleware,
  bodyVerifyMiddleware,
  dateVerifyMiddleware,
  async (req, res) => {
    const { body, params: { id } } = req;
    try {
      const crush = await editCrush(body, id);
      res.status(SUCCESS).send(crush);
    } catch (error) {
      res.status(500).json({ message: `Erro de servidor: ${error}` });
    }
  },
);

app.delete(CRUSH_ROUTE_ID, authMiddleware, async (req, res) => {
  const { params: { id } } = req;
  try {
    if (deleteCrush(id)) res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: `Erro de servidor: ${error}` });
  }
});

app.listen(PORT, () => { console.log('Online'); });
