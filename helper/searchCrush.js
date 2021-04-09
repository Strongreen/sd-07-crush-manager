const { validTokenSearch, searchCrushes } = require('../Validated');

const SUCCESS = 200;
const NOTFOUND = 401;

async function searchCrush(req, res) {
  const { authorization } = req.headers;
  const { search } = req.query;
  try {
    validTokenSearch(authorization);
    const crush = await searchCrushes(search);
    if (!search) {
      res.status(SUCCESS).send(crush.crushes);
    } else {
      res.status(SUCCESS).send();
    }
  } catch (error) {
    res.status(NOTFOUND).send({ message: error.message });
  }
  
}

module.exports = { searchCrush };
