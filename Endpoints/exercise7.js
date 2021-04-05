const fs = require('fs').promises;
const verifyToken = require('./Middleware/verifytoken');

const crushFile = './crush.json';

module.exports = function searchCrushes(app) {
  app.get('/crush/search', verifyToken, async (req, res) => {
    try {
      const data = await fs.readFile(crushFile);
      const response = JSON.parse(data);
      const result = response.filter((crush) => crush.name.includes(req.query.q));
      res.json(result).status(200);
    } catch (error) {
      console.log(error);
    }
  });
};