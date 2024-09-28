// let currentIndex = 0;
// const slides = document.querySelectorAll('.carrossel-item');
// const totalSlides = slides.length;

// function moveSlide(step) {
//     currentIndex = (currentIndex + step + totalSlides) % totalSlides;
//     updateCarousel();
// }

// function updateCarousel() {
//     const offset = -currentIndex * 100;
//     document.querySelector('.carrossel-inner').style.transform = `translateX(${offset}%)`;
// }

// function autoSlide() {
//     moveSlide(1);
// }

// const slideInterval = setInterval(autoSlide, 7000); // 5000ms = 5s

// document.querySelector('.prev').addEventListener('click', () => {
//     clearInterval(slideInterval);
//     moveSlide(-1);
// });
// document.querySelector('.next').addEventListener('click', () => {
//     clearInterval(slideInterval);
//     moveSlide(1);
// });




// document.addEventListener('DOMContentLoaded', function() {
//     adicionarEventoAosBotoes();
// });

// function adicionarEventoAosBotoes() {
//     let botoes = document.querySelectorAll('.info');

//     botoes.forEach(function(key){
//         key.addEventListener('click', function(){
//             removeStyles();
//             this.classList.add('buttonClicked');
//         });
//     });
// }

// function removeStyles(){
//     let botoes = document.querySelectorAll('.info');
//     botoes.forEach(button => {
//         button.classList.remove('buttonClicked');
//     });
// }










// function updateInformacao(id) {
//     let foto = document.getElementById('info-foto');
//     let texto = document.getElementById('info-texto');

//     switch(id) {
//         case 'banho':
//             foto.style.backgroundImage = 'url("../imagens/foto_perfil.png")'; // Substitua com o caminho correto
//             texto.innerHTML = '<p>Informações sobre banho.</p>';
//             break;
//         case 'tosa':
//             foto.style.backgroundImage = 'url("../imagens/tosa.png")'; // Substitua com o caminho correto
//             texto.innerHTML = '<p>Informações sobre tosa.</p>';
//             break;
//         case 'vacina':
//             foto.style.backgroundImage = 'url("../imagens/vacinacao.png")'; // Substitua com o caminho correto
//             texto.innerHTML = '<p>Informações sobre vacinação.</p>';
//             break;
//         case 'medicacao':
//             foto.style.backgroundImage = 'url("../imagens/medicacao.png")'; // Substitua com o caminho correto
//             texto.innerHTML = '<p>Informações sobre medicação.</p>';
//             break;
//         case 'texto':
//             foto.style.backgroundImage = 'url("../imagens/texto.png")'; // Substitua com o caminho correto
//             texto.innerHTML = '<p>Informações sobre o texto.</p>';
//             break;
//         default:
//             foto.style.backgroundImage = '';
//             texto.innerHTML = '';
//             break;
//     }
// }












// Variáveis do carrossel
let currentIndex = 0;
const slides = document.querySelectorAll('.carrossel-item');
const totalSlides = slides.length;

// Função para mudar o slide
function moveSlide(step) {
    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    updateCarousel();
}

// Função para atualizar o carrossel
function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector('.carrossel-inner').style.transform = `translateX(${offset}%)`;
}

// Função de slide automático
function autoSlide() {
    moveSlide(1);
}

// Intervalo para slides automáticos
const slideInterval = setInterval(autoSlide, 7000); // 7000ms = 7s

// Adiciona eventos aos botões do carrossel
document.querySelector('.prev').addEventListener('click', () => {
    clearInterval(slideInterval);
    moveSlide(-1);
});
document.querySelector('.next').addEventListener('click', () => {
    clearInterval(slideInterval);
    moveSlide(1);
});

// Adiciona eventos aos botões de informações
// document.addEventListener('DOMContentLoaded', function() {
//     adicionarEventoAosBotoes();
// });

// function adicionarEventoAosBotoes() {
//     let botoes = document.querySelectorAll('.info');
//     botoes.forEach(function(button) {
//         button.addEventListener('click', function() {
//             removeStyles();
//             this.classList.add('buttonClicked');
//             updateInformacao(this.textContent.trim().toLowerCase());
//         });
//     });
// }

// function removeStyles() {
//     let botoes = document.querySelectorAll('.info');
//     botoes.forEach(button => {
//         button.classList.remove('buttonClicked');
//     });
// }

// function updateInformacao(id) {
//     let foto = document.getElementById('info-foto');
//     let texto = document.getElementById('info-texto');

//     switch(id) {
//         case 'banho':
//             foto.style.backgroundImage = 'url("../imagens/foto_perfil.png")';
//             texto.innerHTML = '<p>Informações sobre banho.</p>';
//             break;
//         case 'tosa':
//             foto.style.backgroundImage = 'url("../imagens/tosa.png")';
//             texto.innerHTML = '<p>Informações sobre tosa.</p>';
//             break;
//         case 'vacinação':
//             foto.style.backgroundImage = 'url("../imagens/vacinacao.png")';
//             texto.innerHTML = '<p>Informações sobre vacinação.</p>';
//             break;
//         case 'medicação':
//             foto.style.backgroundImage = 'url("../imagens/medicacao.png")';
//             texto.innerHTML = '<p>Informações sobre medicação.</p>';
//             break;
//         case 'texto':
//             foto.style.backgroundImage = 'url("../imagens/texto.png")';
//             texto.innerHTML = '<p>Informações sobre o texto.</p>';
//             break;
//         default:
//             foto.style.backgroundImage = '';
//             texto.innerHTML = '';
//             break;
//     }
// }
