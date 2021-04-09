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
    return res.status(SUCCESS).send(crush);
  } catch (error) {
    return res.status(NOTFOUND).send({ message: error.message });
  }
}

module.exports = { editCrush };
