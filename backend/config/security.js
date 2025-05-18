// backend/config/security.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Configuração de segurança para o Express
module.exports = (app) => {
    // Configuração de cabeçalhos de segurança HTTP
    app.use(helmet());

    // Limitar requisições para prevenir ataques de força bruta
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100, // Limite de 100 requisições por IP
        message: {
            status: 429,
            msg: 'Muitas requisições deste IP, tente novamente após 15 minutos'
        }
    });

    // Aplicar limite a todas as rotas de API
    app.use('/api', limiter);

    // Limite mais restrito para rotas de autenticação
    const authLimiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hora
        max: 10, // 10 tentativas de login/registro por hora
        message: {
            status: 429,
            msg: 'Muitas tentativas de login. Tente novamente após 1 hora'
        }
    });

    // Aplicar limite às rotas de autenticação
    app.use('/api/auth', authLimiter);

    // Sanitização de dados para prevenir injeção NoSQL
    app.use(mongoSanitize());

    // Limpeza de dados para prevenir ataques XSS
    app.use(xss());

    // Prevenção de poluição de parâmetros HTTP
    app.use(hpp());

    // Adicionar outros middlewares de segurança conforme necessário

    // Log de segurança
    app.use((req, res, next) => {
        // Adicionar timestamp em todas as requisições
        req.requestTime = new Date().toISOString();

        // Log de requisições suspeitas (opcional)
        if (req.method === 'POST' && req.path.includes('login') && req.ip !== '::1') {
            console.log(`Tentativa de login de IP: ${req.ip}, Hora: ${req.requestTime}`);
        }

        next();
    });
};