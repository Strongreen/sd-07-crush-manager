exports.validateEmail = (req, res, next) => {
    console.log('xablau');
    next();
};

exports.errorMiddleware = (err, _req, res, _next) => 
     res.status(err.status).send({ message: err.message });
