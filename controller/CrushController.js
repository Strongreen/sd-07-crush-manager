const Crush = require('../crush.json');
/* const fs = require("fs"); */

class CrushController {
  static async buscarTodos(req, res) {
    console.log('[CRUSH CONTROLLER] : CHAMOU O MÉTODO BUSCAR TODOS');
    try {
      res.json(await Crush.find({}));
    } catch (error) {
      console.log(`[CRUSH CONTROLLER] : buscarTodos => ${error}`);
      res.status(500).send('Erro ao buscar crushs!');
    }
  }

  static async adicionar(req, res) {
    try {
      const NovoCrush = req.body;
      console.log(
        `${'[CRUSH CONTROLLER] : CHAMOU O MÉTODO ADICIONAR'
          + '\n PARÂMETRO: '}${ 
          JSON.stringify(NovoCrush)}`,
      );
      res.status(201).json(await Crush.create(NovoCrush));
    } catch (error) {
      res.status(500).send('Erro ao inserir novo crush!');
    }
  }
}

module.exports = CrushController;
