const { validToken, searchCrushes } = require('../Validated');

const SUCCESS = 200;

async function searchCrush(req, res) {
  const { authorization } = req.headers;
  validToken(authorization, res);
  const { search } = req.query;
  if (!search) {
    const crush = await searchCrushes(search);
    res.status(SUCCESS).send(crush.crushes);
  } else {
    res.status(SUCCESS).send();
  }
}

module.exports = { searchCrush };
