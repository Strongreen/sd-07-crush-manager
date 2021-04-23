const express = require('express');
const { login } = require('./src/controllers');
const router = require('./src/routes');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(200).send();
});

app.use(login);
app.use(router.getAllCrush);
app.use(router.getCrushById);
app.use(router.creatCrush);
app.use(router.editCrush);
app.use(router.deletCrush);

app.listen(PORT, () => {
  console.log('Online');
});
