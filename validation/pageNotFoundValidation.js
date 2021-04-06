const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.get('*', middleware.pageNotFoundMiddleware);
router.post('*', middleware.pageNotFoundMiddleware);
router.put('*', middleware.pageNotFoundMiddleware);
router.delete('*', middleware.pageNotFoundMiddleware);

module.exports = router;
