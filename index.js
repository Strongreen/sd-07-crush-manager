const express = require('express');
const bodyParser = require('body-parser');

const {
  createCrush,
  deleteCrush,
  editCrush,
  getAllCrushs,
  getCrushById,
  searchCrush,
  login,
} = require('./routes');

const {
  PORT,
  SUCCESS,
  CRUSH_ID,
} = require('./consts');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getAllCrushs);
app.get('/crush/search', searchCrush);
app.get(CRUSH_ID, getCrushById);
app.post('/login', login);
app.post('/crush', createCrush);
app.put(CRUSH_ID, editCrush);
app.delete(CRUSH_ID, deleteCrush);

app.listen(PORT, () => { console.log('Online'); });
