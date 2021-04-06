const errorMiddleware = (err, req, res, next) => {
    if (err) {
        return res.status(500).send(
            { error: `Something is wrong! Error: ${err.message}` },
        );
    }
    return next();
};

module.exports = errorMiddleware;
