const crypto = require('crypto');
const { checkEmail, checkPassword } = require('../services');

const login = (req, res) => {
  const { email, password } = req.body;

  try {
    checkEmail(email);
    checkPassword(password);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  const token = crypto.randomBytes(8).toString('hex');
  res.json({ token });
};

module.exports = { login };
