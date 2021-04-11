const { readCrushFile } = require('../model/CrushModel');

class CrushController {
  static async getAllCrushs(req, res) {
    console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO BUSCAR CRUSHS');
    try {
      const result = await readCrushFile();
      return res.status(200).json(result);
      } catch (error) {
      console.log(`[CRUSH CONTROLLER] : buscarTodos => ${error}`);
       res.status(500).send('Erro ao buscar crushs!');
    }
  }
}

module.exports = CrushController;
