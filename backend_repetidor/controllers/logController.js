const Log = require('../models/Log');

exports.createLog = async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).json({ message: 'Log criado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar log' });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar logs' });
  }
};

exports.getRepetidoresStatus = async (req, res) => {
  try {
    const latestLogs = await Log.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: '$id_repetidor',
          status: { $first: '$status' },
          tensao: { $first: '$tensao' },
          latitude: { $first: '$latitude' },
          longitude: { $first: '$longitude' },
          timestamp: { $first: '$timestamp' },
        },
      },
    ]);
    res.json(latestLogs);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar status dos repetidores' });
  }
};
