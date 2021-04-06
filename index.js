const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const readCrushFile = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};
function tokenGenerate() {
  const rand1 = Math.random().toString(36).substr(2);
  const rand2 = Math.random().toString(36).substr(2);
  const token = rand1 + rand2;
  const token16Characters = token.slice(0, 16);
  return token16Characters;
}
function verifyEmail(email) {
  const reg = /\S+@\S+\.\S+/;
  return reg.test(email);
} 
function verifyPassword(password) {
  const passwordParsed = password.toString();
  const arrayPassword = passwordParsed.split('');
  if (arrayPassword.length < 6) {
   return 0;
  } 
    return 1;
} 

app.get('/crush', async (_req, res) => {
  const result = await readCrushFile();
  if (result.length === 0) res.status(200).send([]);
  return res.status(200).send(result);
});
app.get('/crush/:id', async (req, res) => {
  const result = await readCrushFile();
  const { id } = req.params;
  const crushId = parseInt(id, 10);  
  const filteredCrush = result.find((crush) => crush.id === crushId);
  if (filteredCrush) return res.status(200).send(filteredCrush);
  return res.status(404).send({ message: 'Crush não encontrado' });  
});
app.post('/login', (req, res) => {   
  const { email, password } = req.body;
  if (!email) res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!verifyEmail(email)) {
     res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
 
  if (!password) {    
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
 const resultverifyPassword = verifyPassword(password);

  if (resultverifyPassword === 0) {
    res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).send({ token: tokenGenerate() });
});
app.use((err, _req, res, _next) => 
res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`));

app.listen(PORT, () => { console.log('Online'); });
