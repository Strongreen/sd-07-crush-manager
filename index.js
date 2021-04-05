const express = require('express');
const crypto = require('crypto');
const fs = require('fs').promises;

const caminhoId = '/crush/:id';
const app = express();
const SUCCESS = 200;
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const lerArquivo = async () => {
  const arquivo = await fs.readFile('./crush.json', 'utf-8');
  return JSON.parse(arquivo);
};

const escreverArquivo = async (addAlgo) => {
  await fs.writeFile('crush.json', JSON.stringify(addAlgo));
};

const validaData = (data) => {
  const regex = /(((^0|^1|^2)[0-9])|(^3[0-1]))\/((0[0-9])|(1[0-2]))\/(((19|20)[0-9]{2}$))/gm;
  return regex.test(data);
};

const gerarToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return {
    token,
  };
};

const validaEmail = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

const validaSenha = (senha) => {
  const tamanho = 6;
  if (senha.toString().length >= tamanho) return senha;
};

const condicoesEmail = (req, res) => {
  const { email } = req.body;
  switch (true) {
    case !email:
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    case !validaEmail(email):
      console.log(validaEmail(email));
      return res
        .status(400)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    default:
     break;
}
};

const condicaoPassword = (req, res) => {
  const { password } = req.body;
  switch (true) {
    case !password:
      return res
        .status(400)
        .json({ message: 'O campo "password" é obrigatório' });
    case !validaSenha(password):
      return res
        .status(400)
        .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    default:
      return res.status(200).json(gerarToken());
  }
};

const condicaoNameMiddleware = (req, res, next) => {
  const { name } = req.body;
  switch (true) {
    case !name || name === '':
      return res.status(400).json({
        message: 'O campo "name" é obrigatório',
      });
    case name.length < 3:
      return res.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    default:
      break;
  }
  next();
};

const condicaoAgeMiddleware = (req, res, next) => {
  const age = parseInt(req.body.age, 10);
  switch (true) {
    case !age || age === '':
      return res.status(400).json({
        message: 'O campo "age" é obrigatório',
      });
    case typeof age === 'number' && age < 18:
      return res.status(400).json({
        message: 'O crush deve ser maior de idade',
      });
    default:
      break;
  }
  next();
};

const condicaoDateAtRateMiddleware = (req, res, next) => {
  const { date } = req.body;
  switch (true) {
    case !date || !date.datedAt || (!date.rate && date.rate !== 0):
      return res.status(400).json({
        message:
          'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      });
    default:
      break;
  }
  next();
};

const condicaoDateMiddleware = (req, res, next) => {
  const { date } = req.body;
  switch (true) {
    case date.rate < 1 || date.rate > 5:
      return res
        .status(400)
        .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    case !validaData(date.datedAt):
      return res
        .status(400)
        .send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    default:
      break;
  }
  next();
};

const condicaoAuthMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  switch (true) {
    case !authorization:
      return res.status(401).json({
        message: 'Token não encontrado',
      });
    case authorization.length !== 16:
      return res.status(401).json({
        message: 'Token inválido',
      });
    default:
       break;
  }
  next();
};

const add = async (req, res) => {
  const { name, date } = req.body;
  const age = parseInt(req.body.age, 10);
  const crushJson = await lerArquivo();
  const novoCrush = {
    id: crushJson.length + 1,
    name,
    age,
    date,
  };
  const novoArquivoCrush = [...crushJson, novoCrush];
  await escreverArquivo(novoArquivoCrush);
  return res.status(201).send(novoCrush);
};

app.get('/crush/search', condicaoAuthMiddleware, async (req, res) => {
  const searchTerm = req.query.q;
  const crushJson = await lerArquivo();
  const crushFiltrado = crushJson.filter((item) => item.name.includes(searchTerm));
  switch (true) {
    case !searchTerm:
    return res.status(SUCCESS).send(null);
  default:
    return res.status(SUCCESS).json(crushFiltrado);
  }
});

app.get('/crush', async (req, res) => {
  const crushJson = await lerArquivo();
  if (crushJson) return res.status(SUCCESS).send(crushJson);
  return res.status(SUCCESS).send(null);
});

app.get(caminhoId, async (req, res) => {
  const crushJson = await lerArquivo();
  const { id } = req.params;
  const number = 1;
  const filtroId = crushJson.find((item) => item.id === id * number);
  // nao da para usar o filter porque me retorna um array vazio se nada for encontrado
  // o find me retorna false se nada for encontrado
  switch (true) {
    case !filtroId:
      return res.status(404).json({ message: 'Crush não encontrado' });
    default:
      return res.status(200).send(filtroId);
  }
});

app.post('/login', (req, res) => {
  condicoesEmail(req, res);
  condicaoPassword(req, res);
});

app.delete(caminhoId, condicaoAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const crushJson = await lerArquivo(); 
  const novoArquivoCrush = crushJson.filter((item) => item.id !== parseInt(id, 10));
  await escreverArquivo(novoArquivoCrush);
  return res.status(200).send({ message: 'Crush deletado com sucesso' });
});

app.use(condicaoAuthMiddleware);
app.use(condicaoNameMiddleware);
app.use(condicaoNameMiddleware);
app.use(condicaoAgeMiddleware);
app.use(condicaoDateAtRateMiddleware);
app.use(condicaoDateMiddleware);
app.post('/crush', (req, res) => {
 add(req, res);
});

app.put(caminhoId, async (req, res) => {
  const { name, age, date } = req.body;
  const { id } = req.params;
  const crushJson = await lerArquivo();
  const crushFiltradoId = crushJson.filter((item) => item.id === parseInt(id, 10));
  const novoCrush = { name, age, id: crushFiltradoId[0].id, date };
  return res.status(200).send(novoCrush);

 // const novoArquivoCrush = crushJson.filter((item) => item.id !== parseInt(id, 10));
});

app.listen(3000);
