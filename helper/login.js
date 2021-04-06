/** @format */

const crypto = require('crypto');

// const SUCCESS = 200;

function login(_req, _res) {
  const cripito = crypto.randomBytes(16);
  console.log(cripito);
  // res.status(SUCCESS).send(cripito);
}

module.exports = { login };
