// controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'username, password e role são obrigatórios' });
  }

  try {
    // Verifica se usuário já existe
    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    // Cria hash da senha
    const hashed = await bcrypt.hash(password, 10);

    // Tenta criar o usuário
    const user = await User.create({ username, password: hashed, role });
    return res.status(201).json({ message: 'Usuário criado com sucesso', userId: user._id });
  } catch (err) {
    // Loga o erro completo no console do Render
    console.error('Erro em authController.register:', err);
    return res.status(500).json({
      message: 'Erro interno ao criar o usuário',
      error: err.message
    });
  }
};
