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

// Carrusel visual principal inspirado en el comportamiento de un hero corporativo deslizante.
if (!document.querySelector('link[href="css/hero-slider.css"]')) {
  const sliderStyles = document.createElement('link');
  sliderStyles.rel = 'stylesheet';
  sliderStyles.href = 'css/hero-slider.css';
  document.head.appendChild(sliderStyles);
}

const originalHero = document.querySelector('.hero');
if (originalHero) {
  originalHero.className = 'hero-slider';
  originalHero.setAttribute('aria-roledescription', 'carrusel');
  originalHero.setAttribute('aria-label', 'Principales soluciones de Mega Trading Corporation');

  originalHero.innerHTML = `
    <div class="hero-slider-track">
      <article class="hero-slide is-active" data-slide="0" role="group" aria-roledescription="diapositiva" aria-label="1 de 3" aria-hidden="false">
        <div class="hero-slide-media" aria-hidden="true">
          <img class="hero-slide-image" src="https://images.unsplash.com/photo-1774929108070-b60d3879e071?auto=format&fit=crop&fm=jpg&q=82&w=2000" alt="" fetchpriority="high" decoding="async">
          <div class="hero-slide-overlay"></div>
        </div>
        <div class="container">
          <div class="hero-slide-content">
            <p class="eyebrow">Operador logístico integral · Comercio exterior</p>
            <h1>Logística integral <span>de principio a fin.</span></h1>
            <p class="hero-slide-lead">Coordinamos cada etapa de su operación de importación y exportación, desde el origen de la carga hasta su entrega en destino.</p>
            <div class="hero-actions">
              <a class="button button-primary" href="mailto:${salesEmail}">Solicitar cotización</a>
              <a class="button button-ghost" href="#servicios">Conocer servicios</a>
            </div>
            <p class="hero-slider-note">Un solo punto de contacto para toda su operación logística.</p>
          </div>
        </div>
      </article>

      <article class="hero-slide" data-slide="1" role="group" aria-roledescription="diapositiva" aria-label="2 de 3" aria-hidden="true">
        <div class="hero-slide-media" aria-hidden="true">
          <img class="hero-slide-image" src="https://images.unsplash.com/photo-1774698078446-59299e016718?auto=format&fit=crop&fm=jpg&q=82&w=2000" alt="" loading="lazy" decoding="async">
          <div class="hero-slide-overlay"></div>
        </div>
        <div class="container">
          <div class="hero-slide-content">
            <p class="eyebrow">Transporte multimodal · Nacional e internacional</p>
            <h2>Transporte marítimo, <span>aéreo y terrestre.</span></h2>
            <p class="hero-slide-lead">Gestionamos soluciones de transporte de acuerdo con las características, tiempos y destino de cada operación.</p>
            <div class="hero-actions">
              <a class="button button-primary" href="#servicios">Ver soluciones de transporte</a>
              <a class="button button-ghost" href="mailto:${salesEmail}">Solicitar cotización</a>
            </div>
          </div>
        </div>
      </article>

      <article class="hero-slide" data-slide="2" role="group" aria-roledescription="diapositiva" aria-label="3 de 3" aria-hidden="true">
        <div class="hero-slide-media" aria-hidden="true">
          <img class="hero-slide-image" src="https://images.unsplash.com/photo-1774929104515-ac1b747a8c4c?auto=format&fit=crop&fm=jpg&q=82&w=2000" alt="" loading="lazy" decoding="async">
          <div class="hero-slide-overlay"></div>
        </div>
        <div class="container">
          <div class="hero-slide-content">
            <p class="eyebrow">Aduanas · Permisos y autorizaciones</p>
            <h2>Gestión aduanera y <span>permisos de importación.</span></h2>
            <p class="hero-slide-lead">Acompañamos su operación con gestión aduanera, asesoría y coordinación de permisos y autorizaciones para mercancías restringidas.</p>
            <div class="hero-actions">
              <a class="button button-primary" href="mailto:${salesEmail}">Consultar una operación</a>
              <a class="button button-ghost" href="#servicios">Conocer servicios</a>
            </div>
          </div>
        </div>
      </article>
    </div>

    <button class="hero-slider-control hero-slider-prev" type="button" aria-label="Diapositiva anterior">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button class="hero-slider-control hero-slider-next" type="button" aria-label="Siguiente diapositiva">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
    </button>

    <div class="hero-slider-dots" role="tablist" aria-label="Elegir diapositiva">
      <button class="hero-slider-dot is-active" type="button" data-slide-to="0" aria-label="Mostrar diapositiva 1" aria-selected="true"></button>
      <button class="hero-slider-dot" type="button" data-slide-to="1" aria-label="Mostrar diapositiva 2" aria-selected="false"></button>
      <button class="hero-slider-dot" type="button" data-slide-to="2" aria-label="Mostrar diapositiva 3" aria-selected="false"></button>
    </div>
  `;

  const slides = Array.from(originalHero.querySelectorAll('.hero-slide'));
  const dots = Array.from(originalHero.querySelectorAll('.hero-slider-dot'));
  const previousButton = originalHero.querySelector('.hero-slider-prev');
  const nextButton = originalHero.querySelector('.hero-slider-next');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const slideInterval = 6500;
  let activeSlide = 0;
  let autoplayTimer = null;

  const showSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeSlide;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === activeSlide;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (reducedMotion || document.hidden) return;
    autoplayTimer = window.setInterval(() => showSlide(activeSlide + 1), slideInterval);
  };

  previousButton?.addEventListener('click', () => {
    showSlide(activeSlide - 1);
    startAutoplay();
  });

  nextButton?.addEventListener('click', () => {
    showSlide(activeSlide + 1);
    startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.slideTo));
      startAutoplay();
    });
  });

  originalHero.addEventListener('mouseenter', stopAutoplay);
  originalHero.addEventListener('mouseleave', startAutoplay);
  originalHero.addEventListener('focusin', stopAutoplay);
  originalHero.addEventListener('focusout', (event) => {
    if (!originalHero.contains(event.relatedTarget)) startAutoplay();
  });

  originalHero.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      showSlide(activeSlide - 1);
      startAutoplay();
    }
    if (event.key === 'ArrowRight') {
      showSlide(activeSlide + 1);
      startAutoplay();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  startAutoplay();
}
