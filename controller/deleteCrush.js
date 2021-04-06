const SUCCESS = 200;
const INTERNAL_SERVER_ERROR = 500;

const { readFile, writeFile } = require('../services/readWriteFile');

const deleteCrush = async (req, res) => {
  const { id } = req.params;
  console.log('teste');
  try {
    const crushs = await readFile();
    const newCrushs = crushs.filter((element) => element.id !== parseInt(id, 10));
    await writeFile(newCrushs);
    return res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = deleteCrush;
