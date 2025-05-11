// models/Audit.js
const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  action:    { type: String, required: true },  // ex: 'login', 'create_user', 'delete_user'
  performedBy: { type: String, required: true }, // username ou userId de quem executou
  targetUser:  { type: String },                // em create/delete, o usuário afetado
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Audit', auditSchema);
