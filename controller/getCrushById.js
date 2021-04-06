const SUCCESS = 200;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const { readFile } = require('../services/readWriteFile');

const getCrushById = async (req, res) => {
  const { id } = req.params;
  try {
    const crushs = await readFile();
    const crush = crushs.find((element) => element.id === parseInt(id, 10));
    if (crush) return res.status(SUCCESS).json(crush);
    return res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = getCrushById;
