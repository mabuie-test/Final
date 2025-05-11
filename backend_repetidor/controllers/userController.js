// controllers/userController.js
const User = require('../models/User');

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (err) {
    console.error('Erro em userController.deleteUser:', err);
    res.status(500).json({ message: 'Erro interno ao deletar usuário' });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};
