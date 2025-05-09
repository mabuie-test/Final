const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'user' } // 'admin' ou 'user'
});

module.exports = mongoose.model('User', userSchema);
