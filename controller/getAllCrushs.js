const SUCCESS = 200;
const INTERNAL_SERVER_ERROR = 500;

const { readFile } = require('../services/readWriteFile');

module.exports = async (req, res) => {
  try {
    return res.status(SUCCESS).json(await readFile());
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
