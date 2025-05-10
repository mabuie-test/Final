const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, logController.getLogs);
router.post('/', auth, logController.createLog);

module.exports = router;
