const CrushController = require('../controller/CrushController');

class CrushRoute {
  constructor(app) {
    app
      .route('/crush')
      .get(CrushController.buscarTodos)
      .post(CrushController.adicionar)
      .put(CrushController.editar)
      .delete(CrushController.deletar);
    app
      .route('/crush/:id')
      .get(CrushController.buscar)
      .put(CrushController.editar)
      .delete(CrushController.deletar);
  }
}

module.exports = CrushRoute;