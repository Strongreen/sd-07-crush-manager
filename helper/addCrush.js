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

async function addCrush(req, res) {
  const { name, age, date } = req.body;
  const { datedAt, rate } = date;
  const { authorization } = req.headers;

  validToken(authorization, res);
  validName(name, res);
  validAge(age, res);
  validDate(date, res);
  validDatedAt(datedAt, res);
  validRate(rate, res); 
  const crush = await newCrush(req.body);

  writeFiles(crush, res);
}

module.exports = { addCrush };
