export function initProfileToggle() {
  try {
    const profileToggleButton = document.getElementById('profile-toggle');
    if (!profileToggleButton) return;

    const body = document.body;
    const storageKey = 'profileModePreference';
    const savedMode = localStorage.getItem(storageKey) || 'artist';

    const applyProfileMode = (mode) => {
      body.classList.remove('mode-artist', 'mode-technical');

      if (mode === 'technical') {
        body.classList.add('mode-technical');
        profileToggleButton.classList.add('is-active');
        profileToggleButton.setAttribute('aria-checked', 'true');
      } else {
        body.classList.add('mode-artist');
        profileToggleButton.classList.remove('is-active');
        profileToggleButton.setAttribute('aria-checked', 'false');
      }

      localStorage.setItem(storageKey, mode);
    };

    // Aplicar el perfil inicial de forma estática en la carga
    applyProfileMode(savedMode);

    // Animación de transición fluida usando FLIP (First, Last, Invert, Play)
    const triggerHeroTransition = (newMode) => {
      const textEl = document.querySelector('.hero-text-content');
      const visualEl = document.querySelector('.hero-visual-content');
      const wrapperEl = document.querySelector('.hero-content-wrapper');

      if (!textEl || !visualEl || !wrapperEl) {
        applyProfileMode(newMode);
        return;
      }

      // Desactivar clics en el botón durante la transición
      profileToggleButton.style.pointerEvents = 'none';

      // 1. Ocultar el texto (fade out)
      textEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      textEl.style.opacity = '0';
      textEl.style.transform = 'translateY(15px)';

      // 2. Esperar al fade out para realizar el cambio de layout y FLIP
      setTimeout(() => {
        // First: Capturar posición inicial del elemento visual (video)
        const firstRect = visualEl.getBoundingClientRect();

        // 3. Cambiar el perfil (se altera el orden del flexbox y las variables de color en CSS)
        applyProfileMode(newMode);

        // Last: Capturar la posición final del elemento visual
        const lastRect = visualEl.getBoundingClientRect();

        // Calcular la distancia recorrida
        const deltaX = firstRect.left - lastRect.left;
        const deltaY = firstRect.top - lastRect.top;

        if (deltaX !== 0 || deltaY !== 0) {
          // Invert: Mover el video instantáneamente a su posición de inicio sin transiciones
          visualEl.style.transition = 'none';
          visualEl.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

          // Forzar reflow para que el navegador registre la posición invertida
          visualEl.offsetHeight;

          // Play: Activar la animación de deslizamiento hacia su nueva posición real
          visualEl.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
          visualEl.style.transform = 'none';
        }

        // 4. Esperar a que la animación de movimiento del video termine
        setTimeout(() => {
          // Limpiar estilos temporales del video
          visualEl.style.transition = '';
          visualEl.style.transform = '';

          // Actualizar el estado de limitación del grid si aplica
          window.dispatchEvent(new Event('resize'));

          // 5. Volver a mostrar el texto (fade in) en su nueva columna
          textEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          textEl.style.opacity = '1';
          textEl.style.transform = 'none';

          // Rehabilitar el botón al concluir la animación completa
          setTimeout(() => {
            textEl.style.transition = '';
            textEl.style.transform = '';
            profileToggleButton.style.pointerEvents = '';
          }, 350);

        }, 500);

      }, 250);
    };

    profileToggleButton.addEventListener('click', () => {
      const isTechnical = body.classList.contains('mode-technical');
      const newMode = isTechnical ? 'artist' : 'technical';
      triggerHeroTransition(newMode);
    });
  } catch (error) {
    console.error('Error al iniciar el toggle de perfil artista/técnico:', error);
  }
}
