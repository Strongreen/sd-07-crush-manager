const SUCCESS = 200;
const INTERNAL_SERVER_ERROR = 500;

const { readFile } = require('../services/readWriteFile');

const searchCrush = async (req, res) => {
  const { q } = req.query;
  try {
    console.log('teste');
    const crushs = await readFile();
    const filterCrushs = crushs.filter((item) => item.name.toLowerCase().includes(q.toLowerCase()));
    return res.status(SUCCESS).json(filterCrushs);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = searchCrush;
