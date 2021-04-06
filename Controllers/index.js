const fs = require('fs').promises;

const path = require('path');

const pathFile = path.resolve(__dirname, '..', 'crush.json');

const getCrush = async (req, res) => {
  const dataCrush = await fs.readFile(pathFile);
  res.status(200).send(JSON.parse(dataCrush));
};

const getCrushId = async (req, res) => {
  try {
    const { id } = req.params;
    const allCrushs = await fs.readFile(pathFile);
    const data = JSON.parse(allCrushs);
    const singleCrush = data.find((crush) => crush.id === Number(id));
    if (!singleCrush) {
      return res.status(404).send({
        message: 'Crush não encontrado',
      });
    }
    return res.status(200).json(singleCrush);
  } catch (error) {
    throw new Error(error);
  }
};

const postCrush = async (req, res) => {
  try {
    const allCrushs = await fs.readFile(pathFile);
    const data = JSON.parse(allCrushs);
    const size = data.length;
    data[size] = {
      id: `${size + 1}`,
      name: req.body.name,
      age: req.body.age,
      date: req.body.date,
    };
    await fs.writeFile(pathFile, JSON.stringify(data));
    res.status(201).send(data[size]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getCrush, getCrushId, postCrush };
