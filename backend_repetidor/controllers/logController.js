const RepeaterLog = require('../models/RepeaterLog');

exports.createLog = async (req, res) => {
  const log = await RepeaterLog.create(req.body);
  res.status(201).json(log);
};

exports.getLogs = async (req, res) => {
  const logs = await RepeaterLog.find().sort({ timestamp: -1 });
  res.json(logs);
};
