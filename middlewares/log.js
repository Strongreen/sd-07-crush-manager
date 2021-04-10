const logMiddlware = (req, res, next) => {
    console.log(`${req.method}`);
    next();
};

module.exports = logMiddlware;