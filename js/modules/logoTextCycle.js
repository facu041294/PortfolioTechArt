export function initLogoTextCycle() {
  try {
    const logoLink = document.querySelector('.hero-logo-dynamic a');
    if (!logoLink) return;

    const textOptions = [
      "Facundo Villarreal",
      "facu041294",
      "Desarrollador de Software",
      "Technical Artist"
    ];

    let currentIndex = 0;
    const displayDuration = 3000; // ms visibles
    const fadeDuration = 400;     // transición CSS

    const cycleText = () => {
      logoLink.classList.add('text-fading'); // inicio fade-out

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % textOptions.length;
        logoLink.textContent = textOptions[currentIndex];
        logoLink.classList.remove('text-fading'); // inicio fade-in
      }, fadeDuration);

      setTimeout(cycleText, displayDuration + fadeDuration);
    };

    logoLink.textContent = textOptions[currentIndex];
    setTimeout(cycleText, displayDuration);
  } catch (error) {
    console.error('Error al animar el logo dinámico:', error);
  }
}
