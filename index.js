const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = "3000";

// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (_request, response) => {
  response.status(SUCCESS).send();
});

app.get("/crush", async (req, res) => {
  const data = await fs.readFile("./crush.json", "utf-8", (err, data) => {
    if (err) {
      console.log(`Não foi possível ler o arquivo. Erro: ${err.message}`);
    }
    return res.status(SUCCESS).send(data);
  });
});

app.listen(PORT, () => {
  console.log("Online");
});
