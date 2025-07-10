export function updateFooterYear() {
  try {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    } 
  } catch (error) {
    console.error('Error al actualizar el año del footer:', error);
  }
}
