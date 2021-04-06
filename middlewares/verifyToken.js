const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
 return res.status(401).send({
        message: 'Token não encontrado',
    }); 
}
    if (token !== 'Art394384FG0Lu49') {
 return res.status(401).send({
        message: 'Token inválido',
      }); 
}
    next();
};

module.exports = verifyToken;