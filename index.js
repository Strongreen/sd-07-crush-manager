const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const message = require('./messages.json');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = 3000;

const router = express.Router();

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
  // const array = JSON.parse(data);
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  return res.status(200).send(data);
});

// req 2
const test = (filterResult) => {
  if (filterResult.length) return true;
} 

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  const filtered = data.find((d) => d.id === parseInt(id, 10));
  if (filtered) return res.status(200).send(filtered);
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

const authMiddleware = (req, res, next) => {
  const ft = /^([0-9a-zA-Z]{16})/;
  const { tk16 } = req.headers.authorization;
  if (!ft.test(tk16)) return res.status(401).send(message.error.invalidToken);
  if (!tk16) return res.status(401).send(message.error.noToken);
  next();
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const re = /^[^\s@]+@[^\s@]+$/;
  const di = /\d{6}/;
  if (!email) return res.status(400).send(message.error.mustEmail);
  if (!re.test(email)) return res.status(400).send(message.error.formatEmail);
  if (!password) return res.status(400).send(message.error.mustPassword);
  if (!di.test(password)) return res.status(400).send(message.error.formatPassword);
  return res.status(200).send({ token: token(16) });
});

router.use(authMiddleware);

// // req4
// app.post('/crush', async (req, res) => {
//   // const token = req.headers.authorization;
//   const { Authorization } = req.headers.authorization;
//   const { name, age, date } = req.body;
//   // const { datedAt, rate } = req.body.date;
//   const minName = /\w{3}/;
//   const minAge = 18;
//   const formDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
//   const formRate = /^([0-5]{1})$/;
//   const ft = /^([0-9a-zA-Z]{16})/;

//   if (!ft.test(Authorization)) return res.status(401).send(message.error.invalidToken);
//   if (!Authorization) return res.status(401).send(message.error.noToken);
//   if (!name) return res.status(400).send(message.error.noName);
//   if (!minName.test(name)) return res.status(400).send(message.error.minLengtName);
//   if (!age) return res.status(400).send(message.error.noAge);
//   if (age < minAge) return res.status(400).send(message.error.mustAboveAge);
//   if (!date || !date.datedAt || !date.rate) return res.status(400).send(message.error.mustDate);
//   if (!formDate.test(date.datedAt)) return res.status(400).send(message.error.formatDate);
//   if (!formRate.test(date.rate)) return res.status(400).send(message.error.formatRate);

//   const data = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
//   const size = data.length;
//   data[size] = {
//     id: size + 1,
//     name,
//     age,
//     date,
//   };

//   try {
//     await fs.promises.writeFile('./crush.json', JSON.stringify(data, null, 2));
//     res.status(201).send(data[size]);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// // req5
// app.put('/crush/:id', async (req, res) => {
//   const { id } = req.params;
//   // const token = req.headers.authorization;

//   const { name, age, date } = req.body;
//   // console.log('date', date)
//   const minName = /\w{3}/;
//   const minAge = 18;
//   const formDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
//   const formRate = /^([0-5]{1})$/;

//   if (!name) return res.status(400).send(noName);
//   if (!minName.test(name)) return res.status(400).send(minLengtName);
//   if (!age) return res.status(400).send(noAge);
//   if (age < minAge) return res.status(400).send(mustAboveAge);
//   if (!date || !date.datedAt || !date.rate) return res.status(400).send(mustDate);
//   if (!formDate.test(date.datedAt)) return res.status(400).send(formatDate);
//   if (!formRate.test(date.rate)) return res.status(400).send(formatRate);

//   if (name) data[id - 1].name = name;
//   if (age) data[id - 1].age = age;
//   if (date) data[id - 1].date = date;

//   try {
//     await fs.promises.writeFile('./crush.json', JSON.stringify(data, null, 2));
//     res.status(200).send(data[id - 1]);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// // req6
// app.delete('/crush/:id', async (req, res, next) => {
//   const { id } = req.params;
//   const find = data.find((d) => d.id === parseInt(id, 10));
//   const index = data.indexOf(find);
//   // console.log('filter', find);
//   // console.log('index', index);
//   if (index !== -1) data.splice(index, 1);
//   if (index === -1) {
//     return res.status(404).send(crushNotFound);
//   }

//   try {
//     await fs.promises.writeFile('./crush.json', JSON.stringify(data, null, 2));
//     res.status(200).send({
//       message: 'Crush deletado com sucesso',
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
//   next();
// });

// const errorMiddleware = (err, req, res, next) => {
//   // console.log(err.stack);
//   res.status(500).send({
//     message: 'Algo deu Errado :(',
//   });
//   next();
// };

// app.use(errorMiddleware); 

app.listen(PORT, () => { console.log(`Online ${PORT}`); });
