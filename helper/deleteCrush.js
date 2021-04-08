const { validToken, getId, filterCrushes } = require('../Validated');

const { writeFiles } = require('./writeFiles');

const SUCCESS = 200;

async function deleteCrush(req, res) {
  const { authorization } = req.headers;
  const { id } = req.params;
  validToken(authorization, res);
  const crush = filterCrushes(id, res);
  if (crush) {
    const { crushes } = await getId();
    if (crushes) {
        crushes.splice(id - 1, 1);
        writeFiles(crushes, res);
        return res.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
      }
  }
}

module.exports = { deleteCrush };
