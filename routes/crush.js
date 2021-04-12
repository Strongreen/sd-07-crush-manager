const routes = require('express').Router();
const { readCrushes, writeCrushes } = require('../services/functions');

const auth = require('../middlewares/auth');
const { crushValidation, dateValidation } = require('../middlewares/validation');

routes.get('/', async (req, res) => {
  try {
    const crushes = await readCrushes();
    if (!crushes.length) res.status(200).send([]);
    res.status(200).send(crushes);
  } catch (error) {
    return res.status(500).send(error);
  }
});

routes.get('/search', auth, async (req, res) => {
  try {
    const { q } = req.query;
    const crushes = await readCrushes();
    if (!q || q === '') return res.status(201).send(crushes);
    const search = crushes.filter((crush) => (crush.name).toLowerCase().includes(q.toLowerCase()));
    return res.status(200).send(search);
  } catch (error) {
    return res.status(500).send(error);
  }
});

routes.get('/:id', async (req, res) => {
  try {
    const crushes = await readCrushes();
    const { id } = req.params;
    const foundCrush = crushes.find((crush) => crush.id === parseInt(id, 10));
    if (!foundCrush) res.status(404).send({ message: 'Crush não encontrado' });
    res.status(200).send(foundCrush);
  } catch (error) {
    return res.status(500).send(error);
  }
});

routes.use(auth);

routes.delete('/:id', async (req, res) => {
  try {
    const crushes = await readCrushes();
    const { id } = req.params;
    const remainingCrushes = crushes.filter((crush) => crush.id !== parseInt(id, 10));
    writeCrushes(remainingCrushes);
    return res.status(200).send({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    return res.status(500).send(error);
  }
});

routes.use(crushValidation);
routes.use(dateValidation);

routes.post('/', auth, async (req, res) => {
  try {
    const crushes = await readCrushes();
    const crush = {
      id: crushes.length + 1,
      ...req.body,
    };
    crushes.push(crush);
    writeCrushes(crushes);
    res.status(201).send(crush);
  } catch (error) {
    return res.status(500).send(error);
  }
});

routes.put('/:id', async (req, res) => {
  try {
    const crushes = await readCrushes();
    const { id } = req.params;
    const putCrush = {
      id: parseInt(id, 10),
      ...req.body,
    };
    // Lógica de map com template literals do estudante Carlos Souza
    // https://github.com/tryber/sd-07-crush-manager/pull/54/files#diff-866b6d1633485047e63893b9c07e9f9fd38a8cfd40bc5d08b3ea3e0527dce346
    const edtCrushes = crushes.map((crush) => (crush.id === parseInt(id, 10) ? putCrush : crush));
    writeCrushes(edtCrushes);
    return res.status(200).send(putCrush);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = routes;
