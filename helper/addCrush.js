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

async function addCrush(req, res) {
  const { authorization } = req.headers;
  validToken(authorization, res);
  const { name, age, date } = req.body;
  try {
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
