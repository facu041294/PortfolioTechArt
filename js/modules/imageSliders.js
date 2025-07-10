export function initImageSliders() {
  try {
    const sliders = document.querySelectorAll('.image-slider');
    sliders.forEach(initSlider); // Usamos la misma función reutilizable
  } catch (error) {
    console.error('Error al inicializar los sliders existentes:', error);
  }
}

export function initSlider(slider) {
  try {
    const controls = slider.querySelectorAll('.slider-control-item');
    const images = slider.querySelectorAll('.slider-image');

    if (!controls.length || !images.length) return;

    controls.forEach(control => {
      control.addEventListener('click', () => {
        const targetLayer = control.dataset.targetLayer;

        slider.querySelector('.slider-control-item.active')?.classList.remove('active');
        slider.querySelector('.slider-image.active')?.classList.remove('active');

        control.classList.add('active');
        const newImage = slider.querySelector(`.slider-image[data-layer="${targetLayer}"]`);
        if (newImage) newImage.classList.add('active');
      });
    });
  } catch (error) {
    console.error('Error en un slider individual:', error);
  }
}
