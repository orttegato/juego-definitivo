// Función para mostrar u ocultar la alerta dependiendo de la orientación del dispositivo
function checkOrientation() {
    var rotateAlert = document.getElementById('rotateAlert');
    if (window.innerWidth < window.innerHeight) {
        // Dispositivo en orientación vertical (portrait)
        rotateAlert.style.display = 'block'; // Mostrar alerta
    } else {
        // Dispositivo en orientación horizontal (landscape)
        rotateAlert.style.display = 'none'; // Ocultar alerta
    }
}

// Ejecutar la función checkOrientation al cargar la página y cuando se redimensione la ventana
window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
