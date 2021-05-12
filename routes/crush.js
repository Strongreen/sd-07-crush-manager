const routes = require('express').Router();
const { resolve } = require('path');
const { readFile, writeFile } = require('fs').promises;

const authMiddleware = require('./middlewares/auth');
const { validateCrush, validateDate } = require('./middlewares/validate');

const getCrushs = async () =>
  JSON.parse(await readFile(resolve(__dirname, '..', 'crush.json'), 'utf8'));

routes.get('/', async (req, res) => {
  try {
    const crushs = await getCrushs();
    return res.status(200).json(crushs);
  } catch (error) {
    return res.status(500).json(error);
  }
});

routes.get('/:id', async (req, res) => {
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

routes.use(authMiddleware);
routes.use(validateCrush);
routes.use(validateDate);

routes.post('/', async (req, res) => {
  try {
    const crushs = await getCrushs();
    const newCrush = {
      id: crushs[crushs.length - 1].id + 1,
      ...req.body,
    };
    
    const newCrushsList = [...crushs, newCrush];
    
    await writeFile(resolve(__dirname, '..', 'crush.json'), JSON.stringify(newCrushsList, null, 2));

    return res.status(201).json(newCrush);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = routes;
