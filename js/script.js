// script.js

// Espera a que todo el contenido HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // ===== MANEJO DEL TEXTO CÍCLICO EN EL LOGO ===== 
    const initLogoTextCycle = () => {
        const logoLink = document.querySelector('.header-logo a');
        if (!logoLink) {
            console.warn('Elemento del logo no encontrado para el texto cíclico.');
            return;
        }

        const textOptions = ["Facundo Villarreal", "facu041294", "Desarrollador de Software", "Technical Artist"];
        let currentIndex = 0;
        let textTimer;
        const displayDuration = 3000; // Tiempo que cada texto es visible (3 segundos)
        const fadeDuration = 400;     // Duración del fade out/in en ms (debe coincidir con la transición CSS)

        const cycleText = () => {
            // 1. Iniciar Fade Out del texto actual
            logoLink.classList.add('text-fading');

            // 2. Esperar a que termine el fade out para cambiar el texto y hacer fade in
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % textOptions.length;
                logoLink.textContent = textOptions[currentIndex];
                // Aplicar color según el modo (lo haremos más adelante con un observador)
                // logoLink.style.color = getCurrentDynamicColor(); // Placeholder

                // 3. Iniciar Fade In del nuevo texto
                logoLink.classList.remove('text-fading');
            }, fadeDuration); // Esperar la duración del fade

            // 4. Programar el próximo ciclo completo (duración visible + duración del fade)
            // El próximo ciclo comienza a contar desde que el texto actual se hizo visible.
            textTimer = setTimeout(cycleText, displayDuration + fadeDuration);
        };

        // Iniciar el ciclo: Mostrar el primer texto inmediatamente
        logoLink.textContent = textOptions[currentIndex];
        // logoLink.style.color = getCurrentDynamicColor(); // Aplicar color inicial

        // Programar el primer ciclo de fade out/in
        textTimer = setTimeout(cycleText, displayDuration);
    };


    // ===== MANEJO DEL FOOTER (Actualizar año) =====
    const updateFooterYear = () => {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    };

    // ===== MANEJO DEL MODO CLARO/OSCURO (THEME) =====
