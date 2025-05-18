const express = require('express');
const router = express.Router();
const { authPage } = require('../middleware/auth');
const { register, login } = require('../controllers/authController');

// Como o frontend é Svelte, backend não vai renderizar páginas, só API e redirecionamento

// Rota de login (processa formulário via POST)
router.post('/login', login);

// Rota de registro (processa formulário via POST)
router.post('/register', register);

// Logout - limpa cookie e redireciona para frontend
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  // Redireciona para rota de login do frontend (ex: Svelte app)
  res.redirect('/login');
});

// Rotas protegidas e outras que precisam verificar autenticação, podem retornar JSON

// Exemplo de rota protegida para perfil do usuário
router.get('/profile', authPage, (req, res) => {
  // Retorna dados do usuário logado para o frontend consumir
  res.json({
    username: req.user.username,
    role: req.user.role,
    email: req.user.email
    // outros dados que queira enviar
  });
});

// Rota para listar projetos (retorna JSON)
router.get('/projects', (req, res) => {
  // Aqui você deve buscar os projetos no banco e enviar JSON
  // Exemplo estático para você substituir:
  res.json([
    { id: 1, title: 'Projeto A', description: 'Descrição do projeto A' },
    { id: 2, title: 'Projeto B', description: 'Descrição do projeto B' }
  ]);
});

// Rota para criar novo projeto (exemplo, protegida)
router.post('/projects/new', authPage, (req, res) => {
  if (req.user.role !== 'developer') {
    return res.status(403).json({ msg: 'Acesso negado: somente developers podem criar projetos.' });
  }
  // Aqui insira lógica para salvar projeto no banco e retornar resultado
  res.json({ msg: 'Projeto criado com sucesso!' });
});

// Rota para detalhes do projeto (retorna JSON)
router.get('/projects/:id', (req, res) => {
  const projectId = req.params.id;
  // Buscar projeto no banco pelo projectId e retornar JSON
  res.json({
    id: projectId,
    title: `Projeto ${projectId}`,
    description: `Descrição detalhada do projeto ${projectId}`
  });
});

module.exports = router;
