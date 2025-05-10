const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando com sucesso!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
