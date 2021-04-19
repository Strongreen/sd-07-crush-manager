const { getCrushOnFile } = require('../services');

const crushById = async (req, res) => {
  const { params: { id } } = req;
  const data = await getCrushOnFile();
  const result = data.find((element) => element.id === parseInt(id, 10));
  if (!result) {
    res.status(404).send({
      message: 'Crush não encontrado',
    });
  }
  res.status(200).json(result);
};

const getAllCrushes = async (req, res) => {
  const data = await getCrushOnFile();
  if (data.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(200).send([]);
  }
};

const searchCrushes = async (req, res) => {
  const data = await getCrushOnFile();
  const { query: { q } } = req;

  if (!q) {
    return res.status(200).json(data);
  }

  const result = data.filter((crush) => crush.name.includes(q));
  return res.status(200).json(result);
};

module.exports = { crushById, getAllCrushes, searchCrushes };
