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
  } catch (error) {
    console.error('Error al cargar redes sociales:', error);
  }
}
