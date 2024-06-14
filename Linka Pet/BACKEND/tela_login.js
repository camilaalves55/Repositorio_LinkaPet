const USUARIO = document.getElementById('usuario');
const SENHA = document.getElementById('senha');
const BOTAO = document.querySelector('.submit');


BOTAO.addEventListener('click', function(){
    let usuarioSalvo = window.localStorage.getItem('usuario');
    let usuarioAtual = USUARIO.value;

    let senhaSalvo = window.localStorage.getItem('senha');
    let senhaAtual = SENHA.value;

    if(usuarioAtual === usuarioSalvo && senhaAtual === senhaSalvo){
        window.location.href = 'inicio1.html'
    }else{
        alert("Usuário ou Senha incorretos")
    }
})


let enviar = document.querySelector('.submit');

enviar.onclick = async function(e) {
    e.preventDefault();
    let email       = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;
    let data        = {email,senha}

    const response = await fetch('http://localhost:3003/api/store/login', {
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