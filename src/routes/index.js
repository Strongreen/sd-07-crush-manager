const express = require('express');
const crushController = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/crush', crushController.getCrushes);
router.get('/crush/:id', crushController.getCrushById);
router.post('/login', middlewares.validEmail, middlewares.validPassword, crushController.login);
router.post('/crush',
  middlewares.validToken,
  middlewares.validName,
  middlewares.validAge,
  middlewares.validDate,
  middlewares.validDateAt,
  middlewares.validRate,
  crushController.createCrush);
router.put('/crush/:id',
middlewares.validToken,
middlewares.validName,
middlewares.validAge,
middlewares.validDate,
middlewares.validDateAt,
middlewares.validRate,
  crushController.updateCrush);
// router.delete('/crush/:id', '');
// router.get('/crush/search?q=searchTerm', '');

module.exports = router;