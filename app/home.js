function toggleTheme() {
  const body = document.body;
  if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.style.setProperty('--background-color', 'white');
      body.style.setProperty('--text-color', 'black');
      localStorage.setItem('theme', 'light'); // Guardar el tema en localStorage
  } else {
      body.classList.add('dark-theme');
      body.style.setProperty('--background-color', 'black');
      body.style.setProperty('--text-color', 'white');
      localStorage.setItem('theme', 'dark'); // Guardar el tema en localStorage
  }
  applyTheme(); // Aplicar el tema a todas las páginas
}

// Función para aplicar el tema al cargar la página
function applyTheme() {
  const currentTheme = localStorage.getItem('theme');
  const body = document.body;
  if (currentTheme === 'dark') {
      body.classList.add('dark-theme');
  } else {
      body.classList.remove('dark-theme');
  }
}

// Aplicar el tema al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  applyTheme();
});
