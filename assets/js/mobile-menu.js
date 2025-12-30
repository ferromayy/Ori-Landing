document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.js-mobile-menu-toggle');
  const menuClose = document.querySelector('.js-mobile-menu-close');
  const mobileMenu = document.querySelector('.js-mobile-menu');
  const backdrop = document.querySelector('.js-mobile-menu-backdrop');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.remove('hidden');
      mobileMenu.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.add('hidden');
      mobileMenu.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  
  if (backdrop && mobileMenu) {
    backdrop.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.add('hidden');
      mobileMenu.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
});

