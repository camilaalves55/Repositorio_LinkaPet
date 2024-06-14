const EMAIL = document.getElementById('usuario');
const SENHA = document.getElementById('senha');
const BOTAO = document.querySelector('.submit');

BOTAO.addEventListener('click', async function(e) {
    e.preventDefault();

    const emailAtual = EMAIL.value;
    const senhaAtual = SENHA.value;

    const usuarioSalvo = window.localStorage.getItem('usuario');
    const senhaSalva = window.localStorage.getItem('senha');

    if (emailAtual === usuarioSalvo && senhaAtual === senhaSalva) {
        alert('Login bem-sucedido com dados salvos localmente!');
        window.location.href = 'inicio1.html'; 
        return;
    }

    const data = {
        email: emailAtual,
        senha: senhaAtual
    };

    try {
        const response = await fetch('http://localhost:3004/api/store/login', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(data)
        });

        const content = await response.json();

        console.log('Response content:', content); 

        if (content.success) {
            alert('Login bem-sucedido!');
            window.location.href = 'inicio1.html'; 
        } else {
            alert('Erro no login: ' + content.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
    }
});
























// const EMAIL = document.getElementById('email');
// const SENHA = document.getElementById('senha');
// const BOTAO = document.querySelector('.submit');

// BOTAO.addEventListener('click', async function(e) {
//     e.preventDefault();

//     const data = {
//         email: EMAIL.value,
//         senha: SENHA.value
//     };

//     try {
//         const response = await fetch('http://localhost:3004/api/login', { // Certifique-se de que o endpoint está correto
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json;charset=UTF-8' },
//             body: JSON.stringify(data)
//         });

//         const content = await response.json();

//         console.log('Response content:', content); // Log para depuração

//         if (content.success) {
//             alert('Login bem-sucedido!');
//             window.location.href = 'pagina_inicial.html'; // Redireciona para a página inicial
//         } else {
//             alert('Erro no login: ' + content.message);
//         }
//     } catch (error) {
//         console.error('Erro:', error);
//         alert('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
//     }
// });
