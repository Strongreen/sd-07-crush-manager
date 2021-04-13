const errorMiddlewares = (err, req, res, next) => {
    if (err) {
        res.status(500).send({ 
            error: `Encontramos o erro ${err.message}`,
        });
    }
    next();
};

module.exports = errorMiddlewares;