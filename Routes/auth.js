const express = require("express");

const router = express.Router();

router.use(express.json());

function validateEmailPassword(value) {
  //   console.log(value);
  const { email, password } = value;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
  let token = "";
    if (!email) {
    return {
      message: 'O campo "email" é obrigatório',
    };
  }
  if (regexEmail.test(email) === false) {
    return {
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }
  if (!password) {
    return {
      message: 'O campo "password" é obrigatório',
    };
  }
  let passwordLenght = password.toString();
  if (passwordLenght.length < 6) {
    return {
      "message": 'O "password" deve ter pelo menos 6 caracteres'
    };
  }
  if (
    regexEmail.test(email) &&
    passwordLenght.length >= 6
  ) {
    for (let i = 0; i < 16; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
}

router.post("/", (req, res) => {
  const payload = req.body;
  //   console.log(payload)
  const value = validateEmailPassword(payload);

  if (typeof value === "object") {
    res.status(400).send(value);
  }

  if (typeof value === "string") {
    res.status(200).send({ token: value });
  }
});

module.exports = router;
