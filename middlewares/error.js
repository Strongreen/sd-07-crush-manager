const errorMiddlware = (error, req, res, next) => {
    if (error.status) {
        res.status(error.status).send({
            error: error.message,
        });
    }
   
    res.status(500).send({
        error: error.message,
    });
    next();
};

module.exports = errorMiddlware;