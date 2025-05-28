// script.js

// Espera a que todo el contenido HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // ===== MANEJO DEL FOOTER =====
    const updateFooterYear = () => {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    };

    // ===== MANEJO DEL MODO CLARO/OSCURO (THEME) =====
    const initThemeToggle = () => {
        const themeToggleButton = document.getElementById('theme-toggle');
        const body = document.body;
        const currentTheme = localStorage.getItem('theme'); // Revisa si hay tema guardado

        // Función para aplicar el tema
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                body.classList.remove('mode-light');
                body.classList.add('mode-dark');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('mode-dark');
                body.classList.add('mode-light');
                localStorage.setItem('theme', 'light');
            }
        };

        // Aplicar tema inicial: Guardado > Preferencia OS > Default (Light)
        if (currentTheme) {
            applyTheme(currentTheme);
        } else {
            // Comprobar preferencia del sistema operativo
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }

        // Listener para el botón
        if (themeToggleButton) {
            themeToggleButton.addEventListener('click', () => {
                if (body.classList.contains('mode-dark')) {
                    applyTheme('light');
                } else {
                    applyTheme('dark');
                }
            });
        }

        // Escuchar cambios en la preferencia del OS (opcional pero bueno)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
           // Solo cambia si no hay preferencia guardada explícitamente
           if (!localStorage.getItem('theme')) {
               applyTheme(e.matches ? 'dark' : 'light');
           }
        });
    };

    // ===== MANEJO DEL MODO ARTISTA/TÉCNICO (PROFILE) =====
    const initProfileToggle = () => {
        const profileToggleButton = document.getElementById('profile-toggle');
        const body = document.body;
        const currentProfileMode = localStorage.getItem('profileMode'); // Revisa si hay modo guardado

        // Función para aplicar el modo de perfil
        const applyProfileMode = (mode) => {
             if (mode === 'technical') {
                body.classList.remove('mode-artist');
                body.classList.add('mode-technical');
                localStorage.setItem('profileMode', 'technical');
            } else { // Default a artist
                body.classList.remove('mode-technical');
                body.classList.add('mode-artist');
                localStorage.setItem('profileMode', 'artist');
            }
        };

        // Aplicar modo inicial guardado o default (Artist)
        applyProfileMode(currentProfileMode || 'artist'); // Default 'artist' si no hay nada guardado

        // Listener para el botón
        if (profileToggleButton) {
            profileToggleButton.addEventListener('click', () => {
                if (body.classList.contains('mode-technical')) {
                    applyProfileMode('artist');
                } else {
                    applyProfileMode('technical');
                }
            });
        }
    };

    // ===== MANEJO DE LOS SLIDERS DE IMÁGENES =====
    const initImageSliders = () => {
        const sliders = document.querySelectorAll('.image-slider');

        sliders.forEach(slider => {
            const images = slider.querySelectorAll('.slider-image');
            const controls = slider.querySelectorAll('.slider-control-item');

            if (images.length === 0 || controls.length === 0) return; // No hacer nada si no hay imágenes o controles

            controls.forEach(control => {
                control.addEventListener('click', () => {
                    const targetLayer = control.getAttribute('data-target-layer');

                    // Desactivar control y imagen activos actuales DENTRO de este slider
                    const currentActiveControl = slider.querySelector('.slider-control-item.active');
                    const currentActiveImage = slider.querySelector('.slider-image.active');
                    if (currentActiveControl) currentActiveControl.classList.remove('active');
                    if (currentActiveImage) currentActiveImage.classList.remove('active');

                    // Activar el nuevo control
                    control.classList.add('active');

                    // Encontrar y activar la nueva imagen DENTRO de este slider
                    const newActiveImage = slider.querySelector(`.slider-image[data-layer="${targetLayer}"]`);
                    if (newActiveImage) {
                        newActiveImage.classList.add('active');
                    }
                });
            });
        });
    };


    // --- Inicializar todas las funcionalidades ---
    updateFooterYear();
    initThemeToggle();
    initProfileToggle();
    initImageSliders();

}); // Fin del DOMContentLoaded