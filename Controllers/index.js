const crush = require('../crush.json');

const getCrush = (req, res) => {
  if (!crush || crush.length === 0) {
    return res.status(200).send([]);
  }
  return res.status(200).send(crush);
};

const getCrushId = (req, res) => {
  const { id } = req.params;
  const singleCrush = crush.find(contact => contact.id === Number(id));
  if (!singleCrush) {
    return res.status(404).send({
      message: 'Crush não encontrado'
    });
  }
  return res.status(200).json(singleCrush)
}

module.exports = { getCrush, getCrushId };


