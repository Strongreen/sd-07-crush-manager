const { writeFiles } = require('./writeFiles');
const { 
    validToken,
    getId,
    validName,
    validAge,
    validDatedAt,
    validRate,
    validDate,
 } = require('../Validated');

async function makeCrush(body) {
    const { name, age, date } = body;
    const { datedAt, rate } = date;
    const { crushes, id } = await getId();
    const indice = id.toString();
    if (id) {
      console.log(crushes);
      const crush = {
          name,
          age,
          id: id + 1,
          date: {
            datedAt,
            rate,
          } };
          crushes[indice] = crush;
      return crushes;
    }
}

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
  const crush = await makeCrush(req.body);

  writeFiles(crush, res);
}

module.exports = { addCrush };
