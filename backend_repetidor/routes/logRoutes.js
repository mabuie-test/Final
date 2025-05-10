// routes/logRoutes.js

const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const auth = require('../middleware/authMiddleware');

// Cria um novo log de repetidor
router.post('/', auth, logController.createLog);

// Retorna todos os logs (do mais novo para o mais antigo)
router.get('/', auth, logController.getLogs);

module.exports = router;
