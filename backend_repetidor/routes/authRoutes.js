// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de login
router.post('/login', authController.login);

// Rota de registro LIBERADA temporariamente (sem autenticação)
// Depois de criar seu admin, lembre-se de voltar essa rota para protegida
router.post('/register', authController.register);

module.exports = router;
