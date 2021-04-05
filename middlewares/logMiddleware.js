const logMiddleware = (req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  // console.log('BODY:');
  // console.table(req.body);
  next();
};

module.exports = logMiddleware;
