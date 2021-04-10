const express = require('express');
const fs = require('fs').promises;
const {
  tokenAuth,
  nameAuth,
  ageAuth,
  dateAuth,
  dateAuth2,
  emailAuth,
} = require('./validateFunctions.js');
const crushGet = require('./services/getCrush');
const crushPost = require('./services/postCrush');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';
const crushFile = './crush.json';
const crushRoute = '/crush';
const crushRouteId = '/crush/:id';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(crushRoute, crushGet);
app.use(crushRoute, crushPost);

app.post('/login', emailAuth, (req, res) => {
  const { password } = req.body;
  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }
  return res.status(SUCCESS).json({
    token: '7mqaVRXJSp886CGr',
  });
});

app.put(
  crushRouteId,
  tokenAuth,
  nameAuth,
  ageAuth,
  dateAuth,
  dateAuth2,
  async (req, res) => {
    const { name, age, date } = req.body;
    const crushs = await fs.readFile(crushFile);
    const crushsJson = JSON.parse(crushs);
    const editId = req.params.id;

    crushsJson[editId - 1] = {
      id: Number(editId),
      name,
      age,
      date,
    };
    try {
      await fs.writeFile(crushFile, JSON.stringify(crushsJson));
      res.status(200).json(crushsJson[editId - 1]);
    } catch (error) {
      throw new Error(error);
    }
  },
);

app.delete(crushRouteId, tokenAuth, async (req, res) => {
  const crushs = await fs.readFile(crushFile);
  const crushsJson = JSON.parse(crushs);
  const deleteId = req.params.id;
  const index = deleteId - 1;
  crushsJson.splice(index, 1);

  try {
    await fs.writeFile(crushFile, JSON.stringify(crushsJson));
    res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
