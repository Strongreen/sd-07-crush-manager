const NOTFOUND = 404;

function validFoundCrush(filterCrush, res) {
    if (!filterCrush) {
        res.status(NOTFOUND).send({ message: 'Crush não encontrado' });
      }
}

module.exports = { validFoundCrush };
