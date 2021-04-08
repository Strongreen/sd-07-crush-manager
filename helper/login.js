const {
  validEmail,
  validPassword,
  CreateToken,
} = require('../Validated');

const SUCCESS = 200;

function login(req, res) {
  const { email, password } = req.body;
  validEmail(email, res);
  validPassword(password, res);
  res.status(SUCCESS).send(CreateToken());
}

module.exports = { login };
