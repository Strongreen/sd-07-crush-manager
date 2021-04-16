const fs = require('fs');
// referencia:Guilherme Almeida

const whriteFileSave = (convert) => {
  fs.writeFile(
    `${__dirname}/../crush.json`,
    JSON.stringify(convert, null, ' '),
    (err) => {
      if (err) {
        throw err;
      }
    },
  );
};
const excludeCrushMiddleware = async (req, res, _next) => {
  const { id } = req.params;
  try {
    const data = await fs.promises.readFile(`${__dirname}/../crush.json`);
    const convert = JSON.parse(data);
    const dataFind = convert.find((crush) => crush.id === Number(id));
    if (dataFind) {
      convert.splice(convert.indexOf(dataFind), 1);
      res.send({ message: 'Crush deletado com sucesso' });
      whriteFileSave(convert);
    } else {
      res.status(404).send({ message: 'Crush não encontrado' });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = excludeCrushMiddleware;
