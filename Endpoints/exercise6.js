const fs = require('fs').promises;
const verifyToken = require('./Middleware/verifytoken');

const crushFile = './crush.json';

module.exports = function putCrushes(app) {
  app.delete('/crush/:id', verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const data = await fs.readFile(crushFile);
      const response = JSON.parse(data);
      const selectedCrushes = response.filter((crush) => crush.id !== parseInt(id, 10));
      await fs.writeFile(crushFile, JSON.stringify(selectedCrushes));
      return res.status(200).json({ message: 'Crush deletado com sucesso' });
    } catch (error) {
      console.log(error);
    }
  });
};