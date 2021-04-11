const express = require('express');
const crushController = require('../controllers');

const router = express.Router();

router.get('/crush', crushController.getCrushes);
/* router.get(`/crush/:id`, '');
router.post('/login', '');
router.post('/crush', '');
router.put(`/crush/:id`, '');
router.delete(`/crush/:id`, '');
router.get(`/crush/search?q=searchTerm`, ''); */

module.exports = router;