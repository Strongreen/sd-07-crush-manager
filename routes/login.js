const express = require('express');
const crypto = require('crypto');
const { 
  loginMiddleware: { verifyEmail, verifyPassword, loginMiddleware },
} = require('../middleware');

const router = express.Router();

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

router.use(loginMiddleware);

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const validEmail = verifyEmail(email);
  const validPassword = verifyPassword(password);

  if (validEmail && validPassword) {
    const randomToken = tokenGenerator();
    return res.status(200).json({ token: randomToken });
  }
});

module.exports = router;
