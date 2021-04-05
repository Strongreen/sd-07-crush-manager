const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function list() {
  try {
    const data = await readFile(`${__dirname}/../crush.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function add(newCrush) {
  try {
    const data = await readFile(`${__dirname}/../crush.json`, 'utf8');
    const datajson = [...JSON.parse(data), newCrush];
    await writeFile(
      `${__dirname}/../crush.json`,
      JSON.stringify(datajson),
      'utf8',
    );
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function edit(id, newCrush) {
  try {
    const datajson = await this.list();
    datajson.forEach((element, index) => {
      if (element.id === parseInt(id, 10)) {
        datajson[index] = { id, ...newCrush };
      }
    });
    await writeFile(
      `${__dirname}/../crush.json`,
      JSON.stringify(datajson),
      'utf8',
    );
    return datajson;
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function del(id) {
  try {
    const datajson = await this.list();
    datajson.forEach((element, index) => {
      if (element.id === id) {
        datajson.splice(index, 1);
      }
    });
    await writeFile(
      `${__dirname}/../crush.json`,
      JSON.stringify(datajson),
      'utf8',
    );
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function setToken(token) {
  try {
    const data = await readFile(`${__dirname}/../token.json`, 'utf8');
    const datajson = [...JSON.parse(data), token];
    await writeFile(
      `${__dirname}/../token.json`,
      JSON.stringify(datajson),
      'utf8',
    );
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function getTokens() {
  const data = await readFile(`${__dirname}/../token.json`, 'utf8');
  return JSON.parse(data);
}

module.exports = { list, add, edit, del, setToken, getTokens };
