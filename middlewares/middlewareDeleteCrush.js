const { getCrushOnFile } = require('../services');

const deleteCrush = async (req, res) => {
  const file = await getCrushOnFile();
  const { params: { id } } = req;

  const index = parseFloat(id);
  file.splice(index, 1);
  res.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = { deleteCrush };
