const routes = require('express').Router();
const { resolve } = require('path');
const { readFile, writeFile } = require('fs').promises;
const { token, nameAge, data } = require('./mid');

const erro = 500;
const file = 'crush.json';
const getCrushs = async () =>
  JSON.parse(await readFile(resolve(__dirname, '..', file), 'utf8'));

routes.get('/', async (_request, response) => {
  try {
    const crushs = await getCrushs();
    response.status(200).json(crushs);
  } catch (error) {
    response.status(erro).json(error);
  }
});

routes.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const crushs = await getCrushs();
    const crush = crushs.find((crushfind) => crushfind.id === Number(id));

    if (!crush) {
      response.status(404).json({ message: 'Crush não encontrado' });
    }

    response.status(200).json(crush || { message: 'Crush não encontrado' });
  } catch (error) {
    response.status(erro).json(error);
  }
});

routes.use(token);

routes.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const crushs = await getCrushs();
    const newList = crushs.filter((currentCrush) => (currentCrush.id !== Number(id)));
    await writeFile(resolve(__dirname, '..', file), JSON.stringify(newList, null, 2));
    response.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    response.status(erro).json(error);
  }
});

routes.use(nameAge);
routes.use(data);

routes.post('/', async (request, response) => {
  try {
    const crushs = await getCrushs();
    const newCrush = {
      id: crushs[crushs.length - 1].id + 1,
      ...request.body,
    };

    const newList = [...crushs, newCrush];

    await writeFile(resolve(__dirname, '..', file), JSON.stringify(newList, null, 2));

    response.status(201).json(newCrush);
  } catch (error) {
    response.status(erro).json(error);
  }
});

routes.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const crushs = await getCrushs();
    const newCrush = {
      id: Number(id),
      ...request.body,
    };

    const newList = crushs
      .map((currentCrush) => (currentCrush.id === Number(id) ? newCrush : currentCrush));

    await writeFile(resolve(__dirname, '..', file), JSON.stringify(newList, null, 2));

    response.status(200).json(newCrush);
  } catch (error) {
    response.status(erro).json(error);
  }
});

module.exports = routes;