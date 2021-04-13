const express = require('express');
const fs = require('fs');

const message = require('./messages.json');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = 3000;
const CRUSH = './crush.json';
const ROUTECRUSHID = '/crush/:id';

// const router = express.Router();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// req7
// app.get('/crush/search', (req, res, next) => {
//   const query = req.query.q;
//   const find = `/${query}/i`;
//   // const result = data.map((val) => val).map((v) => Object.values(v).match(find));
//   // console.log('result', result);
//   // console.log('values', values);
//   // const searchObj = (obj, val) => Object.values(obj).map((v) => v.includes(val));
//   // console.log('busca', searchObj(data, find));
//   // if (filtered.length) return res.status(200).send(filtered);
//   // return res.status(404).send(crushNotFound);
//   next();
// });

// Req1
app.get('/crush', (req, res) => {
  const data = JSON.parse(fs.readFileSync(CRUSH, 'utf8'));
  return res.status(SUCCESS).send(data);
});

// req 2
app.get(ROUTECRUSHID, (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(CRUSH, 'utf8'));
  const filtered = data.find((d) => d.id === parseInt(id, 10));
  if (filtered) return res.status(SUCCESS).send(filtered);
  return res.status(404).send(message.error.crushNotFound);
});

// req3
const token = (length) => {
  let tken = '';
  const permitedChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let index = 0; index < length; index += 1) {
    tken += permitedChar.charAt(Math.floor(Math.random() * permitedChar.length));
  }
  return tken;
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const re = /^[^\s@]+@[^\s@]+$/;
  const di = /\d{6}/;
  if (!email) return res.status(400).send(message.error.mustEmail);
  if (!re.test(email)) return res.status(400).send(message.error.formatEmail);
  if (!password) return res.status(400).send(message.error.mustPassword);
  if (!di.test(password)) return res.status(400).send(message.error.formatPassword);
  // req.headers.authorization = token(16);
  return res.status(SUCCESS).send({ token: token(16) });
});

const authMiddleware = (req, res, next) => {
  const ft = /^([0-9a-zA-Z]{16})/;
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send(message.error.noToken);
  if (!ft.test(authorization)) return res.status(401).send(message.error.invalidToken);
  next();
};

app.use(authMiddleware);

const nameMiddleware = (req, res, next) => {
  const { name } = req.body;  
  const minName = /\w{3}/;
  if (!name) return res.status(400).send(message.error.noName);
  if (!minName.test(name)) return res.status(400).send(message.error.minLengtName);
  next();
};

// req6
app.delete(ROUTECRUSHID, async (req, res, next) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(CRUSH, 'utf8'));
  const find = data.find((d) => d.id === parseInt(id, 10));
  const index = data.indexOf(find);
  if (index !== -1) data.splice(index, 1);
  if (index === -1) {
    return res.status(404).send(message.error.crushNotFound);
  }

  try {
    await fs.promises.writeFile(CRUSH, JSON.stringify(data, null, 2));
    res.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    throw new Error(error);
  }
  next();
});

// req4
app.use(nameMiddleware);

const ageMiddleware = (req, res, next) => {
  const { age } = req.body;  
  const minAge = 18;
  if (!age) return res.status(400).send(message.error.noAge);
  if (age < minAge) return res.status(400).send(message.error.mustAboveAge);
  next();
};

app.use(ageMiddleware);

const dateMiddleware = (req, res, next) => {
  const { date } = req.body;
  if (!date) return res.status(400).send(message.error.mustDate);
  if (
    !date.datedAt
    || date.rate === null
    || date.rate === undefined
  ) return res.status(400).send(message.error.mustDate);
  next();
};

app.use(dateMiddleware);

const datedMiddleware = (req, res, next) => {
  const { date } = req.body;  
  const formDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!formDate.test(date.datedAt)) return res.status(400).send(message.error.formatDate);
  next();
};

app.use(datedMiddleware);

const rateMiddleware = (req, res, next) => {
  const { date } = req.body;
  const formRate = /^([1-5]{1})$/;
  if (!formRate.test(date.rate)) return res.status(400).send(message.error.formatRate);
  next();
};

app.use(rateMiddleware);

app.post('/crush', async (req, res) => {
  const { name, age, date } = req.body;  
  const data = JSON.parse(fs.readFileSync(CRUSH, 'utf8'));
  const size = data.length;
  data[size] = {
    id: size + 1,
    name,
    age,
    date,
  };

  try {
    await fs.promises.writeFile(CRUSH, JSON.stringify(data, null, 2));
    res.status(201).send(data[size]);
  } catch (error) {
    throw new Error(error);
  }
});

// req5
app.put(ROUTECRUSHID, async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  
  const data = JSON.parse(fs.readFileSync(CRUSH, 'utf8'));
  if (name) data[id - 1].name = name;
  if (age) data[id - 1].age = age;
  if (date) data[id - 1].date = date;

  try {
    await fs.promises.writeFile(CRUSH, JSON.stringify(data, null, 2));
    res.status(SUCCESS).send(data[id - 1]);
  } catch (error) {
    throw new Error(error);
  }
});

const errorMiddleware = (err, req, res, next) => {
  // console.log(err.stack);
  res.status(500).send({
    message: 'Algo deu Errado :(',
  });
  next();
};

app.use(errorMiddleware); 

app.listen(PORT, () => { console.log(`Online ${PORT}`); });
