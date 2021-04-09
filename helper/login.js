const {
  validEmail,
  validPassword,
  CreateToken,
} = require('../Validated');

const NOTFOUND = 400;
const SUCCESS = 200;

function login(req, res) {
  const { email, password } = req.body;
  try {
    validEmail(email);
    validPassword(password);
    return res.status(SUCCESS).send(CreateToken());
  } catch (error) {
    return res.status(NOTFOUND).send({ message: error.message });
  }
}

module.exports = { login };
