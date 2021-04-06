/** @format */

const crypto = require('crypto');
const base64url = require('base64url');

const SUCCESS = 200;

function login(_req, res) {
  const cripito = base64url(crypto.randomBytes(16));
  console.log(cripito);
  // res.status(SUCCESS).send(cripito);
}

module.exports = { login };
