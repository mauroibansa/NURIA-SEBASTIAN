const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 36);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

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

const tickerWindow = document.querySelector('.ticker-window');
const tickerWords = [...document.querySelectorAll('.ticker-track span')];
let tickerFrame;

function updateTickerFocus() {
  if (!tickerWindow || !tickerWords.length) return;

  const windowRect = tickerWindow.getBoundingClientRect();
  const axis = windowRect.top + windowRect.height / 2;
  let closestWord;
  let closestDistance = Number.POSITIVE_INFINITY;

  tickerWords.forEach((word) => {
    const rect = word.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - axis);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestWord = word;
    }
  });

  tickerWords.forEach((word) => word.classList.toggle('is-active', word === closestWord));
  tickerFrame = requestAnimationFrame(updateTickerFocus);
}

if (tickerWindow) {
  const tickerObserver = new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(tickerFrame);
    if (entry.isIntersecting) updateTickerFocus();
  });
  tickerObserver.observe(tickerWindow);
}

document.querySelector('[data-project-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const note = event.currentTarget.querySelector('.form-note');
  note.textContent = 'Gracias por compartir tu proyecto. En la versión final, esta información se enviará directamente al estudio.';
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
