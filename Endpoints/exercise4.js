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
      const finalId = response.reduce((prev, cur) => ((prev.id > cur.id) ? prev : cur)).id + 1;
      const result = { ...req.body, id: finalId };
      const total = JSON.stringify([result, ...response]);
      await fs.writeFile(crushFile, total);
      return res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  });
};
