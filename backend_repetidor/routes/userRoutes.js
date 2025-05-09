const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware(['admin']), userController.createUser);
router.get('/', authMiddleware(['admin']), userController.getUsers);

module.exports = router;
