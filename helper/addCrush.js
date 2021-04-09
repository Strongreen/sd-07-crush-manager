const { writeFiles } = require('./writeFiles');
const { 
    validToken,
    validName,
    validAge,
    validDatedAt,
    validRate,
    validDate,
    newCrush,
 } = require('../Validated');

const SUCCESS = 201;
const NOTFOUND = 400;
const TOKEN = 401;

function Valid(req, res) {
  const { authorization } = req.headers;
  try {
    validToken(authorization);
  } catch (error) {
    res.status(TOKEN).send({ message: error.message });
  }
}

async function addCrush(req, res) {
  Valid(req, res);
  try {
    const { name, age, date } = req.body;
    validName(name);
    validAge(age);
    validDate(date);
    const { datedAt, rate } = date;
    validDatedAt(datedAt);
    validRate(rate);
    const crush = await newCrush(req.body);
    writeFiles(crush.crushes, res);
    res.status(SUCCESS).send(crush.crush);
  } catch (error) {
    res.status(NOTFOUND).send({ message: error.message });
  }
}

module.exports = { addCrush };
