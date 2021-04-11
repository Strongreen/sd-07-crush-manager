const fs = require('fs').promises;

const readCrushJson = async () => {
  const file = await fs.readFile(`${__dirname}/../crush.json`);
  return JSON.parse(file.toString('utf-8'));
};

const checkPassword = (pass) => {
  const LENGTH_MIN = 6;
  const passStr = pass.toString();
  return passStr.length >= LENGTH_MIN;
};

const checkEmail = (mail) => {
  const regMail = /\S+@\S+\.\S+/i;
  return regMail.test(mail);
};

const throwError = (check, message) => {
  if (check) {
    throw new Error(message);
  }
};

module.exports = {
  readCrushJson,
  checkPassword,
  checkEmail,
  throwError,
};