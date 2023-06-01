//script para cadastro de usuário
$(document).ready(function() {
    // Quando o botão "Cadastrar-se" for clicado
    $('#btnCadastrar').click(function(event) {
      event.preventDefault(); // Evita o comportamento padrão do link
  
      // Obtenha os valores dos campos de formulário
      const nome = $('#nome').val();
      const sobrenome = $('#sobrenome').val();
      const email = $('#email').val();
      const senha = $('#senha').val();
      const confirmarSenha = $('#csenha').val();
  
      // Verifique se os campos estão preenchidos
      if (!nome || !sobrenome || !email || !senha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos');
        return;
      }
  
      // Verifique se as senhas correspondem
      if (senha !== confirmarSenha) {
        alert('As senhas não correspondem');
        return;
      }
  
      // Crie o objeto de usuário
      const newUser = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha
      };
  
      // Faça a requisição para cadastrar o usuário
      $.ajax({
        type: 'POST',
        url: './cadastro', // A URL da sua rota de cadastro
        contentType: 'application/json',
        data: JSON.stringify(newUser),
        success: function(response) {
          alert(response.message); // Exibe a mensagem de sucesso
          // Limpe os campos do formulário após o cadastro
          $('#nome').val('');
          $('#sobrenome').val('');
          $('#email').val('');
          $('#senha').val('');
          $('#csenha').val('');
        },
        error: function(xhr, status, error) {
          alert('Erro ao cadastrar usuário: ' + error); // Exibe a mensagem de erro
        }
      });
    });
  });

//script para login do usuário

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#formLogin');
  const messageElement = document.getElementById('message');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      messageElement.textContent = 'Usuário logado';
      window.location.href = '/planejamento_inicio2.html'; // Redireciona para a página restrita
    } else {
      const data = await response.json();
      console.log(data.message); // Exibe uma mensagem de erro
    }
  });
});
