const fs = require('fs').promises;

const readCrushJson = async () => {
  const file = await fs.readFile(`${__dirname}/../crush.json`);
  return JSON.parse(file.toString('utf-8'));
};

const writeCrush = async (newCrush) => {
  const NEXT = 1;
  const jsonCrush = await readCrushJson();
  const crushWithID = { id: jsonCrush.length + NEXT, ...newCrush };
  jsonCrush.push(crushWithID);

  await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(jsonCrush));

  return crushWithID;
};

const updateCrush = async (newCrush, id) => {
  const jsonCrush = await readCrushJson();
  const newJson = jsonCrush.map((elem) => {
    if (+elem.id === +id) {
      return { id: elem.id, ...newCrush };
    }
    return elem;
  });

  await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newJson));
  
  return newJson.find((elem) => +elem.id === +id);
};

const deleteCrush = async (id) => {
  const jsonCrush = await readCrushJson();
  const newJson = jsonCrush.filter((elem) => +elem.id !== +id);

  await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(newJson));
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
  writeCrush,
  updateCrush,
  deleteCrush,
};