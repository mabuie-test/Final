// backend_repetidor/controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashed, role });
    return res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    console.error('Erro no register:', err);
    return res.status(500).json({ message: 'Erro interno ao criar usuário' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Geração do token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Aqui devolvemos o token e o papel do usuário
    return res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ message: 'Erro interno ao fazer login' });
  }
};
