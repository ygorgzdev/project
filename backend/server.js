// backend/server.js atualizado
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const configSecurity = require('./config/security');

// Rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const pageRoutes = require('./routes/pages');

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração de CORS avançada
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:5173', // Porta padrão do Svelte
      'http://localhost:3000',
      'https://incubepro.com',
      'https://www.incubepro.com'
    ];

    // Permitir requests sem origin (ex: mobile apps, curl)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado pelo CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middlewares para parsear JSON e form data
app.use(express.json({ limit: '10kb' })); // Limitar tamanho do body para evitar ataques
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Configurar segurança
configSecurity(app);

// Middleware para tratamento de erros de CORS
app.use((err, req, res, next) => {
  if (err.message === 'Bloqueado pelo CORS') {
    return res.status(403).json({ msg: 'Erro de CORS: origem não permitida' });
  }
  next(err);
});

// Configurar EJS para renderização de páginas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Rota para verificar se o servidor está funcionando
app.get('/api/health', (req, res) => {
  res.json({
    status: 'API está funcionando!',
    time: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Rotas de página
app.use('/', pageRoutes);

// Middleware para lidar com rotas não encontradas
app.use('/api/*', (req, res) => {
  res.status(404).json({ msg: 'Endpoint não encontrado' });
});

// Middleware para erros globais
app.use((err, req, res, next) => {
  console.error('Erro global:', err);

  // Verificar se é uma resposta de API ou página
  if (req.originalUrl.startsWith('/api')) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor';

    return res.status(statusCode).json({
      msg: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  res.status(500).json({
    msg: 'Erro interno do servidor. Tente novamente mais tarde.'
  });
});

// Inicialização do servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor API rodando em http://localhost:${PORT}`);
      console.log(`Ambiente: ${process.env.NODE_ENV || 'desenvolvimento'}`);
    });
  })
  .catch((err) => {
    console.error('Erro fatal ao iniciar o servidor:', err.message);
    process.exit(1);
  });

// Tratamento para encerramento limpo
process.on('unhandledRejection', (err) => {
  console.error('ERRO NÃO TRATADO! Encerrando...');
  console.error(err.name, err.message);

  // Encerrar servidor e processo
  process.exit(1);
});