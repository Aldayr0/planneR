const express = require('express');
const app = express();
const { connectToDatabase } = require('./db/connection');
const routes = require('./routes/routes');
const authRoutes = require('./routes/auth');
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const port = 3000;
 // Porta que o servidor irá escutar
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Conectando ao banco de dados
connectToDatabase();

app.use(cors());

// Rota de cadastro
app.use('/', routes);

// Rota de autenticação
app.use('/', authRoutes);

// Rota para a página restrita
app.get('/planejamento_inicio2.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'planejamento_inicio2.html'));
});

app.get('/', (req, res) => {
  res.send('<p>Servidor rodando na porta 3000<br><a href="/index_2.html">Clique aqui para ir para a página index_2.html</a></p>');
});
//



//
// rota para direcionar após login bem sucedido
app.post('/login', async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  try {
    const db = await connectToDatabase();
    const usuariosCollection = db.collection('usuários');

    const user = await usuariosCollection.findOne({ email, senha });

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Redirecionar para a página restrita após o login bem-sucedido
    res.redirect('/planejamento_inicio2.html');
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).json({ message: 'Erro ao autenticar usuário' });
  }
});

// Iniciar o servidor
//quando estiver desenvolvendo habilite está rota e dasative a outra abaixo.
/*app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});*/

//Quando n estiver desenvolvendo habilite está rota e desative a rota acima.
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  exec('start http://localhost:3000/index_2.html');
});
