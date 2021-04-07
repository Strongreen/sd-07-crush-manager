const { Router } = require('express');
const authMiddleware = require('../middlewares/authLogin');

const routeLogin = Router();

routeLogin.use(authMiddleware);

routeLogin.post('/', (req, res) => {
  res.send({
    token: '7mqaVRXJSp886CGr',
  });
});

// function genRanHex(size) {
//   return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
// }

// console.log(genRanHex(16));
module.exports = routeLogin;
