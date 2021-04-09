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

async function editCrush(req, res) {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { name, age, date } = req.body;
  validToken(authorization, res);
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
