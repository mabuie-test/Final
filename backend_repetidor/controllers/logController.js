// controllers/logController.js

const RepeaterLog = require('../models/RepeaterLog');
const Repeater    = require('../models/Repeater');
const Audit       = require('../models/Audit');

exports.createLog = async (req, res) => {
  const { deviceId, status, latitude, longitude } = req.body;

  try {
    // 1) Cria o log de repetidor
    const log = await RepeaterLog.create({ deviceId, status, latitude, longitude });

    // 2) Atualiza ou cria o Repeater com o último status e posição
    const repeater = await Repeater.findOneAndUpdate(
      { deviceId },
      { status, latitude, longitude },
      { 
        new: true,              // retorna o documento atualizado
        upsert: true,           // cria se não existir
        setDefaultsOnInsert: true 
      }
    );

    // 3) Auditoria: log recebido
    await Audit.create({
      action: 'log_received',
      performedBy: req.user.username,
      targetUser: deviceId
    });

    // 4) Retorna ambos para conferência
    return res.status(201).json({ 
      message: 'Log criado e Repeater atualizado',
      log,
      repeater
    });
  } catch (err) {
    console.error('Erro em logController.createLog:', err);
    return res.status(500).json({ 
      message: 'Erro ao criar log', 
      error: err.message 
    });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await RepeaterLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    console.error('Erro em logController.getLogs:', err);
    res.status(500).json({ message: 'Erro ao buscar logs', error: err.message });
  }
};
