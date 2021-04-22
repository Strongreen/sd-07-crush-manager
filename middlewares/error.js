// const INTERNAL_ERROR = 500;

// const errorStatusMiddleware = (err, req, res, next) => {
//   switch (err.status) {
//     case err.status:
//       res.status(err.status).send({
//       error: err.message,
//     });
//     break;
//     default:
//       res.status(INTERNAL_ERROR).send({
//         error: 'Erro interno no servidor',
//       });
//   }
// };

// module.exports = errorStatusMiddleware;