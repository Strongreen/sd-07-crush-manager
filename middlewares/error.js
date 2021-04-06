const errorMiddleware = (err, _req, res, _next) => {
    if (err) {
        res.status(500).send({
            error: `You're facing an error ${err.message}`,
        });
    }
    _next();
};

module.exports = errorMiddleware;
