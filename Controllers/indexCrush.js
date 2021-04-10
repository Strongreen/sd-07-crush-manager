const { readFile, writeFile } = require('fs').promises;
const { resolve } = require('path');

const crushFile = 'crush.json';
const allCrush = async () =>
  JSON.parse(await readFile(resolve(__dirname, '..', crushFile), 'utf-8'));

const getCrush = async (req, res) => {
  const dataCrush = await allCrush();
  res.status(200).send(dataCrush);
};

const searchCrush = async (req, res) => {
  const { q } = req.query;

  try {
    const listCrush = await allCrush();
    const filterCrush = listCrush.filter((crush) => crush.name.includes(q));
    if (!filterCrush) return res.status(200).send([]);
    res.status(200).send(filterCrush);
  } catch (error) { throw new Error(error); }
};

const getCrushById = async (req, res) => {
 try {
  const { id } = req.params;
  const listCrush = await allCrush();
  const crush = listCrush.find(
    (crushId) => crushId.id === Number(id),
  );

  if (!crush) { return res.status(404).send({ message: 'Crush não encontrado' }); }

  return res.status(200).json(crush);
 } catch (error) { throw new Error(error); }  
};

const updateCrush = async (req, res) => {
  const { id } = req.params;
  const newCrush = {
    id: Number(id),
    ...req.body,
  };

  try {
    const listCrush = await allCrush();
    const newCrushList = listCrush
      .map((currCrush) => (currCrush.id === Number(id) ? newCrush : currCrush));
  
    await writeFile(resolve(__dirname, '..', crushFile), JSON.stringify(newCrushList, null, 2));
    return res.status(200).json(newCrush);
  } catch (error) { throw new Error(error); } 
};

const deleteCrush = async (req, res) => {
  const { id } = req.params;

  try {
    const listCrush = await allCrush();
    const newCrushList = listCrush
      .filter((currCrush) => (currCrush.id !== Number(id)));

    await writeFile(resolve(__dirname, '..', crushFile), JSON.stringify(newCrushList, null, 2));
    return res.status(200).send({ message: 'Crush deletado com sucesso' });
  } catch (error) { throw new Error(error); }
};

const addCrush = async (req, res) => {
  try {
    const listCrush = await allCrush();
    const addNewCrush = { id: listCrush[listCrush.length - 1].id + 1, ...req.body };
    const newListCrush = [...listCrush, addNewCrush];

    await writeFile(resolve(__dirname, '..', crushFile), JSON.stringify(newListCrush));
    return res.status(201).json(addNewCrush);
  } catch (error) { throw new Error(error); } 
};

module.exports = {
  getCrush,
  getCrushById,
  addCrush,
  updateCrush,
  deleteCrush,
  searchCrush,
};
