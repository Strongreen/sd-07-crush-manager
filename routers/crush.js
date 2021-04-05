const { Router } = require('express');

const crushRouter = Router();
const { readCrushFile, writeCrushFile } = require('../helpers');
const status = require('../helpers/status');

crushRouter.get('/', async (request, response, next) => {
  const { q } = request.query;
  console.log(q);
  const crushData = await readCrushFile();
  const filteredResult = crushData.filter((e) => e.name.includes(q));
  response.status(status.SUCCESS).json(filteredResult);
  if (filteredResult === []) next();
});

crushRouter.get('/', async (_request, response) => {
  // const { authorization } = request.headers;
  const result = await readCrushFile();
  console.log(result);
  response.status(status.SUCCESS).json(result);
});

// 2. Crie o endpoint GET /crush/:id
// const findUserId = (id, crushData) => crushData.find(({ id }) => id === id);

crushRouter.get('/:id', async (request, response) => {
  const { id: crushId } = request.params;

  // console.log((parseFloat(crushId)));
  const crushData = await readCrushFile();

  const resultData = crushData.find(({ id }) => id === parseFloat(crushId));
  // console.log(result);

  if (!resultData) {
    return response.status(status.NOT_FOUND).json(
      { message: 'Crush não encontrado' },
    );
  }
  response.status(status.SUCCESS).json(resultData);
});

// 4. Crie o endpoint POST /crush

crushRouter.post('/', async (request, response) => {
  /* const { name, age, date } = request.body; */

  /*   const message = validInputs(name, age, date);
    if (message !== 'xablau') return response.status(status.BAD_REQUEST).json({ message }); */

  const crushData = await readCrushFile();
  const newCrush = { id: !crushData.length ? 1 : crushData.length + 1, ...request.body };
  const newCrushData = [...crushData, newCrush];
  await writeCrushFile(newCrushData);
  response.status(status.CREATED).json(newCrush);
});

crushRouter.put('/:id', async (request, response) => {
  const { id: crushId } = request.params;
  const { ...reqs } = request.body;
  const crushData = await readCrushFile();
  const newCrush = { id: parseFloat(crushId), ...reqs };
  const removeResult = await crushData.filter(({ id }) => id !== parseFloat(crushId));
  const newCrushData = [...removeResult, newCrush];

  await writeCrushFile(newCrushData);
// console.log(readCrushFile());
// const result = crushData.find(({ id }) => id === parseFloat(crushId));
// if (!result) return response.status(status.NOT_FOUND).json({ message: 'Crush não encontrado' });
response.status(status.SUCCESS).json(newCrush);
});

crushRouter.delete('/:id', async (request, response) => {
  const { id: crushId } = request.params;

  const crushData = await readCrushFile();
  const removeResult = await crushData.filter(({ id }) => id !== parseFloat(crushId));
   await writeCrushFile(removeResult);
  return response.status(status.SUCCESS).json({ message: 'Crush deletado com sucesso' });
});

module.exports = crushRouter;
