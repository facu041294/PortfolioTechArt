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

    applyProfileMode(savedMode);

    profileToggleButton.addEventListener('click', () => {
      const isTechnical = body.classList.contains('mode-technical');
      const newMode = isTechnical ? 'artist' : 'technical';
      applyProfileMode(newMode);
    });
  } catch (error) {
    console.error('Error al iniciar el toggle de perfil artista/técnico:', error);
  }
}
