const routes = require('express').Router();
const { readFile } = require('fs').promises;

const SUCCESS = 200;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const getJSON = async () => JSON.parse(await readFile('./data/crush.json', 'utf8'));

routes.get('/', async (_request, response) => {
  try {
    const data = await getJSON();
    return response.status(SUCCESS).json(data);
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR).json(error);
  }
});

routes.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const data = await getJSON();
    const crush = data.find(({ id: crushId }) => crushId === parseInt(id, 10));

    if (!crush) {
      return response.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
    }

    return response.status(SUCCESS).json(crush || { message: 'Crush não encontrado' });
  } catch (error) {
    return response.status(INTERNAL_SERVER_ERROR).json(error);
  }
});

module.exports = routes;