function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.style.setProperty('--background-color', 'white');
      body.style.setProperty('--text-color', 'black');
    } else {
      body.classList.add('dark-theme');
      body.style.setProperty('--background-color', 'black');
      body.style.setProperty('--text-color', 'white');
    }
  }
  


// Función para mostrar la ventana emergente
function showPopup() {
    document.getElementById("popup").style.display = "block";
    detenido = true;
}

// Función para cerrar la ventana emergente
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

window.onload = () => {

    

    // Lista de elementos a mostrar progresivamente
    var elementosMostrados = ["contenidoInicial", "nuevoContenido"];
    var indiceElementoActual = 0;

    // Agregar un controlador de eventos click al botón "CONTINUE"
    document.getElementById("continueButton").addEventListener("click", function () {
        // Ocultar el elemento actual
        document.getElementById(elementosMostrados[indiceElementoActual]);

        // Incrementar el índice para mostrar el próximo elemento
        indiceElementoActual++;

        // Verificar si hemos llegado al final de la lista, si es así, volver al inicio
        if (indiceElementoActual >= elementosMostrados.length) {
            indiceElementoActual = 0;
        }

        // Mostrar el próximo elemento
        document.getElementById(elementosMostrados[indiceElementoActual]);

        // Redirigir al usuario al HTML 2
        window.location.href = "comic2.html";

        // Cerrar el popup si está abierto
        closePopup();
    });

}