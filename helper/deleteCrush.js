const { validToken, getId, filterCrushes } = require('../Validated');

const { writeFiles } = require('./writeFiles');

const SUCCESS = 200;

async function deleteCrush(req, res) {
  const { authorization } = req.headers;
  validToken(authorization, res);
  const { id } = req.params;
  const crush = filterCrushes(id);
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
