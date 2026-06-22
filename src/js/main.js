import { initAdvancedThemeManager } from './modules/advancedThemeManager.js';
import { initProfileToggle } from './modules/profileToggle.js';
import { initImageSliders } from './modules/imageSliders.js';
import { initLogoTextCycle } from './modules/logoTextCycle.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    initAdvancedThemeManager();
    initProfileToggle();
    initImageSliders();
    initLogoTextCycle();
  } catch (error) {
    console.error('Error general al iniciar la página:', error);
  }
});

