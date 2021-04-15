const { Router } = require('express');
const CrushController = require('../controller/CrushController');

const CrushRoute = Router();

CrushRoute
  .get('/', CrushController.getAllCrushs);
  /* .post('/', CrushController.adicionar)
  .put(CrushController.editar)
  .delete(CrushController.deletar); */
    /* 
      .route('/crush/:id')
      .get(CrushController.buscar)
      .put(CrushController.editar)
      .delete(CrushController.deletar); 
 */
module.exports = CrushRoute;
