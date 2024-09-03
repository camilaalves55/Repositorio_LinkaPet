const NOME_EMPRESA = document.getElementById('nomeEmpresa');
// const TELEFONE = document.getElementById('telefone');
const NOME_USUARIO = document.getElementById('nomeUsuario');
const cnpj = document.getElementById('cnpj');
// const ENDERECO = document.getElementById('endereco');
const EMAIL = document.getElementById('email');
const SENHA = document.getElementById('senha');
const CONFIRMA_SENHA = document.getElementById('confirmaSenha');

const BOTAO = document.querySelector('.submit');

BOTAO.addEventListener('click', async function(e) {
    e.preventDefault();

    if (SENHA.value === CONFIRMA_SENHA.value && SENHA.value !== '') {

        let data = {
            nome_empresa: NOME_EMPRESA.value,
            // telefone: TELEFONE.value,
            nome_usuario: NOME_USUARIO.value,
            cnpj: cnpj.value,
            // endereco: ENDERECO.value,
            email: EMAIL.value,
            senha: SENHA.value,
            tipo_cliente: "juridico"
        };

        try {
            const response = await fetch('http://localhost:3005/api/store/cadastro_empresa', {
                method: "POST",
                headers: {"Content-Type": "application/json;charset=UTF-8"},
                body: JSON.stringify(data)
            });

            let content = await response.json();

            console.log('Response content:', content);

            if (content.success) {
                alert("Sucesso");
                window.location.href = '../login/tela_login.html';
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