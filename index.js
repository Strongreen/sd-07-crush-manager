const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = '3000';

const readFile = async () => {
  try {
    const content = await fs.readFile('./crush.json');
    return JSON.parse(content.toString('utf-8'));
  } catch (error) {
    throw new Error("Não foi possível ler o arquivo de dados");
  }
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

/*
+---------------------------------------------------------------------+
|  Requisito 1:                                                       |
+---------------------------------------------------------------------+
| INFORMACOES:                                                        |
|                                                                     |
+---------------------------------------------------------------------+
*/
app.get('/crush', async (_req, res) => {
  try {
    res.status(SUCCESS).json(await readFile());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
+---------------------------------------------------------------------+
|  Requisito 2:                                                       |
+---------------------------------------------------------------------+
| INFORMACOES:                                                        |
|                                                                     |
+---------------------------------------------------------------------+
*/
app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const crushs = await readFile();
    const crush = crushs.find(element => element.id === parseInt(id, 10));
    if (crush) return res.status(SUCCESS).json(crush);
    return res.status(404).json({ message: "Crush não encontrado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
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
  res.status(404).json({ message: "endpoint não existe!" });
});

app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});
/*
=======================================================================
*/

app.listen(PORT, () => { console.log('Online'); });
