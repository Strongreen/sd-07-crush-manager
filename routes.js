const createCrush = require('./controllers/createCrush');
const deleteCrush = require('./controllers/deleteCrush');
const editCrush = require('./controllers/editCrush');
const getAllCrushs = require('./controllers/getAllCrushs');
const getCrushById = require('./controllers/getCrushById');
const login = require('./controllers/login');
const searchCrush = require('./controllers/searchCrush');

module.exports = {
  createCrush,
  deleteCrush,
  editCrush,
  getAllCrushs,
  getCrushById,
  login,
  searchCrush,
};