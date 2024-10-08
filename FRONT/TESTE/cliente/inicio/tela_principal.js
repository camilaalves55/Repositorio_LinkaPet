document.addEventListener('DOMContentLoaded', async () => {
    try {
        const clienteId = localStorage.getItem('id_cliente');
        console.log("ID do cliente recuperado:", clienteId);
        
        if (!clienteId) {
            console.error("O ID do cliente não foi encontrado no localStorage.");
            Swal.fire({
                title: 'Erro!',
                text: 'ID do cliente não encontrado. Por favor, faça login novamente.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const clienteResponse = await fetch('http://localhost:3005/api/store/get/nome', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cliente_id: clienteId })
        });

        console.log("Resposta do servidor ao buscar nome do cliente:", clienteResponse);

        if (!clienteResponse.ok) {
            throw new Error('Erro ao buscar o nome do cliente: ' + clienteResponse.statusText);
        }

        const clienteResult = await clienteResponse.json();
        console.log("Resultado da busca pelo nome do cliente:", clienteResult);

        if (clienteResult.success) {
            document.getElementById('nome').textContent = clienteResult.data.nome;
            document.getElementById('nome_usuario').textContent = clienteResult.data.nome_usuario;
            document.getElementById('email_usuario').textContent = clienteResult.data.email;

            const fotoPerfil = clienteResult.data.foto_perfil 
                ? `http://localhost:3005/upload/${clienteResult.data.foto_perfil}`
                : '../../imagens/default.png';
            document.getElementById('foto_perfil').src = fotoPerfil;
        } else {
            console.log("Erro ao buscar o nome do cliente:", clienteResult.message);
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
});

let currentIndex = 0;
const slides = document.querySelectorAll('.carrossel-item');
const totalSlides = slides.length;

function moveSlide(step) {
    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    updateCarousel();
}

function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector('.carrossel-inner').style.transform = `translateX(${offset}%)`;
}

function autoSlide() {
    moveSlide(1);
}

const slideInterval = setInterval(autoSlide, 7000); // 7000ms = 7s

document.querySelector('.prev').addEventListener('click', () => {
    clearInterval(slideInterval);
    moveSlide(-1);
});
document.querySelector('.next').addEventListener('click', () => {
    clearInterval(slideInterval);
    moveSlide(1);
});

document.addEventListener('DOMContentLoaded', function() {
    adicionarEventoAosBotoes();
});

function adicionarEventoAosBotoes() {
    let botoes = document.querySelectorAll('.info');
    botoes.forEach(function(button) {
        button.addEventListener('click', function() {
            removeStyles();
            this.classList.add('buttonClicked');
            updateInformacao(this.textContent.trim().toLowerCase());
        });
    });
}

function removeStyles() {
    let botoes = document.querySelectorAll('.info');
    botoes.forEach(button => {
        button.classList.remove('buttonClicked');
    });
}

function updateInformacao(id) {
    let foto = document.getElementById('info-foto');
    let texto = document.getElementById('info-texto');

    switch(id) {
        case 'banho':
            foto.style.backgroundImage = 'url("../../imagens/foto_perfil.png")';
            texto.innerHTML = '<p>Informações sobre banho.</p>';
            break;
        case 'tosa':
            foto.style.backgroundImage = 'url="../../imagens/logo_LinkaPet.png")';
            texto.innerHTML = '<p>Informações sobre tosa.</p>';
            break;
        case 'vacinação':
            foto.style.backgroundImage = 'url="../../icones/logo_site.png")';
            texto.innerHTML = '<p>Informações sobre vacinação.</p>';
            break;
        case 'medicação':
            foto.style.backgroundImage = 'url="../../imagens/medicacao.png")';
            texto.innerHTML = '<p>Informações sobre medicação.</p>';
            break;
        case 'texto':
            foto.style.backgroundImage = 'url("../imagens/texto.png")';
            texto.innerHTML = '<p>Informações sobre o texto.</p>';
            break;
        default:
            foto.style.backgroundImage = '';
            texto.innerHTML = '';
            break;
    }
}
