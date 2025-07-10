export function initContactFormToggle() {
  try {
    const checkbox = document.getElementById('contact-toggle-checkbox');
    const toggleButtonLabel = document.querySelector('label[for="contact-toggle-checkbox"]');
    const formContainer = document.getElementById('contact-form-container');
    const form = formContainer?.querySelector('.actual-form');
    const thankYouMessage = formContainer?.querySelector('.thank-you-message');

    if (!checkbox || !toggleButtonLabel || !formContainer || !form || !thankYouMessage) return;

    // Abrir/cerrar el formulario desplegable
    checkbox.addEventListener('change', () => {
      const isChecked = checkbox.checked;
      toggleButtonLabel.setAttribute('aria-expanded', isChecked.toString());
      formContainer.setAttribute('aria-hidden', (!isChecked).toString());

      if (isChecked) {
        form.style.display = 'block';
        thankYouMessage.style.display = 'none';
        form.querySelector('input, textarea')?.focus();
      }
    });

    // Envío del formulario
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

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
          form.reset();
          form.style.display = 'none';
          thankYouMessage.style.display = 'block';

          // Cerrar automáticamente después de 4 segundos
          setTimeout(() => {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
          }, 4000);
        } else {
          const data = await response.json();
          const errorMessage = data.errors?.map(e => e.message).join(', ') || 'Hubo un problema al enviar el mensaje.';
          alert(errorMessage);
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Error de red. Por favor, verifica tu conexión.');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  } catch (error) {
    console.error('Error al inicializar el formulario de contacto:', error);
  }
}
