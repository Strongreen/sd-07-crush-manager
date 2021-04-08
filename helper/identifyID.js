const { 
  filterCrushes,
} = require('../Validated');

const SUCCESS = 200;

async function identifyID(req, res) {
  const { id } = req.params;
  const filterCrush = await filterCrushes(id, res);
  return res.status(SUCCESS).send(filterCrush);
}

module.exports = { identifyID };
