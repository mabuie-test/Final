const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', logController.createLog);
router.get('/', authMiddleware(['admin', 'user']), logController.getLogs);
router.get('/status', authMiddleware(['admin', 'user']), logController.getRepetidoresStatus);

module.exports = router;
