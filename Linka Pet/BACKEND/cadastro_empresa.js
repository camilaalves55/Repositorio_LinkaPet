const NOME = document.getElementById('nome');
const TELEFONE = document.getElementById('telefone');
// const NASCIMENTO = document.getElementById('dataNascimento');
const NOME_EMPRESA = document.getElementById('nomeEmpresa');
const ENDERECO = document.getElementById('endereco');
const EMAIL = document.getElementById('email');
const SENHA = document.getElementById('senha');
let CONFIRMA_SENHA = document.getElementById('confirmaSenha');

const BOTAO = document.querySelector('.submit');

window.localStorage.clear()

BOTAO.addEventListener('click', function(){

    if(SENHA.value === CONFIRMA_SENHA.value && SENHA.value != ''){
        window.localStorage.setItem('nome', NOME.value);
        window.localStorage.setItem('telefone', TELEFONE.value);
        window.localStorage.setItem('endereco', ENDERECO.value);
        window.localStorage.setItem('nomeEmpresa', NOME_EMPRESA.value);
        window.localStorage.setItem('usuario', EMAIL.value);
        window.localStorage.setItem('senha', SENHA.value);
        window.location.href = 'tela_login.html'
    }else{
        alert("As senhas não combinam");
    }
})