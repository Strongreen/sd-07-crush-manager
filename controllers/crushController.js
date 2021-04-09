const { getAllCrushs, getCrushById } = require('../services/crushService');

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
