const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

const { readFile, writeFile } = require('../services/readWriteFile');

const createCrush = async (req, res) => {
  const { name, age, date } = req.body;
  try {
    const crushs = await readFile();
    const id = crushs[crushs.length - 1].id + 1;
    const newCrush = { id, name, age, date };
    crushs.push(newCrush);
    await writeFile(crushs);
    return res.status(CREATED).json(newCrush);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
module.exports = createCrush;
