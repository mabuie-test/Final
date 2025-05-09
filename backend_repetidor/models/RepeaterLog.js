const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  deviceId: String,
  status: String, // ativo ou inativo
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RepeaterLog', logSchema);
