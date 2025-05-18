// Arquivo atualizado para o backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração de CORS para permitir acesso do frontend Svelte
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Porta padrão do Svelte
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware para tratamento de erros de CORS
app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    res.status(403).json({ msg: 'Erro de CORS: origem não permitida' });
  } else {
    next(err);
  }
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Rota para verificar se o servidor está funcionando
app.get('/api/health', (req, res) => {
  res.json({ status: 'API está funcionando!' });
});

// Servir o frontend Svelte em ambiente de produção
if (process.env.NODE_ENV === 'production') {
  // Pasta onde o build do Svelte estará
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  // Rota para todas as outras requisições não-API
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

// Inicialização do servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor API rodando em http://localhost:${PORT}`);
      console.log('Pronto para conectar seu frontend Svelte a esta API');
    });
  })
  .catch((err) => {
    console.error('Erro ao iniciar o servidor:', err.message);
  });