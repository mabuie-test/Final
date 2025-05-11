// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');
const onlyAdmin     = require('../middleware/roleMiddleware');

// Criar novo usuário (somente admin)
router.post(
  '/',
  authMiddleware,         // primeiro verifica se existe e é válido
  onlyAdmin('admin'),     // depois verifica se o role === 'admin'
  userController.createUser
);

// Listar todos os usuários (somente admin)
router.get(
  '/',
  authMiddleware,
  onlyAdmin('admin'),
  userController.getUsers
);

// Deletar usuário por ID (somente admin)
router.delete(
  '/:id',
  authMiddleware,
  onlyAdmin('admin'),
  userController.deleteUser
);

module.exports = router;
