const { searchCrushes } = require('../middlewares');

const SUCCESS = 200;

async function searchCrush(req, res) {
  const { search } = req.query;
  if (!search) {
    const crush = await searchCrushes(search);
    res.status(SUCCESS).send(crush.crushes);
  } else {
    return res.status(SUCCESS).send();
  }
}

module.exports = { searchCrush };
