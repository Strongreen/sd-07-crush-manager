const errorMiddleware = (err, _req, res, next) => {
    if (err) {
        res.status(500).send({
            error: `You're facing an error ${err.message}`,
        });
    }
    next();
};

module.exports = errorMiddleware;
