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
  req.headers.authorization = token(16);
  return res.status(SUCCESS).send({ token: req.headers.authorization });
});

const authMiddleware = (req, res, next) => {
  const ft = /^([0-9a-zA-Z]{16})/;
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send(message.error.noToken);
  if (!ft.test(authorization)) return res.status(401).send(message.error.invalidToken);
  next();
};

// // req4

app.use(authMiddleware);

app.post('/crush', async (req, res) => {
  const { name, age, date } = req.body;
  const minName = /\w{3}/;
  const minAge = 18;
  const formDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  const formRate = /^([0-5]{1})$/;

  if (!name) return res.status(400).send(message.error.noName);
  if (!minName.test(name)) return res.status(400).send(message.error.minLengtName);
  if (!age) return res.status(400).send(message.error.noAge);
  if (age < minAge) return res.status(400).send(message.error.mustAboveAge);
  if (!date || !date.datedAt || !date.rate) return res.status(400).send(message.error.mustDate);
  if (!formDate.test(date.datedAt)) return res.status(400).send(message.error.formatDate);
  if (!formRate.test(date.rate)) return res.status(400).send(message.error.formatRate);

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
  
  const minName = /\w{3}/;
  const minAge = 18;
  const formDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  const formRate = /^([1-5]{1})$/;

  if (!name) return res.status(400).send(message.error.noName);
  if (!minName.test(name)) return res.status(400).send(message.error.minLengtName);
  if (!age) return res.status(400).send(message.error.noAge);
  if (age < minAge) return res.status(400).send(message.error.mustAboveAge);
  if (date && date.rate && !formRate.test(date.rate)) {
    return res.status(400).send(message.error.formatRate);
  }
  if (date && date.datedAt && !formDate.test(date.datedAt)) {
    return res.status(400).send(message.error.formatDate);
  }
  if (!date || (date && (!date.datedAt || !date.rate))) {
    return res.status(400).send(message.error.mustDate);
  }
  // if (!date.datedAt || !date.rate) return res.status(400).send(message.error.mustDate);

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

const errorMiddleware = (err, req, res, next) => {
  // console.log(err.stack);
  res.status(500).send({
    message: 'Algo deu Errado :(',
  });
  next();
};

app.use(errorMiddleware); 

app.listen(PORT, () => { console.log(`Online ${PORT}`); });
