const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://oliver:34416591@cluster1.ob5gujw.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
      await client.connect();
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
  
      // Verificar o estado da conexão
      if (client.topology.isConnected()) {
        console.log('Conexão ativa com o banco de dados.');
      } else {
        console.log('A conexão com o banco de dados está fechada.');
      }

      return client.db();
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
    }
  }

module.exports = { client, connectToDatabase };
