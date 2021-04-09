function validFoundCrush(filterCrush) {
  const message = 'Crush não encontrado';
  if (!filterCrush) {
    throw new Error(message);
  }
}

module.exports = { validFoundCrush };
