const express = require('express');
const route = require('./routes/index');
// const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json());

// const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
// app.get('/', (_request, response) => {
//   response.status(SUCCESS).send();
// });

app.use(express.json());
app.use('/', route);
app.use('/crush', route);
app.use('/crush/:id', route);
app.use('/login', route);

app.listen(PORT, () => { console.log('Online'); });
