  const errorMiddleware = (err, _req, res, _next) => {
    if (err.status) {
        return res.status(err.status).send({
            error: err.message,
        });
    }

    return res.status(500).send({
        error: err.message,
    });
};

module.exports = errorMiddleware;
