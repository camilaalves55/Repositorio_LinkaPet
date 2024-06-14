const NOME = document.getElementById('nome');
const TELEFONE = document.getElementById('telefone');
const NOME_USUARIO = document.getElementById('nomeUsuario');
const ENDERECO = document.getElementById('endereco');
const EMAIL = document.getElementById('email');
const SENHA = document.getElementById('senha');
const CONFIRMA_SENHA = document.getElementById('confirmaSenha');

const BOTAO = document.querySelector('.submit');

window.localStorage.clear();

BOTAO.addEventListener('click', async function(e) {
    e.preventDefault();

    if (SENHA.value === CONFIRMA_SENHA.value && SENHA.value !== '') {
        window.localStorage.setItem('nome', NOME.value);
        window.localStorage.setItem('telefone', TELEFONE.value);
        window.localStorage.setItem('nomeUsuario', NOME_USUARIO.value);
        window.localStorage.setItem('endereco', ENDERECO.value);
        window.localStorage.setItem('usuario', EMAIL.value);
        window.localStorage.setItem('senha', SENHA.value);

        let data = {
            nome: NOME.value,
            telefone: TELEFONE.value,
            nome_usuario: NOME_USUARIO.value,
            endereco: ENDERECO.value,
            email: EMAIL.value,
            senha: SENHA.value
        };

        try {
            const response = await fetch('http://localhost:3004/api/store/cadastro_cliente', {
                method: "POST",
                headers: {"Content-Type": "application/json;charset=UTF-8"},
                body: JSON.stringify(data)
            });

            let content = await response.json();

            console.log('Response content:', content);

            if (content.success) {
                alert("Sucesso");
                window.location.href = 'tela_login.html';
            } else {
                alert('Falha no cadastro: ' + content.message); 
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde.');
        }
    } else {
        alert("As senhas não combinam");
    }
});
