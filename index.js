const express = require('express');
const bodyParser = require('body-parser');
const CrushRoute = require('./routes/CrushRoute');

const SUCCESS = 200;
const PORT = '3000';

  const app = express();
    app.use(bodyParser.json());
    
      // não remova esse endpoint, e para o avaliador funcionar
    app.get('/', (_request, response) => {
      response.status(SUCCESS).send();
    });
    app.use('/crush', CrushRoute);
    app.listen(PORT, () => {
      console.log(`Aplicaçao Online rodando na Porta ${PORT}  `);
    });
