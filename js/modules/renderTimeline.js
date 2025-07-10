export async function renderTimeline() {
  try {
    const res = await fetch('./data/timeline.json');
    if (!res.ok) throw new Error('No se pudo cargar el timeline.');

    const timelineData = await res.json();
    const container = document.querySelector('.timeline');
    if (!container) throw new Error('Contenedor .timeline no encontrado');

    timelineData.forEach(item => {
      if (item.type === 'heading') {
        const h3 = document.createElement('h3');
        h3.textContent = item.label;
        h3.className = 'timeline-heading';
        container.appendChild(h3);
      } else if (item.type === 'past') {
        const div = document.createElement('div');
        div.className = 'timeline-item past';
        div.innerHTML = `
          <span class="timeline-date">${item.year}</span>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        `;
        container.appendChild(div);
      } else if (item.type === 'future') {
        const div = document.createElement('div');
        div.className = 'timeline-item future';
        div.innerHTML = `
          <label>
            <input type="checkbox" ${item.checked ? 'checked' : ''}>
            ${item.label}
          </label>
        `;
        container.appendChild(div);
      }
    });
  } catch (error) {
    console.error('Error al renderizar el timeline:', error);
  }
}
