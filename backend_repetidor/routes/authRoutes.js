// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const onlyAdmin = require('../middleware/roleMiddleware');

// Rota de login — aberta a todos
router.post('/login', authController.login);

// Rota de registro — somente admins podem criar novos usuários
router.post(
  '/register',
  auth,                   // verifica se o token JWT está presente e válido
  onlyAdmin('admin'),     // verifica se req.user.role === 'admin'
  authController.register // executa o controller de registro
);

module.exports = router;
