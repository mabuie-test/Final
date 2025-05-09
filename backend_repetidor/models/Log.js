const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  id_repetidor: { type: String, required: true },
  status: { type: String, enum: ['ativo', 'desligado'], required: true },
  tensao: { type: Number, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);