const initAdvancedThemeManager = () => {
    const themeButton = document.getElementById('theme-manager-button');
    const body = document.body;
    const iconSpan = themeButton?.querySelector('.icon-theme-current img.theme-icon-svg'); // Para cambiar el SVG

    // Define los estados y los SVGs (asegúrate que las rutas sean correctas)
    const themes = [
        { name: 'light', icon: 'assets/img/sun-svgrepo-com.svg', label: 'Tema Claro' },
        { name: 'dark', icon: 'assets/img/moon-svgrepo-com.svg', label: 'Tema Oscuro' },
        { name: 'system', icon: 'assets/img/monitor-sun-svgrepo-com.svg', label: 'Tema del Sistema' } // Necesitarás un SVG de monitor
    ];
    const storageKey = 'themePreferenceAdvanced';
    let currentThemeIndex; // 0: light, 1: dark, 2: system

    const applyTheme = (themeName) => {
        // Quitar clases de tema anteriores
        body.classList.remove('mode-light', 'mode-dark');
        // Actualizar el atributo data-theme para CSS (opcional, pero útil)
        // body.dataset.theme = themeName; // ej. <body data-theme="light">

        let effectiveTheme = themeName;

        if (themeName === 'system') {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            effectiveTheme = prefersDark ? 'dark' : 'light';
            // No guardamos 'system' como clase directa en el body, sino el resultado
        }

        if (effectiveTheme === 'dark') {
            body.classList.add('mode-dark');
        } else {
            body.classList.add('mode-light');
        }

        // Actualizar icono y aria-label del botón
        const themeConfig = themes.find(t => t.name === themeName);
        if (themeButton && iconSpan && themeConfig) {
            iconSpan.src = themeConfig.icon;
            iconSpan.alt = themeConfig.label; // El alt de la imagen
            themeButton.setAttribute('aria-label', `Cambiar tema: Actual es ${themeConfig.label}`);
            themeButton.setAttribute('title', `Tema actual: ${themeConfig.label}`); // Tooltip
        }
    };

    const cycleTheme = () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex].name;
        localStorage.setItem(storageKey, newTheme);
        applyTheme(newTheme);
    };

    // Inicialización
    const savedThemeName = localStorage.getItem(storageKey);
    const initialThemeConfig = themes.find(t => t.name === savedThemeName) || themes[2]; // Default a 'system'

    currentThemeIndex = themes.indexOf(initialThemeConfig);
    applyTheme(initialThemeConfig.name);

    // Listener para el botón
    if (themeButton) {
        themeButton.addEventListener('click', cycleTheme);
    }

    // Listener para cambios en la preferencia del sistema operativo
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const currentStoredPref = localStorage.getItem(storageKey);
        if (currentStoredPref === 'system') {
            // Si el usuario tiene "sistema" seleccionado, actualizamos al cambio del OS
            applyTheme('system'); // Re-aplica para que recalcule light/dark
        }
        // Si el usuario eligió light o dark explícitamente, no hacemos nada con este evento.
    });
};
initAdvancedThemeManager();

    // ===== MANEJO DEL MODO ARTISTA/TÉCNICO (PROFILE) =====
    const initProfileToggle = () => {
        const profileToggleButton = document.getElementById('profile-toggle');
        const body = document.body;
        const storageKey = 'profileModePreference';
        const currentProfileMode = localStorage.getItem(storageKey);

        const applyProfileMode = (mode) => {
             if (mode === 'technical') {
                body.classList.remove('mode-artist');
                body.classList.add('mode-technical');
                profileToggleButton.classList.add('is-active');
                profileToggleButton.setAttribute('aria-checked', 'true');
                localStorage.setItem(storageKey, 'technical');
            } else { // Default a artist
                body.classList.remove('mode-technical');
                body.classList.add('mode-artist');
                profileToggleButton.classList.remove('is-active');
                profileToggleButton.setAttribute('aria-checked', 'false');
                localStorage.setItem(storageKey, 'artist');
            }
        };

        applyProfileMode(currentProfileMode || 'artist'); // Default 'artist'

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

            if (images.length === 0 || controls.length === 0) return;

            // Activar la primera imagen y control por defecto
            if (images.length > 0 && controls.length > 0) {
                images[0].classList.add('active');
                controls[0].classList.add('active');
            }


            controls.forEach(control => {
                control.addEventListener('click', () => {
                    const targetLayer = control.getAttribute('data-target-layer');

                    slider.querySelector('.slider-control-item.active')?.classList.remove('active');
                    slider.querySelector('.slider-image.active')?.classList.remove('active');

                    control.classList.add('active');
                    const newActiveImage = slider.querySelector(`.slider-image[data-layer="${targetLayer}"]`);
                    if (newActiveImage) {
                        newActiveImage.classList.add('active');
                    }
                });
            });
        });
    };

    // ===== MANEJO DEL FORMULARIO DE CONTACTO DESPLEGABLE =====
    const initContactFormToggle = () => {
        const checkbox = document.getElementById('contact-toggle-checkbox');
        const toggleButtonLabel = document.querySelector('label[for="contact-toggle-checkbox"]');
        const formContainer = document.getElementById('contact-form-container');
        const form = formContainer?.querySelector('.actual-form');
        const thankYouMessage = formContainer?.querySelector('.thank-you-message');

        if (!checkbox || !toggleButtonLabel || !formContainer || !form || !thankYouMessage) {
            console.warn('Elementos del formulario de contacto no encontrados.');
            return;
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            toggleButtonLabel.setAttribute('aria-expanded', isChecked.toString());
            formContainer.setAttribute('aria-hidden', (!isChecked).toString());

            if (isChecked) {
                // Cuando se abre, asegurar que el formulario esté visible y el "gracias" oculto
                form.style.display = 'block';
                thankYouMessage.style.display = 'none';
                // Opcional: enfocar el primer campo
                form.querySelector('input, textarea')?.focus();
            }
        });

        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevenir envío tradicional
            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Éxito
                    form.style.display = 'none'; // Ocultar formulario
                    thankYouMessage.style.display = 'block'; // Mostrar mensaje de gracias
                    form.reset(); // Limpiar el formulario

                    // Opcional: cerrar el desplegable después de un tiempo
                    setTimeout(() => {
                        checkbox.checked = false;
                        // Disparar manualmente el evento change para actualizar aria y estilos
                        const changeEvent = new Event('change');
                        checkbox.dispatchEvent(changeEvent);
                    }, 4000); // Cerrar después de 4 segundos

                } else {
                    // Error de Formspree o red
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.');
                    }
                }
            } catch (error) {
                // Error de red
                alert('Error de red. Por favor, verifica tu conexión e inténtalo de nuevo.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    };


    // --- Inicializar todas las funcionalidades ---
    updateFooterYear();
    initAdvancedThemeManager();
    initProfileToggle();
    initImageSliders();
    initContactFormToggle();
    initLogoTextCycle();

}); // Fin del DOMContentLoaded