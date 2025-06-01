// script.js

// Espera a que todo el contenido HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // ===== MANEJO DEL FOOTER (Actualizar año) =====
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
        // Usar 'themePreference' para evitar colisión con otros 'theme' de localStorage
        const storageKey = 'themePreference';
        const currentTheme = localStorage.getItem(storageKey);

        const applyTheme = (theme) => {
            if (theme === 'dark') {
                body.classList.remove('mode-light');
                body.classList.add('mode-dark');
                themeToggleButton.classList.add('is-active');
                themeToggleButton.setAttribute('aria-checked', 'true');
                localStorage.setItem(storageKey, 'dark');
            } else {
                body.classList.remove('mode-dark');
                body.classList.add('mode-light');
                themeToggleButton.classList.remove('is-active');
                themeToggleButton.setAttribute('aria-checked', 'false');
                localStorage.setItem(storageKey, 'light');
            }
        };

        if (currentTheme) {
            applyTheme(currentTheme);
        } else {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }

        if (themeToggleButton) {
            themeToggleButton.addEventListener('click', () => {
                if (body.classList.contains('mode-dark')) {
                    applyTheme('light');
                } else {
                    applyTheme('dark');
                }
            });
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
           if (!localStorage.getItem(storageKey)) { // Solo si el usuario no ha elegido explícitamente
               applyTheme(e.matches ? 'dark' : 'light');
           }
        });
    };

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
    initThemeToggle();
    initProfileToggle();
    initImageSliders();
    initContactFormToggle(); // Asegúrate de llamar a esta nueva función

}); // Fin del DOMContentLoaded