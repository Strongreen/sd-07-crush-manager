const { writeFiles } = require('./writeFiles');
const { 
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
    return res.status(SUCCESS).send(crush.crush);
  } catch (error) {
    return res.status(NOTFOUND).send({ message: error.message });
  }
}

module.exports = { addCrush };
