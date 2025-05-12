// controllers/repeaterController.js
const Repeater = require('../models/Repeater');
const Audit    = require('../models/Audit');

exports.getRepeaters = async (req, res) => {
  try {
    const reps = await Repeater.find().sort({ createdAt: -1 });
    res.json(reps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar repetidores' });
  }
};

exports.createRepeater = async (req, res) => {
  const { deviceId, status, latitude, longitude } = req.body;
  try {
    const exists = await Repeater.findOne({ deviceId });
    if (exists) return res.status(409).json({ message: 'Repetidor já existe' });

    const rep = await Repeater.create({ deviceId, status, latitude, longitude });
    await Audit.create({
      action: 'create_repeater',
      performedBy: req.user.username,
      targetUser: deviceId
    });
    res.status(201).json(rep);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar repetidor' });
  }
};

exports.updateRepeater = async (req, res) => {
  const { id } = req.params;
  try {
    const rep = await Repeater.findByIdAndUpdate(id, req.body, { new: true });
    if (!rep) return res.status(404).json({ message: 'Repetidor não encontrado' });

    await Audit.create({
      action: 'update_repeater',
      performedBy: req.user.username,
      targetUser: rep.deviceId
    });
    res.json(rep);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar repetidor' });
  }
};

exports.deleteRepeater = async (req, res) => {
  const { id } = req.params;
  try {
    const rep = await Repeater.findByIdAndDelete(id);
    if (!rep) return res.status(404).json({ message: 'Repetidor não encontrado' });

    await Audit.create({
      action: 'delete_repeater',
      performedBy: req.user.username,
      targetUser: rep.deviceId
    });
    res.json({ message: 'Repetidor removido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar repetidor' });
  }
};
