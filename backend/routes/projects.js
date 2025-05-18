// backend/routes/projects.js
const express = require('express');
const router = express.Router();
const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    supportProject
} = require('../controllers/projectController');
const { auth, authorize } = require('../middleware/auth');

// Rota para criar projeto (apenas desenvolvedores)
router.post('/', auth, authorize('developer'), createProject);

// Rota para listar todos os projetos (pública)
router.get('/', getAllProjects);

// Rota para obter um projeto específico (pública)
router.get('/:id', getProjectById);

// Rota para atualizar projeto (apenas o criador)
router.put('/:id', auth, updateProject);

// Rota para deletar projeto (apenas o criador)
router.delete('/:id', auth, deleteProject);

// Rota para apoiar um projeto (apenas investidores)
router.post('/:id/support', auth, authorize('investor'), supportProject);

module.exports = router;