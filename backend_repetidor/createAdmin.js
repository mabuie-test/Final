// createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hash = await bcrypt.hash('suaSenhaAdmin', 10);
  await User.create({ username: 'admin', password: hash, role: 'admin' });
  console.log('Admin criado com sucesso!');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
