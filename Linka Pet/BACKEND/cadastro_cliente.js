const NOME = document.getElementById('nome');
const TELEFONE = document.getElementById('telefone');
const NASCIMENTO = document.getElementById('dataNascimento');
const NOME_USUARIO = document.getElementById('nomeUsuario');
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
        window.localStorage.setItem('dataNascimento', NASCIMENTO.value);
        window.localStorage.setItem('nomeUsuario', NOME_USUARIO.value);
        window.localStorage.setItem('endereco', ENDERECO.value);
        window.localStorage.setItem('usuario', EMAIL.value);
        window.localStorage.setItem('senha', SENHA.value);
        window.location.href = 'tela_login.html'
    }else{
        alert("As senhas não combinam");
    }
})


let enviar = document.querySelector('.submit');

enviar.onclick = async function(e) {
    e.preventDefault();

    let nome       = document.getElementById("nome").value;
    let telefone       = document.getElementById("telefone").value;
    let data_nascimento       = document.getElementById("dataNascimento").value;
    let nome_usuario       = document.getElementById("nomeUsuario").value;
    let endereco       = document.getElementById("endereco").value;
    let email       = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;
    let data        = {nome,telefone,data_nascimento,nome_usuario,endereco,email,senha}

    const response = await fetch('http://localhost:3003/api/store/cadastro_cliente', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });

    let content = await response.json();

    if(content.success) {
        alert("Sucesso")
    } else {
        alert('Não');
    }
}