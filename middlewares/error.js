const erroMidware = (err, req, _res, _next) => {
   if (err.status) {
       console.log(req.status);
   }
};

module.exports = erroMidware;