const express = require('express');
const crypto = require('crypto');
const validations = require('../validations');

const router = express.Router();

router.use(express.json());

const {
  emailValidate,
  passwordValidate,
} = validations;

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const emailCheck = emailValidate(email);
    const passwordCheck = passwordValidate(password);
    if (emailCheck && passwordCheck) {
      const token = crypto.randomBytes(8).toString('hex');
      return res.status(200).json({ token });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;