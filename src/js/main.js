import { updateFooterYear } from './modules/updateFooterYear.js';
import { initAdvancedThemeManager } from './modules/advancedThemeManager.js';
import { initProfileToggle } from './modules/profileToggle.js';
import { initImageSliders } from './modules/imageSliders.js';
import { initLogoTextCycle } from './modules/logoTextCycle.js';
import { initContactFormToggle } from './modules/contactForm.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    updateFooterYear();
    initAdvancedThemeManager();
    initProfileToggle();
    initImageSliders();
    initLogoTextCycle();
    initContactFormToggle();
  } catch (error) {
    console.error('Error general al iniciar la página:', error);
  }
});

