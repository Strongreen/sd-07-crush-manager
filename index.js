const express = require("express");
const bodyParser = require("body-parser");
const crushData = require("./crush.json");
const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = "3000";

// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (_request, response) => {
  response.status(SUCCESS).send();
});

app.get("/crush", (req, res) => {
  if (crushData.length === 0) res.status(200).send([]);
  res.status(200).send(crushData);
});

app.get("/crush/:id", (req, res) => {
  const crush = crushData.find((element) => req.params.id == element.id);
  crush
    ? res.status(200).send(crush)
    : res.status(404).send({
        message: "Crush não encontrado",
      });
});

app.listen(PORT, () => {
  console.log("Online");
});
