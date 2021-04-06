const isDateValid = (date) => {
  const dateRegEx = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  if (date.match(dateRegEx)) {
    return true;
  }
  return false;
};

module.exports = isDateValid;
