const express = require('express');
const fs = require('fs').promises;
const { ValidateFields } = require('../middleware');

const Crush = express.Router();

const SUCCESS = 200;
const CRIADO = 201;
const NAO_EXISTE = 400;

const readData = async () => {
  const data = JSON.parse(await fs.readFile(`${__dirname}/../crush.json`));
  return data;
};

const writeData = async (data) => {
  await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
};

const addCrush = async (crush) => {
  try {
    const data = await readData();
    const id = data[data.length - 1].id + 1;
    const newCrush = crush;
    newCrush.id = id;
    data.push(newCrush);
    await writeData(data);
  } catch (error) {
    console.log(error.message);
  }
};

const updateCrush = async (id, crush) => {
  try {
    const data = await readData();
    // const obj = data.find(c => c.id == id);
    // data[id - 1] = { ...obj, ...crush };
    const newData = data.map((obj, index) => {
      if (index + 1 === parseInt(id, 10)) {
        return { ...obj, ...crush };
      }
      return obj;
    });
    // console.log(newData);
    await writeData(newData);
  } catch (error) {
    console.log(error);
  }
};

const deleteCrush = async (id) => {
  try {
    const data = await readData();
    const filterData = data.filter((crush) => parseInt(crush.id, 10) !== parseInt(id, 10));
    await writeData(filterData);
  } catch (error) {
    console.log(error);
  }
};

Crush.post('/', ValidateFields, async (request, response, next) => {
  try {
    const { body } = request;
    await addCrush(body);
    const data = await readData();
    const newCrush = data[data.length - 1];
    return response.status(CRIADO).send(newCrush);
  } catch (error) {
    console.log(error);
    return next({
      status: NAO_EXISTE,
      message: error.message,
    });
  }
});

Crush.put('/:id', ValidateFields, async (request, response, next) => {
  try {
    const { body } = request;
    const { id } = request.params;
    await updateCrush(id, body);
    const data = await readData();
    const crush = data.find((c) => parseInt(c.id, 10) === parseInt(id, 10));
    return response.status(SUCCESS).send(crush);
  } catch (error) {
    console.log(error);
    return next({
      status: NAO_EXISTE,
      message: error.message,
    });
  }
});

Crush.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const data = await readData();
    if (!data.some((crush) => parseInt(crush.id, 10) === parseInt(id, 10))) {
      throw new Error('ID não existe');
    }
    await deleteCrush(id);
    return response
      .status(SUCCESS)
      .send({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    console.log(error);
    return next({
      status: NAO_EXISTE,
      message: error.message,
    });
  }
});

module.exports = Crush;
