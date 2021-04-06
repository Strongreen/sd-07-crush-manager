const bodyParser = require('body-parser');
const app = require('./config/custom-express');

app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

/*
+---------------------------------------------------------------------+
|  Requisito: Não faz parte do projeto                                |
+---------------------------------------------------------------------+
| INFORMACOES: Esses use's abaixo foram colocados somente para dar    |
| consistência ao projeto                                             |
+---------------------------------------------------------------------+
*/
app.use('*', (_req, res) => {
  res.status(404).json({ message: 'endpoint não existe!' });
});

app.use((err, req, res, _next) => {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});

app.listen(PORT, () => { console.log('Online'); });
