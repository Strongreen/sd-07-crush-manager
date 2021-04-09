const { validToken, getId, filterCrushes } = require('../Validated');

const { writeFiles } = require('./writeFiles');

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

async function deleteCrush(req, res) {
  const { id } = req.params;
  Valid(req, res);
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
