const {
  validateEmail, 
  validatePassword, 
  generateToken,
} = require('../functions');
const { SUCCESS } = require('../consts');

module.exports = (req, res) => {
  const { email, password } = req.body;
  const tokenLength = 8;

  validateEmail(email, res);
  validatePassword(password, res);

  res.status(SUCCESS).json({ token: generateToken(tokenLength) });
};
