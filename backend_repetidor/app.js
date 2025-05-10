// app.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

// Permite chamadas do frontend (em produção, especifique o domínio em origin)
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Rota de saúde
app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando com sucesso!' });
});

// Montagem das rotas
app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);

// Conexão ao MongoDB e start do servidor
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });
