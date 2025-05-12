// routes/repeaterRoutes.js
const express = require('express');
const router = express.Router();
const repCtrl = require('../controllers/repeaterController');
const auth    = require('../middleware/authMiddleware');
const onlyAdmin = require('../middleware/roleMiddleware');

// Listar repetidores (qualquer usuário autenticado)
router.get('/', auth, repCtrl.getRepeaters);

// CRUD (admin only)
router.post('/', auth, onlyAdmin('admin'), repCtrl.createRepeater);
router.put('/:id', auth, onlyAdmin('admin'), repCtrl.updateRepeater);
router.delete('/:id', auth, onlyAdmin('admin'), repCtrl.deleteRepeater);

module.exports = router;
