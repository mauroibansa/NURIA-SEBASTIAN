const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  mobileMenu.hidden = isOpen;
  document.body.classList.toggle('menu-open', !isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  });
});

const slider = document.querySelector('[data-slider]');
const track = document.querySelector('[data-slider-track]');
const slides = [...document.querySelectorAll('.story-slide')];
const currentSlide = document.querySelector('[data-slide-current]');
let slideIndex = 0;

function updateSlider() {
  if (!slider || !track || !slides.length) return;
  const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
  const amount = slides[0].getBoundingClientRect().width + gap;
  track.style.transform = `translateX(${-slideIndex * amount}px)`;
  if (currentSlide) currentSlide.textContent = String(slideIndex + 1).padStart(2, '0');
}

document.querySelector('[data-slider-next]')?.addEventListener('click', () => {
  slideIndex = Math.min(slideIndex + 1, slides.length - 1);
  updateSlider();
});

document.querySelector('[data-slider-prev]')?.addEventListener('click', () => {
  slideIndex = Math.max(slideIndex - 1, 0);
  updateSlider();
});

window.addEventListener('resize', updateSlider, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const dialog = document.querySelector('[data-dialog]');
document.querySelector('[data-dialog-open]')?.addEventListener('click', () => dialog?.showModal());
document.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('[data-project-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const note = event.currentTarget.querySelector('.form-note');
  note.textContent = 'Gracias. En la versión final, este formulario enviará la solicitud directamente al estudio.';
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
