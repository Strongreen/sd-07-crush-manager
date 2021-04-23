const express = require('express');
const crushController = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

const crush = '/crush';
const crushId = '/crush/:id';

router.get(crush, crushController.getCrushes);
router.get(crushId, crushController.getCrushById);
router.post('/login', middlewares.validEmail, middlewares.validPassword, crushController.login);
router.post(crush,
  middlewares.validToken,
  middlewares.validName,
  middlewares.validAge,
  middlewares.validDate,
  middlewares.validDateAt,
  middlewares.validRate,
  crushController.createCrush);
router.put(crushId,
  middlewares.validToken,
  middlewares.validName,
  middlewares.validAge,
  middlewares.validDate,
  middlewares.validDateAt,
  middlewares.validRate,
  crushController.updateCrush);
router.delete(crushId, middlewares.validToken, crushController.deleteCrush);
router.get('/crush/search', middlewares.validToken, crushController.searchCrush);

module.exports = router;