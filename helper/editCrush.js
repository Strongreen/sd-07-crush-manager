const { writeFiles } = require('./writeFiles');
const { 
    validToken,
    validName,
    validAge,
    validDate,
    validDatedAt,
    validRate,
    filterCrushes,
    editedCrush,
 } = require('../Validated'); 

async function editCrush(req, res) {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { name, age, date } = req.body;
  const { datedAt, rate } = date;

  validToken(authorization, res);
  validName(name, res);
  validAge(age, res);
  validDate(date, res);
  validDatedAt(datedAt, res);
  validRate(rate, res);
  const selectCrush = await filterCrushes(id, res);
  const crush = await editedCrush(req.body, selectCrush.id);
  writeFiles(crush, res);
}

module.exports = { editCrush };
