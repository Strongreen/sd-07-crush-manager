const routes = require('express').Router();
const { readFile } = require('fs').promises;

const getCrushs = async () => JSON.parse(await readFile('./crush.json', 'utf8'));

routes.get('/crush', async (req, res) => {
  try {
    const crushs = await getCrushs();
    return res.status(200).json(crushs);
  } catch (error) {
    return res.status(500).json(error);
  }
});

routes.get('/crush/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const crushs = await getCrushs();
    const crush = crushs.find(({ id: crushId }) => crushId === parseInt(id, 10));
    
    if (!crush) {
      return res.status(404).json({ message: 'Crush não encontrado' });
    }
    
    return res.status(200).json(crush || { message: 'Crush não encontrado' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = routes;
