const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/CrushRoute');

const CrushFile = require('./crush.json');

const Crush = JSON.parse(CrushFile);
const app = express();
app.use(bodyParser.json());

const SUCCESS = 200; 
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
 app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/test', (_request, _response) => {
console.log('test');

console.log(typeof Crush);
console.log(Crush);
});

app.use(express.json());
app.use('/', route);
app.use('/crush', route);
app.use('/crush/:id', route);

app.listen(PORT, () => { console.log(`Aplicaçao rodando na ${PORT}  Online`); });
