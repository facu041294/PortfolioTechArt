import { initSlider } from './imageSliders.js'

export async function loadProjects() {
  try {
    const res = await fetch('./data/projects.json');
    if (!res.ok) throw new Error('No se pudo cargar el archivo de proyectos.');

    const projects = await res.json();
    const container = document.querySelector('#process-highlights');
    if (!container) throw new Error('Contenedor de proyectos no encontrado.');

    projects.forEach((project, index) => {
        const article = document.createElement('article');
        article.className = 'process-item';

        if (index % 2 !== 0) article.classList.add('layout-reversed');

      // Imágenes del slider
      const sliderImgs = project.imageSlider.map((img, i) => `
        <img src="assets/img/${img}" 
             class="slider-image ${i === 0 ? 'active' : ''}" 
             data-layer="${project.imageLabels[i]}" 
             loading="lazy" 
             alt="${project.title} - ${project.imageLabels[i]}">`
      ).join('');

      const sliderBtns = project.imageLabels.map((label, i) => `
        <button class="slider-control-item ${i === 0 ? 'active' : ''}" data-target-layer="${label}">${label}</button>`
      ).join('');

      // Snippet: imagen o código
      const snippetHTML = project.snippetImg
        ? `<div class="technical-snippet">
             <h4>Blueprint Logic Snippet:</h4>
             <img src="assets/img/${project.snippetImg}" alt="Captura técnica de ${project.title}">
           </div>`
        : project.snippetCode
        ? `<div class="technical-snippet">
             <h4>Python Snippet:</h4>
             <pre><code class="language-${project.snippetCode.lang}">${project.snippetCode.code}</code></pre>
           </div>`
        : '';

      article.innerHTML = `
        <div class="process-text">
          <h3>${project.title}</h3>
          <p>${project.desc}</p>
          ${snippetHTML}
          <a href="${project.link}" class="cta-link" target="_blank" rel="noopener noreferrer">Ver más detalles del proyecto</a>
        </div>
        <div class="process-visual">
          <div class="image-slider" data-slider-id="${project.id}">
            <div class="slider-images">${sliderImgs}</div>
            <div class="slider-controls">${sliderBtns}</div>
          </div>
        </div>
      `;

      container.appendChild(article);

      // Inicializar el nuevo slider recién insertado
      const sliderEl = article.querySelector('.image-slider');
      if (sliderEl) initSlider(sliderEl);
    });
  } catch (error) {
    console.error('Error al cargar los proyectos:', error);
    const fallback = document.querySelector('#process-highlights');
    if (fallback) {
      fallback.innerHTML += `<p class="error-message">No se pudieron cargar los proyectos. Intenta más tarde.</p>`;
    }
  }
}
