// controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Audit = require('../models/Audit');

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

    // Cria o usuário
    const user = await User.create({ username, password: hashed, role });
    return res.status(201).json({ message: 'Usuário criado com sucesso', userId: user._id });
  } catch (err) {
    console.error('Erro em authController.register:', err);
    return res.status(500).json({
      message: 'Erro interno ao criar o usuário',
      error: err.message
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'username e password são obrigatórios' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
// registra auditoria de login
await Audit.create({
action: 'login',
performedBy: username
 });
    return res.json({ token, role: user.role });
  } catch (err) {
    console.error('Erro em authController.login:', err);
    return res.status(500).json({ message: 'Erro interno no login', error: err.message });
  }
};
