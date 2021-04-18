const { Router } = require('express');
const CrushController = require('../controller/CrushController');

const CrushRoute = Router();

CrushRoute
  .get('/', CrushController.getAllCrushs)
  .post('/', CrushController.addCrush);

CrushRoute
  .get('/search', CrushController.searchCrush);
  
CrushRoute 
  .get('/:id', CrushController.getOneCrush)
  .put('/:id', CrushController.editCrush)
  .delete('/:id', CrushController.deleteCrush); 
 
module.exports = CrushRoute;
