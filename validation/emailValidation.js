const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.post('/login', middleware.emailMiddleware);
router.post('/login', middleware.passwordMiddleware);

module.exports = router;
