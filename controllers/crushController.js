const {
    getAllCrushs,
    getCrushById,
    deleteCrushById,
    setCrushs } = require('../services/crushService');

exports.getAllCrushsController = async (_req, res) => {
    const crushs = await getAllCrushs();
    return res.status(200).send(crushs);
};

exports.getCrushByIdController = async (req, res) => {
    const { id } = req.params;
    const notFound = { message: 'Crush não encontrado' };
    const crush = await getCrushById(id);
    if (crush) return res.status(200).send(crush);
    return res.status(404).send(notFound);
};

exports.createCrushController = async (req, res) => {
    const crush = req.body;
    await setCrushs(crush);
    return res.status(201).send(crush);
};

exports.deleteCrushByIdController = async (req, res) => {
    const { id } = req.params;
    await deleteCrushById(id);
    return res.status(200).send({ message: 'Crush deletado com sucesso' });
};
