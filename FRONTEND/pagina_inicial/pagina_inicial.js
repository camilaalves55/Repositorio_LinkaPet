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

const slideInterval = setInterval(autoSlide, 7000); 

document.querySelector('.prev').addEventListener('click', () => {
    clearInterval(slideInterval);
    moveSlide(-1);
});

document.querySelector('.next').addEventListener('click', () => {
    clearInterval(slideInterval);
    moveSlide(1);
});
