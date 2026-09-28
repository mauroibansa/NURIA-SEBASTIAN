const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Abrir menú');
  if (mobileMenu) mobileMenu.hidden = true;
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  if (mobileMenu) mobileMenu.hidden = isOpen;
  document.body.classList.toggle('menu-open', !isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const valuesSection = document.querySelector('[data-values]');
const valuesTrack = document.querySelector('[data-values-track]');
const valuesTexture = document.querySelector('[data-values-texture]');
const valuesHeading = document.querySelector('.values-heading');
const valuesWindow = document.querySelector('.values-window');
const valuesWords = valuesTrack ? [...valuesTrack.querySelectorAll('li')] : [];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let valuesFrame;

function updateValues() {
  valuesFrame = undefined;
  if (!valuesSection || !valuesTrack || !valuesHeading || !valuesWindow || !valuesWords.length || reducedMotion.matches) return;

  const rect = valuesSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const scrollDistance = Math.max(valuesSection.offsetHeight - viewportHeight, 1);
  const progress = Math.min(1, Math.max(0, -rect.top / scrollDistance));
  const wordHeight = valuesWords[0].offsetHeight;
  const position = progress * (valuesWords.length - 1);
  const headingRect = valuesHeading.getBoundingClientRect();
  const windowRect = valuesWindow.getBoundingClientRect();
  const alignmentAxis = headingRect.top + headingRect.height / 2 - windowRect.top;
  const offset = alignmentAxis - wordHeight / 2 - position * wordHeight;
  const activeIndex = Math.round(position);

  valuesTrack.style.transform = `translate3d(0, ${offset}px, 0)`;
  valuesWords.forEach((word, index) => {
    const distance = Math.abs(index - position);
    word.classList.toggle('is-active', index === activeIndex);
    word.style.opacity = String(Math.max(.08, 1 - distance * .56));
  });

  if (valuesTexture) {
    valuesTexture.style.transform = `translate3d(0, ${(progress - .5) * 120}px, 0) scale(1.04)`;
  }
}

function requestValuesUpdate() {
  if (!valuesFrame) valuesFrame = requestAnimationFrame(updateValues);
}

window.addEventListener('scroll', requestValuesUpdate, { passive: true });
window.addEventListener('resize', requestValuesUpdate, { passive: true });
reducedMotion.addEventListener?.('change', requestValuesUpdate);
document.fonts?.ready.then(requestValuesUpdate);
requestValuesUpdate();
