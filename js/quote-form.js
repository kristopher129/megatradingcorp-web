(() => {
  const quoteEmail = 'cotizar@megatradingcorp.com';
  const endpoint = `https://formsubmit.co/ajax/${quoteEmail}`;
  const quoteSubject = 'Solicitud de cotización - Mega Trading Corporation';
  const MAX_TOTAL_PACKAGES = 100000;
  const MAX_PACKAGE_GROUPS = 100;
  const MAX_WEIGHT_KG = 1000000000;
  const MAX_DIMENSION_CM = 100000;

  const quoteMailBody = [
    'Hola,',
    '',
    'Quisiera solicitar una cotización para la siguiente operación:',
    '',
    'Nombre y apellido:',
    'Empresa:',
    'Correo electrónico:',
    'Teléfono:',
    'Origen:',
    'Destino:',
    'Tipo de carga:',
    'Peso total (kg):',
    'Número total de bultos:',
    '',
    'Distribución de bultos:',
    'Indique cada grupo como: cantidad de bultos x largo x ancho x alto (medidas en cm).',
    'Grupo 1:',
    'Grupo 2 (si aplica):',
    'Grupo 3 (si aplica):',
    '',
    'Servicio requerido:',
    'Información adicional:',
    '',
    'Gracias.'
  ].join('\n');
  const quoteMailto = `mailto:${quoteEmail}?subject=${encodeURIComponent(quoteSubject)}&body=${encodeURIComponent(quoteMailBody)}`;

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
            <input id="quote-name" name="Nombre" type="text" autocomplete="name" maxlength="120" required>
          </div>

          <div class="quote-field">
            <label for="quote-company">Empresa <span>(opcional)</span></label>
            <input id="quote-company" name="Empresa" type="text" autocomplete="organization" maxlength="160">
          </div>

          <div class="quote-field">
            <label for="quote-email">Correo electrónico</label>
            <input id="quote-email" name="email" type="email" autocomplete="email" maxlength="254" required>
          </div>

          <div class="quote-field">
            <label for="quote-phone">Teléfono <span>(opcional)</span></label>
            <input id="quote-phone" name="Telefono" type="tel" autocomplete="tel" inputmode="tel" maxlength="40">
          </div>

          <div class="quote-field">
            <label for="quote-origin">Origen</label>
            <input id="quote-origin" name="Origen" type="text" placeholder="Ciudad, puerto o país" maxlength="140" required>
          </div>

          <div class="quote-field">
            <label for="quote-destination">Destino</label>
            <input id="quote-destination" name="Destino" type="text" placeholder="Ciudad, puerto o país" maxlength="140" required>
          </div>

          <div class="quote-field quote-field-full">
            <label for="quote-cargo">Tipo de carga</label>
            <input id="quote-cargo" name="Tipo_de_carga" type="text" placeholder="Ej. maquinaria, repuestos, textiles" maxlength="180" required>
          </div>

          <div class="quote-field">
            <label for="quote-weight">Peso total <span>(kg)</span></label>
            <div class="quote-unit-input">
              <input id="quote-weight" name="Peso_total_kg" type="text" inputmode="decimal" autocomplete="off" maxlength="18" placeholder="Ej. 850" required>
              <span>kg</span>
            </div>
          </div>

          <div class="quote-field">
            <label for="quote-packages">Número total de bultos</label>
            <input id="quote-packages" name="Numero_total_bultos" type="text" inputmode="numeric" autocomplete="off" maxlength="6" placeholder="Ej. 3" required>
          </div>

          <section class="quote-package-section quote-field-full" id="quote-package-section" hidden aria-labelledby="quote-package-title">
            <div class="quote-package-heading">
              <div>
                <h3 id="quote-package-title">Medidas de los bultos</h3>
                <p>Agrupe los bultos que tengan las mismas dimensiones. Todas las medidas deben ingresarse en centímetros.</p>
              </div>
              <div class="quote-package-progress" id="quote-package-progress" aria-live="polite"></div>
            </div>

            <div class="quote-package-groups" id="quote-package-groups"></div>

            <div class="quote-package-actions">
              <button class="quote-add-package" id="quote-add-package" type="button">+ Añadir otras medidas</button>
              <p id="quote-package-message" class="quote-package-message" aria-live="polite"></p>
            </div>
          </section>

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
            <textarea id="quote-details" name="Informacion_adicional" maxlength="3000" placeholder="Fechas estimadas, cantidades, características de la carga u otros datos relevantes."></textarea>
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
  const weightInput = modal.querySelector('#quote-weight');
  const packageTotalInput = modal.querySelector('#quote-packages');
  const packageSection = modal.querySelector('#quote-package-section');
  const packageGroups = modal.querySelector('#quote-package-groups');
  const packageProgress = modal.querySelector('#quote-package-progress');
  const packageMessage = modal.querySelector('#quote-package-message');
  const addPackageButton = modal.querySelector('#quote-add-package');
  let lastFocusedElement = null;
  let groupSequence = 0;

  const parseInteger = (value) => {
    const normalized = String(value || '').trim();
    if (!/^\d+$/.test(normalized)) return null;
    const number = Number(normalized);
    return Number.isSafeInteger(number) ? number : null;
  };

  const parseDecimal = (value) => {
    const normalized = String(value || '').trim().replace(',', '.');
    if (!/^\d+(?:\.\d{1,3})?$/.test(normalized)) return null;
    const number = Number(normalized);
    return Number.isFinite(number) ? number : null;
  };

  const formatDecimal = (number) => Number(number).toLocaleString('es-PE', {
    maximumFractionDigits: 3,
    useGrouping: false
  });

  const cleanIntegerInput = (input) => {
    const cleaned = input.value.replace(/\D/g, '').slice(0, 6);
    if (input.value !== cleaned) input.value = cleaned;
  };

  const showStatus = (message, type) => {
    status.textContent = message;
    status.className = `quote-status is-visible ${type === 'success' ? 'is-success' : 'is-error'}`;
  };

  const clearStatus = () => {
    status.textContent = '';
    status.className = 'quote-status';
  };

  const validateWeight = () => {
    weightInput.setCustomValidity('');
    if (!weightInput.value.trim()) return false;
    const value = parseDecimal(weightInput.value);
    if (value === null || value <= 0) {
      weightInput.setCustomValidity('Ingrese un peso total válido mayor que 0. Puede usar punto o coma para los decimales.');
      return false;
    }
    if (value > MAX_WEIGHT_KG) {
      weightInput.setCustomValidity('El peso ingresado supera el límite permitido por el formulario.');
      return false;
    }
    return true;
  };

  const getTotalPackages = () => {
    const total = parseInteger(packageTotalInput.value);
    if (total === null || total < 1 || total > MAX_TOTAL_PACKAGES) return null;
    return total;
  };

  const validateTotalPackages = () => {
    packageTotalInput.setCustomValidity('');
    if (!packageTotalInput.value.trim()) return false;
    const total = parseInteger(packageTotalInput.value);
    if (total === null || total < 1) {
      packageTotalInput.setCustomValidity('Ingrese un número entero de bultos mayor que 0.');
      return false;
    }
    if (total > MAX_TOTAL_PACKAGES) {
      packageTotalInput.setCustomValidity(`El formulario admite hasta ${MAX_TOTAL_PACKAGES.toLocaleString('es-PE')} bultos por solicitud.`);
      return false;
    }
    return true;
  };

  const getGroupElements = () => Array.from(packageGroups.querySelectorAll('.quote-package-group'));

  const getGroupQuantity = (group) => parseInteger(group.querySelector('[data-package-quantity]').value);

  const getDistributedPackages = () => getGroupElements().reduce((sum, group) => {
    const quantity = getGroupQuantity(group);
    return sum + (quantity && quantity > 0 ? quantity : 0);
  }, 0);

  const validateDimension = (input, dimensionName) => {
    input.setCustomValidity('');
    if (!input.value.trim()) return false;
    const value = parseDecimal(input.value);
    if (value === null || value <= 0) {
      input.setCustomValidity(`Ingrese un ${dimensionName.toLowerCase()} válido mayor que 0 cm.`);
      return false;
    }
    if (value > MAX_DIMENSION_CM) {
      input.setCustomValidity(`El ${dimensionName.toLowerCase()} supera el límite permitido por el formulario.`);
      return false;
    }
    return true;
  };

  const getAllowedQuantityForGroup = (group) => {
    const total = getTotalPackages();
    if (!total) return 0;
    const others = getGroupElements().reduce((sum, currentGroup) => {
      if (currentGroup === group) return sum;
      const quantity = getGroupQuantity(currentGroup);
      return sum + (quantity && quantity > 0 ? quantity : 0);
    }, 0);
    return Math.max(0, total - others);
  };

  const validateGroup = (group) => {
    const quantityInput = group.querySelector('[data-package-quantity]');
    const lengthInput = group.querySelector('[data-package-length]');
    const widthInput = group.querySelector('[data-package-width]');
    const heightInput = group.querySelector('[data-package-height]');
    const quantity = parseInteger(quantityInput.value);
    const allowed = getAllowedQuantityForGroup(group);

    quantityInput.setCustomValidity('');
    if (!quantityInput.value.trim() || quantity === null || quantity < 1) {
      quantityInput.setCustomValidity('Ingrese una cantidad entera de bultos mayor que 0.');
    } else if (quantity > allowed) {
      quantityInput.setCustomValidity(`Solo quedan ${allowed} bulto${allowed === 1 ? '' : 's'} disponibles para este grupo.`);
    }

    const lengthValid = validateDimension(lengthInput, 'Largo');
    const widthValid = validateDimension(widthInput, 'Ancho');
    const heightValid = validateDimension(heightInput, 'Alto');

    return quantityInput.validationMessage === '' && lengthValid && widthValid && heightValid;
  };

  const updateGroupLabels = () => {
    getGroupElements().forEach((group, index) => {
      const title = group.querySelector('.quote-package-group-title');
      if (title) title.textContent = `Grupo ${index + 1}`;
    });
  };

  const validatePackageDistribution = () => {
    const total = getTotalPackages();
    if (!total) return false;

    const groups = getGroupElements();
    if (!groups.length) return false;

    let groupsValid = true;
    groups.forEach((group) => {
      if (!validateGroup(group)) groupsValid = false;
    });

    const distributed = getDistributedPackages();
    return groupsValid && distributed === total;
  };

  const updatePackageState = () => {
    const total = getTotalPackages();
    const groups = getGroupElements();

    if (!total) {
      packageSection.hidden = true;
      packageProgress.textContent = '';
      packageMessage.textContent = '';
      addPackageButton.disabled = true;
      if (submitButton.dataset.sending !== 'true') submitButton.disabled = false;
      return;
    }

    packageSection.hidden = false;
    if (!groups.length) createPackageGroup(1);

    const distributed = getDistributedPackages();
    const remaining = total - distributed;
    const currentGroups = getGroupElements();

    packageProgress.textContent = `Distribuidos: ${distributed} de ${total} · Pendientes: ${Math.max(0, remaining)}`;
    packageProgress.classList.toggle('is-complete', remaining === 0);
    packageProgress.classList.toggle('is-error', remaining < 0);

    currentGroups.forEach((group) => {
      const allowed = getAllowedQuantityForGroup(group);
      const hint = group.querySelector('[data-package-limit]');
      if (hint) hint.textContent = allowed > 0 ? `Máximo disponible: ${allowed}` : 'No quedan bultos disponibles';
      validateGroup(group);
    });

    const distributionValid = validatePackageDistribution();

    if (remaining > 0) {
      packageMessage.textContent = `Falta distribuir ${remaining} bulto${remaining === 1 ? '' : 's'}.`;
      packageMessage.className = 'quote-package-message is-warning';
    } else if (remaining < 0) {
      packageMessage.textContent = `Se han distribuido ${Math.abs(remaining)} bulto${Math.abs(remaining) === 1 ? '' : 's'} de más. Corrija las cantidades.`;
      packageMessage.className = 'quote-package-message is-error';
    } else if (!distributionValid) {
      packageMessage.textContent = 'La cantidad está completa. Falta revisar o completar las medidas de uno o más grupos.';
      packageMessage.className = 'quote-package-message is-warning';
    } else {
      packageMessage.textContent = 'Todos los bultos están distribuidos correctamente.';
      packageMessage.className = 'quote-package-message is-success';
    }

    addPackageButton.disabled = remaining <= 0 || currentGroups.length >= MAX_PACKAGE_GROUPS;
    if (submitButton.dataset.sending !== 'true') submitButton.disabled = !distributionValid;
  };

  function createPackageGroup(defaultQuantity = 1) {
    if (getGroupElements().length >= MAX_PACKAGE_GROUPS) return null;
    groupSequence += 1;
    const group = document.createElement('div');
    group.className = 'quote-package-group';
    group.dataset.packageGroup = String(groupSequence);
    group.innerHTML = `
      <div class="quote-package-group-head">
        <strong class="quote-package-group-title">Grupo</strong>
        <button class="quote-remove-package" type="button" aria-label="Eliminar este grupo de medidas">Eliminar</button>
      </div>
      <div class="quote-package-group-grid">
        <div class="quote-field quote-package-quantity-field">
          <label>Cantidad de bultos</label>
          <input type="text" inputmode="numeric" autocomplete="off" maxlength="6" value="${defaultQuantity}" data-package-quantity required>
          <small data-package-limit></small>
        </div>
        <div class="quote-field">
          <label>Largo <span>(cm)</span></label>
          <div class="quote-unit-input">
            <input type="text" inputmode="decimal" autocomplete="off" maxlength="14" placeholder="Ej. 80" data-package-length required>
            <span>cm</span>
          </div>
        </div>
        <div class="quote-field">
          <label>Ancho <span>(cm)</span></label>
          <div class="quote-unit-input">
            <input type="text" inputmode="decimal" autocomplete="off" maxlength="14" placeholder="Ej. 60" data-package-width required>
            <span>cm</span>
          </div>
        </div>
        <div class="quote-field">
          <label>Alto <span>(cm)</span></label>
          <div class="quote-unit-input">
            <input type="text" inputmode="decimal" autocomplete="off" maxlength="14" placeholder="Ej. 50" data-package-height required>
            <span>cm</span>
          </div>
        </div>
      </div>
    `;

    packageGroups.appendChild(group);
    updateGroupLabels();

    const quantityInput = group.querySelector('[data-package-quantity]');
    const dimensionInputs = Array.from(group.querySelectorAll('[data-package-length], [data-package-width], [data-package-height]'));
    const removeButton = group.querySelector('.quote-remove-package');

    quantityInput.addEventListener('input', () => {
      cleanIntegerInput(quantityInput);
      updatePackageState();
    });

    dimensionInputs.forEach((input) => {
      input.addEventListener('input', updatePackageState);
      input.addEventListener('blur', updatePackageState);
    });

    removeButton.addEventListener('click', () => {
      group.remove();
      if (!getGroupElements().length && getTotalPackages()) createPackageGroup(1);
      updateGroupLabels();
      updatePackageState();
    });

    return group;
  }

  const getPackageSummary = () => getGroupElements().map((group, index) => {
    const quantity = getGroupQuantity(group);
    const length = parseDecimal(group.querySelector('[data-package-length]').value);
    const width = parseDecimal(group.querySelector('[data-package-width]').value);
    const height = parseDecimal(group.querySelector('[data-package-height]').value);
    return `${index + 1}. ${quantity} bulto${quantity === 1 ? '' : 's'}: ${formatDecimal(length)} x ${formatDecimal(width)} x ${formatDecimal(height)} cm`;
  }).join('\n');

  const resetPackageSection = () => {
    packageGroups.innerHTML = '';
    groupSequence = 0;
    packageSection.hidden = true;
    packageProgress.textContent = '';
    packageMessage.textContent = '';
    packageMessage.className = 'quote-package-message';
    addPackageButton.disabled = true;
  };

  weightInput.addEventListener('input', () => {
    validateWeight();
  });
  weightInput.addEventListener('blur', validateWeight);

  packageTotalInput.addEventListener('input', () => {
    cleanIntegerInput(packageTotalInput);
    validateTotalPackages();
    updatePackageState();
  });
  packageTotalInput.addEventListener('blur', () => {
    validateTotalPackages();
    updatePackageState();
  });

  addPackageButton.addEventListener('click', () => {
    const total = getTotalPackages();
    if (!total) return;
    const remaining = total - getDistributedPackages();
    if (remaining <= 0) return;
    createPackageGroup(1);
    updatePackageState();
  });

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

  // Los navegadores no exponen una confirmación fiable de que un manejador
  // mailto se abrió. Usamos señales de pérdida de foco/visibilidad y, si la
  // página sigue activa, mostramos el formulario web como respaldo.
  const tryMailtoWithFallback = (trigger) => {
    let handoffDetected = false;
    let finished = false;

    const markHandoff = () => {
      handoffDetected = true;
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') markHandoff();
    };

    const cleanup = () => {
      window.removeEventListener('blur', markHandoff);
      document.removeEventListener('visibilitychange', handleVisibility);
    };

    window.addEventListener('blur', markHandoff);
    document.addEventListener('visibilitychange', handleVisibility);

    window.location.href = quoteMailto;

    window.setTimeout(() => {
      if (finished) return;
      finished = true;
      cleanup();

      if (!handoffDetected && document.visibilityState === 'visible' && document.hasFocus()) {
        openModal(trigger);
      }
    }, 1400);
  };

  const bindQuoteButtons = () => {
    document.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      const pointsToQuoteEmail = href.toLowerCase().startsWith('mailto:') && href.toLowerCase().includes(quoteEmail.toLowerCase());
      const pointsToQuoteForm = href === '#cotizacion';
      if (!pointsToQuoteEmail && !pointsToQuoteForm) return;
      if (link.dataset.quoteBound === 'true') return;

      link.dataset.quoteBound = 'true';
      link.setAttribute('href', quoteMailto);
      link.setAttribute('data-quote-fallback', 'form');
      link.addEventListener('click', (event) => {
        event.preventDefault();
        tryMailtoWithFallback(link);
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

    const weightValid = validateWeight();
    const packageTotalValid = validateTotalPackages();
    const packageDistributionValid = packageTotalValid && validatePackageDistribution();
    updatePackageState();

    if (!form.checkValidity() || !weightValid || !packageTotalValid || !packageDistributionValid) {
      if (!packageDistributionValid && packageTotalValid) {
        showStatus('Revise la distribución de bultos: la suma de cantidades debe coincidir con el total y todas las medidas deben estar completas.', 'error');
      }
      form.reportValidity();
      return;
    }

    const originalButtonText = submitButton.textContent;
    submitButton.dataset.sending = 'true';
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const weight = parseDecimal(weightInput.value);
    const totalPackages = getTotalPackages();
    payload.Peso_total_kg = `${formatDecimal(weight)} kg`;
    payload.Numero_total_bultos = String(totalPackages);
    payload.Distribucion_de_bultos = getPackageSummary();
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
      resetPackageSection();
      showStatus('Solicitud enviada. Nuestro equipo podrá revisar la información y responder al correo indicado.', 'success');
    } catch (error) {
      console.error('Error al enviar la solicitud de cotización:', error);
      showStatus(`No pudimos enviar la solicitud en este momento. Puede escribir directamente a ${quoteEmail}.`, 'error');
    } finally {
      submitButton.dataset.sending = 'false';
      submitButton.textContent = originalButtonText;
      updatePackageState();
    }
  });
})();
