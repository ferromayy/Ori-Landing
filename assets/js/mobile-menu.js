document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.js-mobile-menu-toggle');
  const menuClose = document.querySelector('.js-mobile-menu-close');
  const mobileMenu = document.querySelector('.js-mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  }
  
  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }
  
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu || e.target.classList.contains('backdrop-blur-sm')) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
});

