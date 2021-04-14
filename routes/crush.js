const express = require('express');
const utils = require('../utils');
const middleware = require('../middlewares');
const middAll = require('../middlewares/middAll');

const {
  validateEmailMiddleware, 
  validatePasswordMiddleware,
  validateTokenMiddleware,
} = middleware;

const crushRoute = '/crush/:id';

const router = express.Router();

const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;

router.get('/crush', async (_request, response) => response  
  .status(SUCCESS)
  .send(await utils.getCrushs()));

router.get(crushRoute, async (request, response) => {  
  const { id } = request.params;  
  const crush = await utils.getCrushById(id);
  
  if (crush) return response.status(SUCCESS).send(crush); 

  return response.status(NOT_FOUND).send({
    message: 'Crush não encontrado',
  });
});

router.post('/login', validateEmailMiddleware, validatePasswordMiddleware, (request, response) => {
    const token = utils.generateToken();  
    response.status(SUCCESS).send({ token: `${token}` }); 
});

router.post('/crush', middAll(), async (request, response) => {
  const dataCrushs = await utils.getCrushs();
  const position = dataCrushs.length;
  const { name, age, date } = request.body;  
  const objCrush = { name, age, id: position + 1, date };
  
  dataCrushs[position] = objCrush;
  await utils.saveData(dataCrushs);
  response.status(CREATED).send(objCrush);
});

router.put(crushRoute, middAll(), async (request, response) => {  
    const { name, age, date } = request.body;
    const { id } = request.params; 
    const idNew = Number(id);   

    const dataCrushs = await utils.getCrushs();
    const index = utils.getByIndexCrush(id, dataCrushs);
    const objCrush = { name, age, id: idNew, date };
    
    dataCrushs[index] = objCrush;
    await utils.saveData(dataCrushs);          
    response.status(SUCCESS).send(objCrush);
});

router.delete(crushRoute, validateTokenMiddleware, async (request, response) => {
  const { id } = request.params;
  const dataCrushs = await utils.getCrushs();

  const newListCrushs = utils.filterCrush(id, dataCrushs);
  await utils.saveData(newListCrushs);
  response.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
});

module.exports = router;