// models/Repeater.js
const mongoose = require('mongoose');

const repeaterSchema = new mongoose.Schema({
  deviceId:  { type: String, required: true, unique: true },
  status:    { type: String, enum: ['ativo','inativo'], default: 'ativo' },
  latitude:  { type: Number, required: true },
  longitude: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Repeater', repeaterSchema);
