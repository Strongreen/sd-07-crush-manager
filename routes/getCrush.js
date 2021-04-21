const express = require('express');

const crushRoute = express();

crushRoute.get('/crush', (req, res) => {
  res.status(200).send({
    message: 'Criada a rota crush!',
  });
});

module.exports = crushRoute;