const SUCCESS = 200;
const INTERNAL_SERVER_ERROR = 500;

const { readFile, writeFile } = require('../services/readWriteFile');

const editCrush = async (req, res) => {
  const { id } = req.params;
  const { name, age, date } = req.body;
  try {
    const crushs = await readFile();
    const index = crushs.map((e) => e.id).indexOf(id);
    const updatedCrush = { id: parseInt(id, 10), name, age, date };
    crushs[index] = updatedCrush;
    await writeFile(crushs);
    return res.status(SUCCESS).json(updatedCrush);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
module.exports = editCrush;
