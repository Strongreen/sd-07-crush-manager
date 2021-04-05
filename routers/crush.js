const { Router } = require('express');

const crushRouter = Router();
const { readCrushFile, writeCrushFile } = require('../helpers');
const status = require('../helpers/status');

/* crushRouter.get('/', async (request, response, next) => {
  const { q } = request.query;
  console.log(q);
  const crushData = await readCrushFile();
  const filteredResult = await crushData.filter((e) => e.name.includes(q));
  response.status(status.SUCCESS).json(filteredResult);
  if (filteredResult === []) next();
});
 */
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

crushRouter.post('/', (request, response) => {
  /* const { name, age, date } = request.body; */

  /*   const message = validInputs(name, age, date);
    if (message !== 'xablau') return response.status(status.BAD_REQUEST).json({ message }); */

  const crushData = readCrushFile();
  const newCrush = { id: !crushData.length ? 1 : crushData.length + 1, ...request.body };
  const newCrushData = [...crushData, newCrush];
  // console.log(newCrush);
  writeCrushFile(newCrushData);
  response.status(status.CREATED).json(newCrush);
});

/* crushRouter.put('/:id', (request, response) => {
  const { id: crushId } = request.params;
  // const { id: crushId, ...reqs } = request.body;

  /*   const message = validInputs(name, age, date);
    if (message !== 'xablau') return response.status(status.BAD_REQUEST).json({ message }); */
  // let crushData = [];
  // console.log(result);
  // console.log(typeof crushData);
  // console.log(crushData);
  // const crushData = readCrushFile();
  // console.log(crushData);
  // const array = [];
  // array.push(crushData);
  // const result = Object.values({ crushData });
  // const newCrushData = { ...request.body };
  // console.log(array);
  // const removeResult = crushData.filter((e) => e.id !== result.id);
  // console.log(removeResult);
  // writeCrushFile(newCrushData);
  // console.log(readCrushFile());
/*  const result = array.find(({ id }) => id === parseFloat(crushId));
  if (!result) return response.status(status.NOT_FOUND).json({ message: 'Crush não encontrado' });
  response.status(status.SUCCESS).json(newCrushData);
});
 */
crushRouter.delete('/:id', (request, response) => {
  const { id: crushId } = request.params;

  const crushData = readCrushFile();
  console.log(crushData);
  const removeResult = crushData.findIndex(({ id }) => id === parseFloat(crushId));
  crushData.splice(removeResult, 1);
  console.log(`Remove Results ${removeResult}`);
  console.log(`CrushData ${crushData}`);

  writeCrushFile(crushData);
  response.status(status.SUCCESS).json({ messade: 'Crush deletado com sucesso' });
});

module.exports = crushRouter;
