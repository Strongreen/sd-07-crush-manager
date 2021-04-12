const fs = require('fs');
// const cryptoRandomString = require('crypto-random-string');

const SUCCESS = 200;
const FAIL = 500;
const NOTFOUND = 404;

const getCrushes = async (req, res) => {
  try {
    const result = await fs.promises.readFile(`${__dirname}/../../crush.json`, 'utf-8');
    return res.status(SUCCESS).send(JSON.parse(result));
  } catch (error) {
    console.error(error);
    return res.status(FAIL).send({ menssage: error.menssage });
  }
};

const getCrushById = async (req, res) => {
  try {
    const { id } = req.params;
    const crushes = await fs.promises.readFile(`${__dirname}/../../crush.json`, 'utf-8');
    const arrayOfCrushes = JSON.parse(crushes);
    const currCrush = arrayOfCrushes.find((index) => index.id === parseInt(id, 10));
    if (!currCrush) return res.status(NOTFOUND).send({ message: 'Crush não encontrado' });
    return res.status(SUCCESS).send(currCrush);
  } catch (error) {
    return res.status(FAIL).send({ menssage: error.menssage });
  }
};

const login = async (req, res) => {
  try {
   // if (emailValidado === true && passwordValidado === true) {

      // cryptoRandomString disponivel em: www.npmjs.com/package/crypto-random-string
      // const token = cryptoRandomString({ length: 16 });
      const token = '7mqaVRXJSp886CGr';
      return res.status(SUCCESS).send({ token });
    // }
  } catch (error) {
    return res.status(FAIL).send({ menssage: error.menssage });
  }
};

module.exports = { getCrushes, getCrushById, login };
