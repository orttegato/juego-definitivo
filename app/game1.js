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



    /*Inicialización del lienzo y variables:
    Aquí se selecciona el elemento canvas del HTML y
    se obtiene su contexto de dibujo en 2D. Se establecen
    las variables cw y ch para representar el ancho y alto
    del canvas, respectivamente, y cx y cy para representar
    las coordenadas del centro del canvas.*/

    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");
    ctx.willReadFrequently = true;

    var anchoCanvas, altoCanvas;

// Función para ajustar el tamaño del canvas dependiendo del dispositivo
function ajustarTamañoCanvas() {
    var anchoPantalla = window.innerWidth;

    // Definir dimensiones del canvas para diferentes dispositivos
    if (anchoPantalla >= 768) { // Si es de escritorio
        anchoCanvas = 800;
        altoCanvas = 500;
    } else { // Si es un dispositivo móvil
        anchoCanvas = 500;
        altoCanvas = 300;
    }

    // Asignar las dimensiones calculadas al canvas
    canvas.width = anchoCanvas;
    canvas.height = altoCanvas;
}

    ajustarTamañoCanvas();


    var dibujar = false;

    ctx.lineJoin = "round";
    ctx.lineWidth = 100;
    ctx.lineCap = "round";
    //ctx.strokeStyle = "red";


    /* Detención de los eventos del mouse*/
    canvas.addEventListener('mousedown', (evt) => {
        dibujar = true;
        //ctx.clearRect(0, 0, cw, ch);
        ctx.beginPath();

    }, false);

    canvas.addEventListener('mouseup', (evt) => {
        // Llamar a la función para verificar la transparencia
        verificarTransparencia();
        dibujar = false;
    }, false
    );

    canvas.addEventListener("mouseout", function (evt) {
        dibujar = false;
    }, false);

    /*Si la variable dibujar es verdadera, se obtiene
    la posición actual del mouse y se dibuja un círculo
    en esa posición, lo que simula un efecto de borrado.*/

    canvas.addEventListener("mousemove", function (evt) {
        if (dibujar && !detenido) {
            var m = oMousePos(canvas, evt);
            //ctx.lineTo(m.x, m.y);
            ctx.stroke();
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineTo(m.x, m.y);
            //ctx.arc(m.x,m.y,8,0,Math.PI*2,false);
            //ctx.fill();
        }
    }, false);

    /*Función para obtener la posición del mouse:
    Esta función toma el canvas y el evento del mouse
    como parámetros y devuelve un objeto con las coordenadas
    x e y del mouse relativas al canvas.*/

    function oMousePos(canvas, evt) {
        var ClientRect = canvas.getBoundingClientRect();
        return { //objeto
            x: Math.round(evt.clientX - ClientRect.left),
            y: Math.round(evt.clientY - ClientRect.top)
        }
    }

    /*Función de dibujo y carga de imagen
    Define la funcion (draw que carga una imagen y la dibuja
    en el canvas), luego la llama*/


    function draw() {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0,);
            ctx.beginPath();
            ctx.moveTo(30, 96);
            //   ctx.lineTo(70, 66);
            //   ctx.lineTo(103, 76);
            //   ctx.lineTo(170, 15);
            ctx.stroke();
        };
        img.src = "../assets/images/Rectangle 7.png";
    }

    draw()

    //Funcion para contar los pixeles que hay en el canvas, y si no hay
    //ninguno, te hace pasar a la siguiente pagina
    var totalPixels = anchoCanvas * altoCanvas;
    console.log(totalPixels)

    // Verificar si todos los píxeles son transparentes
    function verificarTransparencia() {
        var imgData = ctx.getImageData(0, 0, anchoCanvas, altoCanvas);
        //console.log(imgData)
        var allTransparent = true;

        // Iterar sobre los píxeles
        for (var i = 0; i < totalPixels * 4; i += 4) {
            // Comprobar si el componente alfa (transparencia) es igual a cero
            if (imgData.data[i + 3] !== 0) {
                // Si hay al menos un píxel no transparente, marcar como falso y salir del bucle
                allTransparent = false;
                break;
            }
        }

        // Mostrar alerta si todos los píxeles son transparentes
        if (allTransparent) {
            showPopup();
        }
    }

}

let detenido = false; // Estado inicial: el tiempo no está detenido
let tiempo = 20;
let intervalo;


document.addEventListener('DOMContentLoaded', function () {
    const contadorElemento = document.getElementById('contador');
    const detenerBtn = document.getElementById('detenerBtn');



    function actualizarContador() {
        contadorElemento.textContent = tiempo;
        tiempo--;
        if (tiempo < 0) {
            clearInterval(intervalo);
            window.location.href = "perder.html";
        }
    }

    // Función para detener o reanudar el tiempo
    function toggleTiempo() {

        if (detenido) { // Si el tiempo está detenido, reanudarlo
            intervalo = setInterval(actualizarContador, 1000);
            detenerBtn.textContent = ''; // Limpiamos el contenido del botón
            detenerBtn.classList.add('boton');
            const pElement = document.createElement('p'); // Creamos un elemento <p>
            pElement.textContent = 'STOP'; // Añadimos el texto al elemento <p>
            detenerBtn.appendChild(pElement); // Añadimos el elemento <p> al botón
        } else { // Si el tiempo está en curso, detenerlo
            clearInterval(intervalo);
            detenerBtn.textContent = ''; // Limpiamos el contenido del botón
            detenerBtn.classList.add('boton');
            const pElement = document.createElement('p'); // Creamos un elemento <p>
            pElement.textContent = 'RESTART'; // Añadimos el texto al elemento <p>
            detenerBtn.appendChild(pElement); // Añadimos el elemento <p> al botón
        }

        detenido = !detenido; // Cambiar el estado del tiempo
    }

    // Iniciar el contador
    intervalo = setInterval(actualizarContador, 1000);

    // Agregar evento clic al botón de detener/reanudar tiempo
    detenerBtn.addEventListener('click', toggleTiempo);
});

