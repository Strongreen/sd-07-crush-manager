const fs = require('fs').promises;
const verifyToken = require('./Middleware/verifytoken');
const validateName = require('./Middleware/validateName');
const validateAge = require('./Middleware/validateAge');
const checkDate = require('./Middleware/checkDate');
const validateDate = require('./Middleware/validateDate');

const crushFile = './crush.json';

module.exports = function postCrushes(app) {
  app.post('/crush', verifyToken, validateName, 
  validateAge, checkDate, validateDate, async (req, res) => {
    try {
      const data = await fs.readFile(crushFile);
      const response = JSON.parse(data);
      response.push(req.body);
      const result = { ...req.body, id: 5 };
      const total = JSON.stringify([result, ...response]);
      await fs.writeFile(crushFile, total);
      return res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  });
};
