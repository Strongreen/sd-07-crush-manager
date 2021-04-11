const Express = require('express');
const bodyParser = require('body-parser');

const SUCCESS = 200;
const PORT = '3000';

class index {
  constructor() {
    this.app;
  }

  init() {
    this.app = Express();
    this.app.use(bodyParser.json());

    const CrushRoute = require('./routes/CrushRoute');
    new CrushRoute(this.app);

// não remova esse endpoint, e para o avaliador funcionar
    this.app.get('/', (_request, response) => {
      response.status(SUCCESS).send();
    });
   
    this.app.listen(PORT, () => {
      console.log(`Aplicaçao rodando na ${PORT}  Online`);
    });
  }
}

new index().init();
