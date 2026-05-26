export function initImageSliders() {
  try {
    const sliders = document.querySelectorAll('.image-slider');
    sliders.forEach(initSlider);
  } catch (error) {
    console.error('Error al inicializar los sliders existentes:', error);
  }
}

export function initSlider(slider) {
  try {
    const controls = slider.querySelectorAll('.slider-control-item');
    const images = slider.querySelectorAll('.slider-image');
    const prevArrow = slider.querySelector('.prev-arrow');
    const nextArrow = slider.querySelector('.next-arrow');

    if (!controls.length || !images.length) return;

    let currentIndex = 0;

    const showSlide = (index) => {
      // Remover clase activa del control y la imagen anterior
      slider.querySelector('.slider-control-item.active')?.classList.remove('active');
      slider.querySelector('.slider-image.active')?.classList.remove('active');

      // Calcular el nuevo índice cíclico
      currentIndex = (index + images.length) % images.length;
      
      // Añadir clase activa al nuevo control y la nueva imagen
      controls[currentIndex].classList.add('active');
      images[currentIndex].classList.add('active');
    };

    // Control de clic en los botones de capa
    controls.forEach((control, idx) => {
      control.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevenir disparador de lightbox
        showSlide(idx);
      });
    });

    // Control de clic en flecha anterior
    if (prevArrow) {
      prevArrow.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevenir disparador de lightbox
        showSlide(currentIndex - 1);
      });
    }

    // Control de clic en flecha siguiente
    if (nextArrow) {
      nextArrow.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevenir disparador de lightbox
        showSlide(currentIndex + 1);
      });
    }
  } catch (error) {
    console.error('Error en un slider individual:', error);
  }
}
