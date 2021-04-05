const fs = require('fs').promises;

module.exports = function getCrushesById(app) {
  app.get('/crush/:id', async (req, res) => {
    try {
      const data = await fs.readFile('./crush.json');
      const response = JSON.parse(data);
      const result = response.find((crush) => crush.id === parseInt(req.params.id, 10));
      console.log(result);
      if (result === undefined) {
        return res.status(404).json({ message: 'Crush não encontrado' });
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
    }
  });
};