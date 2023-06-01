// routes/auth.js
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db/connection');
const path = require('path');

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  try {
    const db = await connectToDatabase();
    const usuariosCollection = db.collection('usuários');

    const user = await usuariosCollection.findOne({ email, senha });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    res.redirect('/planejamento_inicio2.html'); // Redireciona para a página restrita
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).json({ message: 'Erro ao autenticar usuário' });
  }
});

module.exports = router;
