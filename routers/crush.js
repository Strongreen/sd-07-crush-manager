const { Router } = require('express');
const path = require('path');
const fs = require('fs').promises;

const router = Router();

const SUCCESS = 200;

const dataCrush = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '..', 'crush.json'));
  return content;
};

router.get('/', async (_req, res) => {
  try {
    const crush = await dataCrush();
    if (crush.length < 1) return res.status(SUCCESS).json(JSON.parse([]));
    return res.status(SUCCESS).json(JSON.parse(crush));
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const crushData = await dataCrush();
  const filterCrush = JSON.parse(crushData).find((crush) => crush.id === Number(id));

  if (!filterCrush) {
    res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(SUCCESS).json(filterCrush);
});

module.exports = router;
