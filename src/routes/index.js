const express = require('express');
const crushController = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/crush', crushController.getCrushes);
router.get('/crush/:id', crushController.getCrushById);
router.post('/login', middlewares.validEmail, middlewares.validPassword, crushController.login);
router.post('/crush', 
  middlewares.validToken, 
  middlewares.validDate, 
  middlewares.validName, 
  middlewares.validAge);
// router.put('/crush/:id', '');
// router.delete('/crush/:id', '');
// router.get('/crush/search?q=searchTerm', '');

module.exports = router;