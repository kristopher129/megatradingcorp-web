(() => {
  const quoteEmail = 'cotizar@megatradingcorp.com';
  const endpoint = `https://formsubmit.co/ajax/${quoteEmail}`;

  if (!document.querySelector('link[href="css/quote-form.css"]')) {
    const formStyles = document.createElement('link');
    formStyles.rel = 'stylesheet';
    formStyles.href = 'css/quote-form.css';
    document.head.appendChild(formStyles);
  }

  const modal = document.createElement('div');
  modal.className = 'quote-modal';
  modal.id = 'cotizacion';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="quote-modal-backdrop" data-quote-close></div>
    <section class="quote-dialog" role="dialog" aria-modal="true" aria-labelledby="quote-title" aria-describedby="quote-description">
      <div class="quote-dialog-header">
        <p class="eyebrow">Solicitud de cotización</p>
        <h2 id="quote-title">Cuéntenos sobre su operación.</h2>
        <p id="quote-description">Complete los datos principales y nuestro equipo podrá revisar su requerimiento logístico.</p>
        <button class="quote-close" type="button" data-quote-close aria-label="Cerrar formulario">&times;</button>
      </div>

      <form class="quote-form" id="quote-form" novalidate>
        <div class="quote-form-grid">
          <div class="quote-field">
            <label for="quote-name">Nombre y apellido</label>
            <input id="quote-name" name="Nombre" type="text" autocomplete="name" required>
          </div>

          <div class="quote-field">
            <label for="quote-company">Empresa <span>(opcional)</span></label>
            <input id="quote-company" name="Empresa" type="text" autocomplete="organization">
          </div>

          <div class="quote-field">
            <label for="quote-email">Correo electrónico</label>
            <input id="quote-email" name="email" type="email" autocomplete="email" required>
          </div>

          <div class="quote-field">
            <label for="quote-phone">Teléfono <span>(opcional)</span></label>
            <input id="quote-phone" name="Telefono" type="tel" autocomplete="tel" inputmode="tel">
          </div>

          <div class="quote-field">
            <label for="quote-origin">Origen</label>
            <input id="quote-origin" name="Origen" type="text" placeholder="Ciudad, puerto o país" required>
          </div>

          <div class="quote-field">
            <label for="quote-destination">Destino</label>
            <input id="quote-destination" name="Destino" type="text" placeholder="Ciudad, puerto o país" required>
          </div>

          <div class="quote-field">
            <label for="quote-cargo">Tipo de carga</label>
            <input id="quote-cargo" name="Tipo_de_carga" type="text" placeholder="Ej. maquinaria, repuestos, textiles" required>
          </div>

          <div class="quote-field">
            <label for="quote-volume">Peso / volumen <span>(opcional)</span></label>
            <input id="quote-volume" name="Peso_volumen" type="text" placeholder="Ej. 850 kg / 4.5 m³">
          </div>

          <div class="quote-field quote-field-full">
            <label for="quote-service">Servicio requerido</label>
            <select id="quote-service" name="Servicio_requerido" required>
              <option value="" selected disabled>Seleccione una opción</option>
              <option>Carga internacional</option>
              <option>Transporte marítimo</option>
              <option>Transporte aéreo</option>
              <option>Transporte terrestre</option>
              <option>Gestión aduanera</option>
              <option>Permisos para mercancías restringidas</option>
              <option>Almacenamiento</option>
              <option>Gestión logística integral</option>
              <option>Otro</option>
            </select>
          </div>

          <div class="quote-field quote-field-full">
            <label for="quote-details">Información adicional <span>(opcional)</span></label>
            <textarea id="quote-details" name="Informacion_adicional" placeholder="Fechas estimadas, cantidades, características de la carga u otros datos relevantes."></textarea>
          </div>

          <div class="quote-honey" aria-hidden="true">
            <label for="quote-website">No completar este campo</label>
            <input id="quote-website" name="_honey" type="text" tabindex="-1" autocomplete="off">
          </div>
        </div>

        <div class="quote-form-footer">
          <p class="quote-form-note">Los datos se utilizarán para atender esta solicitud de cotización. No incluya contraseñas, datos bancarios ni otra información sensible.</p>
          <button class="button button-primary quote-submit" type="submit">Enviar solicitud</button>
        </div>

        <div class="quote-status" role="status" aria-live="polite"></div>
      </form>
    </section>
  `;

  document.body.appendChild(modal);

  const form = modal.querySelector('#quote-form');
  const dialog = modal.querySelector('.quote-dialog');
  const submitButton = modal.querySelector('.quote-submit');
  const status = modal.querySelector('.quote-status');
  const firstField = modal.querySelector('#quote-name');
  let lastFocusedElement = null;

  const showStatus = (message, type) => {
    status.textContent = message;
    status.className = `quote-status is-visible ${type === 'success' ? 'is-success' : 'is-error'}`;
  };

  const clearStatus = () => {
    status.textContent = '';
    status.className = 'quote-status';
  };

  const openModal = (trigger) => {
    lastFocusedElement = trigger || document.activeElement;
    clearStatus();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('quote-modal-open');
    window.setTimeout(() => firstField?.focus(), 30);
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('quote-modal-open');
    lastFocusedElement?.focus?.();
  };

  const bindQuoteButtons = () => {
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (!href.toLowerCase().includes(quoteEmail.toLowerCase())) return;
      if (link.dataset.quoteBound === 'true') return;

      link.dataset.quoteBound = 'true';
      link.setAttribute('aria-haspopup', 'dialog');
      link.setAttribute('href', '#cotizacion');
      link.addEventListener('click', (event) => {
        event.preventDefault();
        openModal(link);
      });
    });
  };

  bindQuoteButtons();

  modal.querySelectorAll('[data-quote-close]').forEach((element) => {
    element.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      closeModal();
      return;
    }

    if (event.key === 'Tab') {
      const focusable = Array.from(dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]'))
        .filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearStatus();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload._subject = 'Nueva solicitud de cotización - Mega Trading Corporation';
    payload._template = 'table';
    payload._url = 'https://megatradingcorp.com/';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || data?.success === false || data?.success === 'false') {
        throw new Error(data?.message || 'No se pudo procesar la solicitud.');
      }

      form.reset();
      showStatus('Solicitud enviada. Nuestro equipo podrá revisar la información y responder al correo indicado.', 'success');
    } catch (error) {
      console.error('Error al enviar la solicitud de cotización:', error);
      showStatus(`No pudimos enviar la solicitud en este momento. Puede escribir directamente a ${quoteEmail}.`, 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
})();
