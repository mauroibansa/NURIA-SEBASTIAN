const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.textContent = isOpen ? 'Menú' : 'Cerrar';
  mobileMenu.hidden = isOpen;
  document.body.classList.toggle('menu-open', !isOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menú';
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  });
});

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const projectIndex = document.querySelector('[data-project-index]');
const projectPreview = document.querySelector('[data-project-preview]');
const previewImage = projectPreview?.querySelector('img');

projectIndex?.querySelectorAll('[data-project-row]').forEach((row) => {
  row.addEventListener('mouseenter', () => {
    if (!projectPreview || !previewImage) return;
    previewImage.src = row.dataset.preview;
    projectPreview.classList.add('is-visible');
  });

  row.addEventListener('mousemove', (event) => {
    if (!projectPreview) return;
    const x = Math.min(event.clientX + 24, window.innerWidth - 304);
    const y = Math.min(event.clientY + 24, window.innerHeight - 234);
    projectPreview.style.left = `${Math.max(16, x)}px`;
    projectPreview.style.top = `${Math.max(16, y)}px`;
  });

  row.addEventListener('mouseleave', () => {
    projectPreview?.classList.remove('is-visible');
  });
});
