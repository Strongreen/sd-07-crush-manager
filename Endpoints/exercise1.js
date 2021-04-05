const fs = require('fs').promises;

module.exports = function getCrushes(app) {
  app.get('/crush', async (_req, res) => {
    try {
      const data = await fs.readFile('./crush.json');
      const response = JSON.parse(data);
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  });
};