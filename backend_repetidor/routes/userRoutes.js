// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Criar novo usuário (somente admin)
router.post('/', authMiddleware(['admin']), userController.createUser);

// Listar todos os usuários (somente admin)
router.get('/', authMiddleware(['admin']), userController.getUsers);

// Deletar usuário por ID (somente admin)
router.delete('/:id', authMiddleware(['admin']), userController.deleteUser);

module.exports = router;
