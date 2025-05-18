// backend/controllers/projectController.js
const Project = require('../models/Project');

// Criar um novo projeto
exports.createProject = async (req, res) => {
  try {
    // Validar dados de entrada
    const { title, description, category, status, fundingGoal, rewards } = req.body;

    // Validações básicas
    if (!title || !description || !category || !fundingGoal) {
      return res.status(400).json({
        msg: 'Dados incompletos',
        errors: {
          title: !title ? 'Título é obrigatório' : null,
          description: !description ? 'Descrição é obrigatória' : null,
          category: !category ? 'Categoria é obrigatória' : null,
          fundingGoal: !fundingGoal ? 'Meta de financiamento é obrigatória' : null
        }
      });
    }

    // Validar se fundingGoal é um número positivo
    if (isNaN(fundingGoal) || Number(fundingGoal) <= 0) {
      return res.status(400).json({ msg: 'Meta de financiamento deve ser um valor positivo' });
    }

    // Criar o projeto
    const newProject = new Project({
      title,
      description,
      category,
      status: status || 'Conceito',
      fundingGoal: Number(fundingGoal),
      rewards: rewards || [],
      creator: req.user.id,
    });

    await newProject.save();

    // Adicionar o projeto aos projetos do usuário
    await req.user.updateOne({ $push: { projects: newProject._id } });

    res.status(201).json(newProject);
  } catch (err) {
    console.error('Erro ao criar projeto:', err);
    res.status(500).json({ msg: 'Erro ao criar projeto', error: err.message });
  }
};

// Obter todos os projetos (com filtros)
exports.getAllProjects = async (req, res) => {
  try {
    let query = {};

    // Filtrar por categoria (se fornecido)
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filtrar por status (se fornecido)
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filtrar por creador (se fornecido)
    if (req.query.creator) {
      query.creator = req.query.creator;
    }

    // Paginação
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Ordenação
    const sort = {};
    if (req.query.sort) {
      const parts = req.query.sort.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    } else {
      // Ordenação padrão pelo mais recente
      sort.createdAt = -1;
    }

    // Buscar projetos
    const projects = await Project.find(query)
      .populate('creator', 'name role')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Contar total para paginação
    const total = await Project.countDocuments(query);

    res.json({
      projects,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Erro ao listar projetos:', err);
    res.status(500).json({ msg: 'Erro ao carregar projetos', error: err.message });
  }
};

// Obter projeto por ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('creator', 'name email role');

    if (!project) {
      return res.status(404).json({ msg: 'Projeto não encontrado' });
    }

    res.json(project);
  } catch (err) {
    console.error('Erro ao buscar projeto:', err);

    // Tratamento para IDs inválidos
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Projeto não encontrado - ID inválido' });
    }

    res.status(500).json({ msg: 'Erro ao carregar projeto', error: err.message });
  }
};

// Atualizar projeto
exports.updateProject = async (req, res) => {
  try {
    const { title, description, status, fundingGoal, rewards } = req.body;

    // Encontrar projeto
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Projeto não encontrado' });
    }

    // Verificar se o usuário é o criador do projeto
    if (project.creator.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Acesso negado. Você não é o criador deste projeto.' });
    }

    // Campos atualizáveis
    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (status) updateFields.status = status;
    if (fundingGoal) {
      // Validar se fundingGoal é um número positivo
      if (isNaN(fundingGoal) || Number(fundingGoal) <= 0) {
        return res.status(400).json({ msg: 'Meta de financiamento deve ser um valor positivo' });
      }
      updateFields.fundingGoal = Number(fundingGoal);
    }
    if (rewards) updateFields.rewards = rewards;

    // Atualizar projeto
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).populate('creator', 'name role');

    res.json(updatedProject);
  } catch (err) {
    console.error('Erro ao atualizar projeto:', err);

    // Tratamento para erros de validação
    if (err.name === 'ValidationError') {
      const errors = {};
      Object.keys(err.errors).forEach(key => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ msg: 'Erro de validação', errors });
    }

    res.status(500).json({ msg: 'Erro ao atualizar projeto', error: err.message });
  }
};

// Deletar projeto
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Projeto não encontrado' });
    }

    // Verificar se o usuário é o criador do projeto
    if (project.creator.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Acesso negado. Você não é o criador deste projeto.' });
    }

    await project.deleteOne();

    // Remover o projeto da lista de projetos do usuário
    await req.user.updateOne({ $pull: { projects: req.params.id } });

    res.json({ msg: 'Projeto removido com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar projeto:', err);
    res.status(500).json({ msg: 'Erro ao deletar projeto', error: err.message });
  }
};

// Apoiar um projeto (para investidores)
exports.supportProject = async (req, res) => {
  try {
    const { amount } = req.body;

    // Validar se amount é um número positivo
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ msg: 'Valor de investimento deve ser positivo' });
    }

    // Verificar se o usuário é investidor
    if (req.user.role !== 'investor') {
      return res.status(403).json({ msg: 'Apenas investidores podem apoiar projetos' });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Projeto não encontrado' });
    }

    // Atualizar o financiamento atual do projeto
    project.currentFunding += Number(amount);
    await project.save();

    // Aqui você poderia adicionar código para registrar o apoio em uma coleção separada

    res.json({
      msg: 'Projeto apoiado com sucesso',
      project: {
        id: project._id,
        title: project.title,
        currentFunding: project.currentFunding,
        fundingGoal: project.fundingGoal
      }
    });
  } catch (err) {
    console.error('Erro ao apoiar projeto:', err);
    res.status(500).json({ msg: 'Erro ao apoiar projeto', error: err.message });
  }
};