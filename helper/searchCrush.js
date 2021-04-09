const { validToken, searchCrushes } = require('../Validated');

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

async function searchCrush(req, res) {
  Valid(req, res);
  const { search } = req.query;
  if (!search) {
    const crush = await searchCrushes(search);
    res.status(SUCCESS).send(crush.crushes);
  } else {
    res.status(SUCCESS).send();
  }
}

module.exports = { searchCrush };
