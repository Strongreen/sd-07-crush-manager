const validateNameSize = (nameCrush) => {
  const MIN_SIZE = 3;
  return nameCrush.length >= MIN_SIZE;
};

const validateAge = (ageCrush) => {
  const MIN_AGE = 18;
  return +ageCrush >= MIN_AGE;
};

const validateDate = (dateCrush) => {
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return regexDate.test(dateCrush);
};

const validateRate = (rateCrush) => {
  const INTERVAL_MIN = 1;
  const INTERVAL_MAX = 5;
  return +rateCrush >= INTERVAL_MIN && +rateCrush <= INTERVAL_MAX; 
};

module.exports = {
  validateAge,
  validateDate,
  validateNameSize,
  validateRate,
};