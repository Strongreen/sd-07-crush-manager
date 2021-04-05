const fs = require('fs').promises;
const verifyToken = require('./Middleware/verifytoken');
const validateName = require('./Middleware/validateName');
const validateAge = require('./Middleware/validateAge');
const checkDate = require('./Middleware/checkDate');
const validateDate = require('./Middleware/validateDate');

const crushFile = './crush.json';

module.exports = function putCrushes(app) {
  app.put('/crush/:id', verifyToken, validateName,
  validateAge, checkDate, validateDate, validateAge, async (req, res) => {
    try {
      const { id } = req.params;
      const data = await fs.readFile(crushFile);
      const response = JSON.parse(data);
      const selectedCrushes = response.filter((crush) => crush.id !== parseInt(id, 10));
      const result = [...selectedCrushes, { ...req.body, id }];
      await fs.writeFile(crushFile, JSON.stringify(result));
      return res.status(200).json({ ...req.body, id: parseInt(id, 10) });
    } catch (error) {
      console.log(error);
    }
  });
};