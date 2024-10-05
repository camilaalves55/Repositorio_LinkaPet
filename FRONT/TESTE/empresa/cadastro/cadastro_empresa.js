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
                Swal.fire({
                    title: 'Sucesso',
                    text: 'Cadastro realizado com sucesso!',
                    icon: 'success'
                }).then(() => {
                    window.location.href = '../../login/login.html';
                });
            } else {
                Swal.fire({
                    title: 'Falha no cadastro',
                    text: content.message,
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error('Erro:', error);
            Swal.fire({
                title: 'Erro',
                text: 'Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde.',
                icon: 'error'
            });
        }
    } else {
        Swal.fire({
            title: 'Erro',
            text: 'As senhas não combinam',
            icon: 'warning'
        });
    }
});




document.addEventListener("DOMContentLoaded", () => {
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('senha');
    const confirmPasswordInput = document.getElementById('confirmaSenha');

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' 
            ? '<i class="material-icons">visibility</i>' 
            : '<i class="material-icons">visibility_off</i>'; 
    });

    toggleConfirmPassword.addEventListener('click', function () {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' 
            ? '<i class="material-icons">visibility</i>' 
            : '<i class="material-icons">visibility_off</i>'; 
    });
});