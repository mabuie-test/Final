// controllers/userController.js

const User = require('../models/User');
const Audit = require('../models/Audit');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ message: 'username, password e role são obrigatórios' });
  }

  try {
    // Verifica se já existe
    if (await User.findOne({ username })) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    // Hash da senha
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashed, role });

    // Auditoria: criação de usuário (via painel)
    await Audit.create({
      action: 'create_user',
      performedBy: req.user.username,
      targetUser: username
    });

    res
      .status(201)
      .json({ message: 'Usuário criado com sucesso', userId: user._id });
  } catch (err) {
    console.error('Erro em userController.createUser:', err);
    res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Erro em userController.getUsers:', err);
    res.status(500).json({ message: 'Erro ao buscar usuários', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await User.findByIdAndDelete(id);

    // Auditoria: remoção de usuário
    await Audit.create({
      action: 'delete_user',
      performedBy: req.user.username,
      targetUser: user.username
    });

    res.json({ message: 'Usuário removido com sucesso' });
  } catch (err) {
    console.error('Erro em userController.deleteUser:', err);
    res.status(500).json({ message: 'Erro ao deletar usuário', error: err.message });
  }
};
