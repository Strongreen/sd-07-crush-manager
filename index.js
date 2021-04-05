const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const crushPath = '/crush';

const app = express();
const SUCCESS = 200;

const { ApiMessages, ApiStatus } = require('./enums');

const { 
    loginMiddleWare,
    authMiddleWare,
    crushInfoMiddleWare,
    dateInfoMiddleWare,
    dateRegexMiddleWare } = require('./middleware');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get(`${crushPath}`, (_req, res) => {
  const oldContent = fs.readFileSync(`${__dirname}/crush.json`);
  if (oldContent.length !== 0) res.status(ApiStatus.SUCCESS).json(JSON.parse(oldContent));
  else res.status(ApiStatus.SUCCESS).send([]);
});

app.get(`${crushPath}/search`, authMiddleWare, (req, res) => {
  const oldContent = fs.readFileSync(`${__dirname}/crush.json`);
  const { q } = req.query;

  const filtered = JSON.parse(oldContent).filter((crush) => crush.name.includes(q));

  if (!q) res.status(ApiStatus.SUCCESS).json(JSON.parse(oldContent));
  else if (filtered.length === 0) res.status(ApiStatus.SUCCESS).json([]);
  else {
    res.status(ApiStatus.SUCCESS).json(filtered);
  }
});

app.get(`${crushPath}/:id`, (req, res) => {
  const { id } = req.params;
  const content = fs.readFileSync(`${__dirname}/crush.json`);
  const data = JSON.parse(content);
  const found = data.find((crush) => crush.id === parseInt(id, 10));

  if (found) res.status(ApiStatus.SUCCESS).json(found);
  else res.status(ApiStatus.NOT_FOUND).json({ message: ApiMessages.CRUSH_NOT_FOUND });
});

app.post('/login', loginMiddleWare, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(ApiStatus.SUCCESS).json({ token });
});

app.delete(`${crushPath}/:id`, authMiddleWare, (req, res) => {
  const oldContent = fs.readFileSync(`${__dirname}/crush.json`);
  const { id } = req.params;

  const filtered = JSON.parse(oldContent).filter((crush) => crush.id !== parseInt(id, 10));

  fs.writeFileSync(`${__dirname}/crush.json`, JSON.stringify(filtered));
  res.status(ApiStatus.SUCCESS).json({ message: ApiMessages.CRUSH_DELETED });
});

app.use(authMiddleWare);
app.use(crushInfoMiddleWare);
app.use(dateInfoMiddleWare);
app.use(dateRegexMiddleWare);

app.post(`${crushPath}`, (req, res) => {
  const oldContent = fs.readFileSync(`${__dirname}/crush.json`);
  const idx = JSON.parse(oldContent).length;

  const newData = [...JSON.parse(oldContent), { ...req.body, id: idx + 1 }];
  fs.writeFileSync(`${__dirname}/crush.json`, JSON.stringify(newData));
  res.status(ApiStatus.SUCCESS_CREATED).json({ ...req.body, id: idx + 1 });
});

app.put(`${crushPath}/:id`, (req, res) => {
  const oldContent = fs.readFileSync(`${__dirname}/crush.json`);
  const { id } = req.params;

  const filtered = JSON.parse(oldContent).filter((crush) => crush.id !== parseInt(id, 10));

  const newData = [...filtered, { ...req.body, id: parseInt(id, 10) }];
  fs.writeFileSync(`${__dirname}/crush.json`, JSON.stringify(newData));
  res.status(ApiStatus.SUCCESS).json({ ...req.body, id: parseInt(id, 10) });
});

app.listen(3000, () => {
  console.log('listening...');
});
