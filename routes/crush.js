const express = require('express');
const utils = require('../utils/utils');
const validateTokenMiddleware = require('../middlewares/validateToken');

const router = express.Router();

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

router.get('/crush', async (_request, response) => response  
  .status(SUCCESS)
  .send(await utils.getCrushs()));

router.get('/crush/:id', async (request, response) => {  
  const { id } = request.params;  
  const crush = await utils.getCrushById(id);
  
  if (crush) return response.status(SUCCESS).send(crush); 

  return response.status(NOT_FOUND).send({
    message: 'Crush não encontrado',
  });
});

router.post('/login', (request, response) => {
  const { email, password } = request.body;    

  try {
    utils.isValidateEmail(email);
    utils.isValidatePassword(password);
    
    const token = utils.generateToken();  

    response.status(SUCCESS).send({
      token: `${token}`,
    });
  } catch (error) {
    response.status(BAD_REQUEST).send(error.message);
  }  
});
router.post('/crush', validateTokenMiddleware, async (request, response) => {
  const dataCrushs = await utils.getCrushs();
  const position = dataCrushs.length;
  const { name, age, date } = request.body;  
  try {    
    utils.isValidateName(name);
    utils.isValidateAge(age);    
    utils.isValidateDate(request.body); 
    utils.isValidateRate(date);
    const objCrush = { name, age, id: position + 1, date };
    dataCrushs[position] = objCrush;
    await utils.saveData(dataCrushs);
    response.status(CREATED).send(objCrush);
  } catch (error) {    
    response.status(BAD_REQUEST).json({ message: error.message });
  }  
});

router.put('/crush/:id', validateTokenMiddleware, async (request, response) => {  
    const { name, age, date } = request.body;
    const { id } = request.params; 
    const idNew = Number(id);    
    try {    
      utils.isValidateName(name);
      utils.isValidateAge(age);    
      utils.isValidateDate(request.body); 
      utils.isValidateRate(date);

      const dataCrushs = await utils.getCrushs();
      const crushIndex = utils.getByIndexCrush(id, dataCrushs);
      const objCrush = { name, age, id: idNew, date };
      dataCrushs[crushIndex] = objCrush;
      await utils.saveData(dataCrushs);          
      response.status(SUCCESS).send(objCrush);
    } catch (error) {    
      response.status(BAD_REQUEST).json({ message: error.message });
    }
});

module.exports = router;