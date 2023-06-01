const express = require('express');
const router = express.Router();
const { client, connectToDatabase } = require('../db/connection');


// Rota de cadastro
router.post('/cadastro', async (req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const senha = req.body.senha;
    const confirmarSenha = req.body.csenha;

    if (!nome || !sobrenome || !email || !senha) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios' });
    }
  
  
    try {
      // Conectar ao banco de dados
      const db = await connectToDatabase();
  
      // Acessar a coleção de usuários
      const usuariosCollection = db.collection('usuários');
  
      // Verificar se o usuário já existe no banco de dados
      const existingUser = await usuariosCollection.findOne({ email });
  
      if (existingUser) {
        // Usuário já existe, retorne uma resposta adequada (por exemplo, um erro)
        return res.status(400).json({ message: 'Usuário já cadastrado' });
      }
  
      // Criar o documento do usuário
      const newUser = { nome, sobrenome, email, senha };
  
      // Inserir o usuário no banco de dados
      await usuariosCollection.insertOne(newUser);
  
      // Responder com uma mensagem de sucesso
      res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    }
  });

module.exports = router;
