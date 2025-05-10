// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importa os routers corretos
const authRoutes = require('./routes/authRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

// Habilita CORS para qualquer origem (ou especifique o seu frontend)
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Faz o parsing de JSON no body de requisições
app.use(express.json());

// Rota de saúde para teste
app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando com sucesso!' });
});

// Monta os routers — **cada segundo parâmetro deve ser um Router (função)**
app.use('/api/auth', authRoutes);
app.use('/api/logs', logRoutes);

// Conecta no MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
    // Inicia o servidor
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });
