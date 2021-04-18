const { readCrushFile, writeCrushFile } = require('../model/CrushModel');

const getAllCrushs = async (_req, res) => {
  console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO BUSCAR CRUSHS');
  try {
    const result = await readCrushFile();
    return res.status(200).json(result);
  } catch (error) {
    console.log(`[CRUSH CONTROLLER] : buscarTodos => ${error}`);
    res.status(500).send('Erro ao buscar crushs!');
  }
};

const getOneCrush = async (req, res) => {
  console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO BUSCAR UM CRUSH');
  try {
    const { id: crushId } = req.params;
    const result = await readCrushFile();
    const crushResult = result.find(({ id }) => id === parseFloat(crushId));

    if (!crushResult) {
      return res.status(404).json({ message: 'Crush não encontrado' });
    }
    return res.status(200).json(crushResult);
  } catch (error) {
    console.log(`[CRUSH CONTROLLER] : buscar => ${error}`);
    res.status(500).json({ message: 'errou ' });
  }
};
const addCrush = async (req, res) => {
  console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO ADICIONAR UM CRUSH');
  try {
    const result = await readCrushFile();
    const newCrush = { id: !result.length ? 1 : result.length + 1, ...req.body };
    const newResult = [...result, newCrush];

    await writeCrushFile(newResult);
    return res.status(201).json(newCrush);
  } catch (error) {
    console.log(`[CRUSH CONTROLLER] : buscar => ${error}`);
    res.status(500).json({ message: 'Crush não adicionado' });
  }
};

const editCrush = async (req, res) => {
  console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO EDITAR UM CRUSH');
  try {
    const { id: crushId } = req.params;
    const { ...reqs } = req.body;
    const result = await readCrushFile();
    const newCrush = { id: parseFloat(crushId), ...reqs };
    const editResult = await result.filter(({ id }) => id !== parseFloat(crushId));
    const newResult = [...editResult, newCrush];

    await writeCrushFile(newResult);
    return res.status(200).json(newCrush);
  } catch (error) {
    console.log(`[CRUSH CONTROLLER] : buscar => ${error}`);
    res.status(500).json({ message: 'Crush não encontrado' });
  }
};

const deleteCrush = async (req, res) => {
  console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO DELETAR CRUSHS');
  try {
    const { id: crushId } = req.params;

    const result = await readCrushFile();
    const deleteResult = await result.filter(({ id }) => id !== parseFloat(crushId));
    await writeCrushFile(deleteResult);

    return res.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    console.log(`[CRUSH CONTROLLER] : buscarTodos => ${error}`);
    res.status(500).send('Erro ao buscar crush!');
  }
};
const searchCrush = async (req, res, next) => {
  console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO BUSCAR CRUSHS');
  try {
    const { q } = req.query;

    const result = await readCrushFile();
    const filteredResult = result.filter((e) => e.name.includes(q));
    res.status(200).json(filteredResult);
    if (filteredResult === []) next();
  } catch (error) {
    console.log(`[CRUSH CONTROLLER] : buscarTodos => ${error}`);
    res.status(500).send('Erro ao buscar crush!');
  }
};
module.exports = { getAllCrushs, getOneCrush, editCrush, addCrush, deleteCrush, searchCrush };
