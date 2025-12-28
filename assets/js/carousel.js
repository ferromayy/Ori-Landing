// Carousel del Hero
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.js-hero-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.js-carousel-track');
  const prevBtn = carousel.querySelector('.js-carousel-prev');
  const nextBtn = carousel.querySelector('.js-carousel-next');
  const indicators = carousel.querySelectorAll('.js-indicator');
  const slides = track.querySelectorAll('a');
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoplayInterval;

  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.remove('bg-white/50');
        indicator.classList.add('bg-white');
      } else {
        indicator.classList.remove('bg-white');
        indicator.classList.add('bg-white/50');
      }
    });
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    resetAutoplay();
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoplay();
  };

  const goToSlide = (index) => {
    currentSlide = index;
    updateCarousel();
    resetAutoplay();
  };

  const startAutoplay = () => {
    autoplayInterval = setInterval(nextSlide, 2000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });

  // Pausar autoplay al hacer hover
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // Inicializar
  updateCarousel();
  startAutoplay();
});

