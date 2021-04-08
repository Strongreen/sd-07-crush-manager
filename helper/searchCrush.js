const { validToken, searchCrushes } = require('../Validated');

const SUCCESS = 200;

async function searchCrush(req, res) {
  const { authorization } = req.headers;
  const { search } = req.query;
  validToken(authorization, res);
  const crush = searchCrushes(search, res);
  if (crush) {
    return res.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
  }
}

module.exports = { searchCrush };
