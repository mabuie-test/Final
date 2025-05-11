// routes/auditRoutes.js

const express = require('express');
const router = express.Router();
const Audit = require('../models/Audit');
const auth = require('../middleware/authMiddleware');
const onlyAdmin = require('../middleware/roleMiddleware');

router.get(
  '/',
  auth,
  onlyAdmin('admin'),
  async (req, res) => {
    try {
      const logs = await Audit.find().sort({ timestamp: -1 });
      res.json(logs);
    } catch (err) {
      console.error('Erro em auditRoutes:', err);
      res.status(500).json({ message: 'Erro ao buscar histórico' });
    }
  }
);

module.exports = router;
