export function initAdvancedThemeManager() {
  try {
    const themeButton = document.getElementById('theme-manager-button');
    if (!themeButton) return;

    const body = document.body;
    const iconElement = themeButton.querySelector('.theme-icon-svg');
    const storageKey = 'themePreference';

    const themes = [
      { name: 'light', icon: 'assets/img/sun-svgrepo-com.svg', label: 'Tema Claro' },
      { name: 'dark', icon: 'assets/img/moon-svgrepo-com.svg', label: 'Tema Oscuro' },
      { name: 'system', icon: 'assets/img/monitor-sun-svgrepo-com.svg', label: 'Tema del Sistema' }
    ];

    let currentThemeIndex;

    const applyTheme = (themeName) => {
      body.classList.remove('mode-light', 'mode-dark');

      let effectiveTheme = themeName;
      if (themeName === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        effectiveTheme = prefersDark ? 'dark' : 'light';
      }

      body.classList.add(effectiveTheme === 'dark' ? 'mode-dark' : 'mode-light');

      const themeConfig = themes.find(t => t.name === themeName);
      if (iconElement && themeConfig) {
        iconElement.src = themeConfig.icon;
        iconElement.alt = `Tema actual: ${themeConfig.label}`;
        themeButton.setAttribute('aria-label', `Cambiar tema. Actual es ${themeConfig.label}`);
        themeButton.setAttribute('title', `Tema actual: ${themeConfig.label}`);
      }
    };

    const cycleTheme = () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      const newTheme = themes[currentThemeIndex].name;
      localStorage.setItem(storageKey, newTheme);
      applyTheme(newTheme);
    };

    const savedThemeName = localStorage.getItem(storageKey);
    const initialThemeConfig = themes.find(t => t.name === savedThemeName) || themes[2]; // Default: 'system'
    currentThemeIndex = themes.indexOf(initialThemeConfig);
    applyTheme(initialThemeConfig.name);

    themeButton.addEventListener('click', cycleTheme);

    // Reacciona si el usuario cambia el tema del sistema operativo
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (localStorage.getItem(storageKey) === 'system') {
        applyTheme('system');
      }
    });
  } catch (error) {
    console.error('Error al iniciar el gestor de temas:', error);
  }
}
