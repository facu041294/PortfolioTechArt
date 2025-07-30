export async function loadSocial() {
  try {
    const res = await fetch('./data/social.json');
    if (!res.ok) throw new Error('No se pudo cargar el archivo de redes sociales.');

    const socials = await res.json();
    const container = document.querySelector('.connect-buttons-grid');
    if (!container) throw new Error('Contenedor de botones sociales no encontrado.');

    socials.forEach(({ platform, url, svg }) => {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'connect-button';
      link.setAttribute('aria-label', `Visita mi perfil de ${platform}`);

      link.innerHTML = `
        <span class="connect-button-icon" aria-hidden="true">
          ${svg}
        </span>
        ${platform}
      `;

      container.appendChild(link);
    });
    const messageButton = document.createElement('label');
    messageButton.htmlFor = 'contact-toggle-checkbox';
    messageButton.className = 'connect-button contact-toggle-button-styled';
    messageButton.setAttribute('role', 'button');
    messageButton.setAttribute('tabindex', '0');
    messageButton.setAttribute('aria-expanded', 'false');
    messageButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-send-icon lucide-send">
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>
        <path d="m21.854 2.147-10.94 10.939"/>
      </svg>
      Mail Directo
    `;

    container.appendChild(messageButton);
  } catch (error) {
    console.error('Error al cargar redes sociales:', error);
  }
}
