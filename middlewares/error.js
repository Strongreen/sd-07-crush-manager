const errorMiddleware = (err, req, res, next) => {
    console.log(err.status);
    if(err.status === 404) {
        res.status(err.status).send({
            error: err.message
        });
    }
};

module.exports = errorMiddleware;