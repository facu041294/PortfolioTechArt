export function initAdvancedThemeManager() {
  try {
    const themeButton = document.getElementById('theme-manager-button');
    if (!themeButton) return;

    const body = document.body;
    const iconWrapper = themeButton.querySelector('.icon-theme-current');
    const storageKey = 'themePreference';

    const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;

    const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-moon-icon lucide-sun-moon"><path d="M12 2v2"/><path d="M13 8.129A4 4 0 0 1 15.873 11"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/><path d="M9 8a5 5 0 1 0 7 7 7 7 0 1 1-7-7"/></svg>`;

    const systemSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-cog-icon lucide-monitor-cog"><path d="M12 17v4"/><path d="m14.305 7.53.923-.382"/><path d="m15.228 4.852-.923-.383"/><path d="m16.852 3.228-.383-.924"/><path d="m16.852 8.772-.383.923"/><path d="m19.148 3.228.383-.924"/><path d="m19.53 9.696-.382-.924"/><path d="m20.772 4.852.924-.383"/><path d="m20.772 7.148.924.383"/><path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><path d="M8 21h8"/><circle cx="18" cy="6" r="3"/></svg>`;

    const themes = [
      { name: 'light', icon: sunSVG, label: 'Tema Claro' },
      { name: 'dark', icon: moonSVG, label: 'Tema Oscuro' },
      { name: 'system', icon: systemSVG, label: 'Tema del Sistema' }
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
      if (iconWrapper && themeConfig) {
        iconWrapper.innerHTML = themeConfig.icon;
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
    const initialThemeConfig = themes.find(t => t.name === savedThemeName) || themes[2];
    currentThemeIndex = themes.indexOf(initialThemeConfig);
    applyTheme(initialThemeConfig.name);

    themeButton.addEventListener('click', cycleTheme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (localStorage.getItem(storageKey) === 'system') {
        applyTheme('system');
      }
    });
  } catch (error) {
    console.error('Error al iniciar el gestor de temas:', error);
  }
}
