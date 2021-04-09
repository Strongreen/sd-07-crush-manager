const { writeFiles } = require('./writeFiles');
const { 
    validToken,
    validName,
    validAge,
    validDate,
    validDatedAt,
    validRate,
    editedCrush,
 } = require('../Validated');

const NOTFOUND = 400;
const SUCCESS = 200;
const TOKEN = 401;

function Valid(req, res) {
  const { authorization } = req.headers;
  try {
    validToken(authorization);
  } catch (error) {
    res.status(TOKEN).send({ message: error.message });
  }
}

async function editCrush(req, res) {
  Valid(req, res);
  const { id } = req.params;
  const { name, age, date } = req.body;
  try {
    validName(name);
    validAge(age);
    validDate(date);
    const { datedAt, rate } = date;
    validDatedAt(datedAt);
    validRate(rate);
    const crush = await editedCrush(req.body, Number(id));
    writeFiles(crush);
    res.status(SUCCESS).send(crush);
  } catch (error) {
    res.status(NOTFOUND).send({ message: error.message });
  }
}

module.exports = { editCrush };
