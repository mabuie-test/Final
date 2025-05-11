// controllers/userController.js
const User = require('../models/User');
const Audit = require('../models/Audit');
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso', userId: user._id });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar usuário', error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
// registra auditoria de remoção
await Audit.create({
 action: 'delete_user',
performedBy: req.user.id, targetUser: user.username
});
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error: err.message });
  }
};
