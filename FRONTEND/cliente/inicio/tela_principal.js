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


window.addEventListener("resize", () => {
    const secao5 = document.querySelector(".secao5");
    const mainSecao = document.querySelector(".main_secao");
    const mainColuna = document.querySelector(".main_coluna");

    if (window.innerWidth <= 768) {
        if (!mainSecao.contains(secao5)) {
            mainSecao.appendChild(secao5);
        }
    } else {
        if (!mainColuna.contains(secao5)) {
            mainColuna.appendChild(secao5);
        }
    }
});

window.dispatchEvent(new Event("resize"));


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

// function updateInformacao(id) {
//     let foto = document.getElementById('info-foto');
//     let texto = document.getElementById('info-texto');

//     switch(id) {
//         case 'banho':
//             foto.style.backgroundImage = 'url("../../imagens/foto_perfil.png")';
//             texto.innerHTML = '<p>O banho é fundamental para a higiene e bem-estar do seu pet. Ele remove sujeiras, alivia coceiras e deixa o pet mais confortável e cheirosinho.</p>';
//             break;
//         case 'tosa':
//             foto.style.backgroundImage = 'url="../../imagens/logo_LinkaPet.png")';
//             texto.innerHTML = '<p>A tosa regular ajuda a manter o pelo do seu pet limpo, sem nós e mais saudável. Ela é importante para controlar o calor, a sujeira e também evita problemas de pele.</p>';
//             break;
//         case 'vacinação':
//             foto.style.backgroundImage = 'url="../../icones/logo_site.png")';
//             texto.innerHTML = '<p>Vacinar seu pet é essencial para prevenir doenças e manter a saúde dele e de todos à sua volta. Com vacinas atualizadas, seu pet pode brincar e interagir com outros animais de forma segura.</p>';
//             break;
//         default:
//             foto.style.backgroundImage = '';
//             texto.innerHTML = '';
//             break;
//     }
// }

function updateInformacao(id) {
    let foto = document.getElementById('info_foto');
    let icon = foto.querySelector('i');
    let texto = document.getElementById('info_texto');

    // Limpar classes antigas de ícones antes de adicionar o novo
    icon.className = 'fas';

    switch(id) {
        case 'banho':
            icon.classList.add('fa-shower');
            texto.innerHTML = '<p>O banho é fundamental para a higiene e bem-estar do seu pet. Ele remove sujeiras, alivia coceiras e deixa o pet mais confortável e cheirosinho.</p>';
            break;
        case 'tosa':
            icon.classList.add('fa-cut');
            texto.innerHTML = '<p>A tosa regular ajuda a manter o pelo do seu pet limpo, sem nós e mais saudável. Ela é importante para controlar o calor, a sujeira e também evita problemas de pele.</p>';
            break;
        case 'vacinação':
            icon.classList.add('fa-syringe');
            texto.innerHTML = '<p>Vacinar seu pet é essencial para prevenir doenças e manter a saúde dele e de todos à sua volta. Com vacinas atualizadas, seu pet pode brincar e interagir com outros animais de forma segura.</p>';
            break;
        default:
            icon.className = 'fa-paw';
            texto.innerHTML = '';
            break;
    }
}


document.getElementById('sair').addEventListener('click', function (event) {
    event.preventDefault();
    Swal.fire({
        title: "Você tem certeza de que deseja sair?",
        icon: "warning",
        showCancelButton: true,  
        confirmButtonText: 'Sim, tenho certeza!',
        cancelButtonText: 'Não!'
    }).then((result) => {
        if (result.isConfirmed) {  
            localStorage.removeItem('id_cliente');  
            window.location.href = "../../pagina_inicial/pagina_inicial.html";
        }
    });
});

