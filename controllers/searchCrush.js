const { validateToken, getCrushs } = require('../functions');

module.exports = (req, res) => {
  const { authorization } = req.headers;
  if (!validateToken(authorization, res)) {
    let crushsArray = [...getCrushs()];
    const { q } = req.query;
    if (q) {
      crushsArray = crushsArray.filter(({ name }) => name.includes(q));
    }
    res.status(200).send(crushsArray);
  }
};
