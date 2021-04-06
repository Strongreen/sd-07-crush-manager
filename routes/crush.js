const routes = require('express').Router();
const { resolve } = require('path');
const { readFile, writeFile } = require('fs').promises;
const { validateToken, validateNameAge, validateDate } = require('./mid/validates');

const ERRO = 500;
const SUCCESS = 200;
const file = 'crush.json';
const readDoc = async () =>
  JSON.parse(await readFile(resolve(__dirname, '..', file), 'utf8'));

routes.get('/', async (_request, response) => {
  try {
    const crushs = await readDoc();
    return response.status(SUCCESS).json(crushs);
  } catch (error) {
    return response.status(ERRO).json(error);
  }
});

routes.get('/search', validateToken, async (request, response) => {
  try {
    const { q: query } = request.query;
    const crushs = await readDoc();
    if (!query || query === '') {
      return response.status(201).json(crushs);
    }
    const filteredCrushs = crushs.filter(({ name }) => name.includes(query));
    return response.status(SUCCESS).json(filteredCrushs);
  } catch (error) {
    return response.status(ERRO).json(error);
  }
});

routes.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const crushs = await readDoc();
    const crush = crushs.find(({ id: crushId }) => crushId === Number(id));
    
    if (!crush) {
      return response.status(404).json({ message: 'Crush não encontrado' });
    }
    
    response.status(SUCCESS).json(crush || { message: 'Crush não encontrado' });
  } catch (error) {
    return response.status(ERRO).json(error);
  }
});

routes.use(validateToken);

routes.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const crushs = await readDoc();

    const newList = crushs.filter((crushI) => (crushI.id !== Number(id)));

    await writeFile(resolve(__dirname, '..', file), JSON.stringify(newList, null, 2));

    return response.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    return response.status(ERRO).json(error);
  }
});

routes.use(validateNameAge);
routes.use(validateDate);

routes.post('/', async (request, response) => {
  try {
    const crushs = await readDoc();
    const newCrush = {
      id: crushs[crushs.length - 1].id + 1,
      ...request.body,
    };
    
    const newList = [...crushs, newCrush];
    
    await writeFile(resolve(__dirname, '..', file), JSON.stringify(newList, null, 2));

    return response.status(201).json(newCrush);
  } catch (error) {
    return response.status(ERRO).json(error);
  }
});

routes.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const crushs = await readDoc();
    const newCrush = {
      id: Number(id),
      ...request.body,
    };

    const newList = crushs.map((crushI) => (crushI.id === Number(id) ? newCrush : crushI));
    await writeFile(resolve(__dirname, '..', file), JSON.stringify(newList, null, 2));
    return response.status(SUCCESS).json(newCrush);
  } catch (error) {
    return response.status(ERRO).json(error);
  }
});

module.exports = routes;