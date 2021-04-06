const express = require('express');
const authMiddleware = require('../middlewares/authozation');

const app = express();

app.use(authMiddleware);

app.post('/', (req, res) => {
  res.send({
    token: '7mqaVRXJSp886CGr',
  });
});

module.exports = app;
