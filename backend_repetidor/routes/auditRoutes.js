// routes/auditRoutes.js
const express = require('express');
const router = express.Router();
const Audit = require('../models/Audit');
const auth = require('../middleware/authMiddleware');
const onlyAdmin = require('../middleware/roleMiddleware');

router.get('/', auth, onlyAdmin('admin'), async (req, res) => {
  const logs = await Audit.find().sort({ timestamp: -1 });
  res.json(logs);
});

module.exports = router;
