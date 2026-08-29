const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();

// Estilos adicionales para la galería fotográfica de transportes.
if (!document.querySelector('link[href="css/transport-gallery.css"]')) {
  const galleryStyles = document.createElement('link');
  galleryStyles.rel = 'stylesheet';
  galleryStyles.href = 'css/transport-gallery.css';
  document.head.appendChild(galleryStyles);
}

// Sustituye el gráfico decorativo de la sección Nosotros por fotografías reales.
const aboutPanel = document.querySelector('.about-panel');
if (aboutPanel) {
  aboutPanel.removeAttribute('aria-hidden');
  aboutPanel.setAttribute('aria-label', 'Transporte marítimo, aéreo y terrestre');
  aboutPanel.classList.add('transport-gallery-panel');
  aboutPanel.innerHTML = `
    <figure class="transport-photo">
      <img
        src="https://images.unsplash.com/photo-1774929103406-59c8882a9954?auto=format&fit=crop&fm=jpg&q=82&w=1200"
        alt="Buque de carga y contenedores en un puerto"
        loading="lazy"
        referrerpolicy="no-referrer"
      >
      <figcaption>
        <strong>Transporte marítimo</strong>
        <span>Carga internacional e importación/exportación</span>
      </figcaption>
    </figure>
    <figure class="transport-photo">
      <img
        src="https://images.unsplash.com/photo-1774698078446-59299e016718?auto=format&fit=crop&fm=jpg&q=82&w=900"
        alt="Avión de carga durante una operación aeroportuaria"
        loading="lazy"
        referrerpolicy="no-referrer"
      >
      <figcaption>
        <strong>Transporte aéreo</strong>
        <span>Soluciones para carga internacional</span>
      </figcaption>
    </figure>
    <figure class="transport-photo">
      <img
        src="https://images.pexels.com/photos/37848366/pexels-photo-37848366/free-photo-of-white-cargo-truck-on-highway-with-blue-sky.jpeg?auto=compress&dpr=1&w=900"
        alt="Camión de carga circulando por carretera"
        loading="lazy"
        referrerpolicy="no-referrer"
      >
      <figcaption>
        <strong>Transporte terrestre</strong>
        <span>Operaciones nacionales e internacionales</span>
      </figcaption>
    </figure>
  `;
}

// Contacto comercial principal.
const salesEmail = 'ventas1@megatradingcorp.com';

document.querySelectorAll('.nav-cta, .hero-actions .button-primary').forEach((link) => {
  link.href = `mailto:${salesEmail}`;
});

const contactTitle = document.querySelector('.contact h2');
if (contactTitle) {
  contactTitle.textContent = 'Centralice su logística con Mega Trading Corporation.';
}

const contactActions = document.querySelector('.contact-actions');
if (contactActions) {
  contactActions.innerHTML = `
    <a class="button button-light" href="mailto:${salesEmail}">
      <span>
        <span class="contact-department">Ventas y cotizaciones</span>
        <span class="contact-email-text">${salesEmail}</span>
      </span>
    </a>
    <a class="contact-link" href="mailto:operaciones1@megatradingcorp.com">
      <span class="contact-department">Operaciones</span>
      <span class="contact-email-text">operaciones1@megatradingcorp.com</span>
    </a>
  `;
}

// Identidad visual oficial de Mega Trading Corporation.
const officialLogo = 'assets/logo-mega-trading-web.webp?v=1';

if (!document.querySelector('link[href="css/brand-logo.css"]')) {
  const brandStyles = document.createElement('link');
  brandStyles.rel = 'stylesheet';
  brandStyles.href = 'css/brand-logo.css';
  document.head.appendChild(brandStyles);
}

const setOfficialBrandLogo = (brandElement) => {
  if (!brandElement) return;
  brandElement.classList.add('brand-logo-link');
  brandElement.innerHTML = `
    <span class="brand-logo-shell">
      <img class="brand-logo" src="${officialLogo}" alt="Mega Trading Corporation">
    </span>
  `;
};

setOfficialBrandLogo(document.querySelector('.site-header .brand'));
setOfficialBrandLogo(document.querySelector('.site-footer .brand'));

// Favicon usando el mismo recurso oficial para mantener consistencia de marca.
let favicon = document.querySelector('link[rel="icon"]');
if (!favicon) {
  favicon = document.createElement('link');
  favicon.rel = 'icon';
  document.head.appendChild(favicon);
}
favicon.type = 'image/webp';
favicon.href = officialLogo;

let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
if (!appleTouchIcon) {
  appleTouchIcon = document.createElement('link');
  appleTouchIcon.rel = 'apple-touch-icon';
  document.head.appendChild(appleTouchIcon);
}
appleTouchIcon.href = officialLogo;
