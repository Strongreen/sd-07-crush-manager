const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const SUCCESS = 200;
const INVALID_REQUEST = 400;

function handleRequiredField(fieldName) {
  if (fieldName === 'date') {
    return {
      error: true,
      message: `O campo "${fieldName}" é obrigatório e "datedAt" e "rate" não podem ser vazios`,
    };
  }

  return {
    error: true,
    message: `O campo "${fieldName}" é obrigatório`,
  };
}

function testEmail(email, fieldName) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return handleRequiredField(fieldName);

  if (!emailRegex.test(email)) {
    return {
      error: true,
      message: `O "${fieldName}" deve ter o formato "email@email.com"`,
    };
  }

  return { error: false };
}

function testPassword(password, fieldName) {
  if (!password) return handleRequiredField(fieldName);

  if (String(password).length < 6) {
    return {
      error: true,
      message: `O "${fieldName}" deve ter pelo menos 6 caracteres`,
    };
  }
  return { error: false };
}

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const testEmailResult = testEmail(email, 'email');
    if (testEmailResult.error) {
      return res.status(INVALID_REQUEST).json({ message: testEmailResult.message });
    }
    const testPasswordResult = testPassword(password, 'password');
    if (testPasswordResult.error) {
      return res.status(INVALID_REQUEST).json({ message: testPasswordResult.message });
    }

    const token = crypto.randomBytes(8).toString('hex');
    return res.status(SUCCESS).json({ token });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
