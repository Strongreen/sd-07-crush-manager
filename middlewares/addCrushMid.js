const fs = require('fs').promises;

const addCrushMiddleware = async (req, res, _next) => {
  const { body } = req;

  const data = await fs.readFile(`${__dirname}/../crush.json`);
  const result = {
    ...body,
    id: JSON.parse(data).length + 1,
  };
  const resultData = [...JSON.parse(data), result];
  fs.writeFile(
    `${__dirname}/../crush.json`,
    JSON.stringify(resultData, null, ' '),
    (err) => {
      if (err) {
        throw err;
      }
    },
  );
  res.status(201).send(result);
};

module.exports = addCrushMiddleware;
