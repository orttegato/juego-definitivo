// Verificar si el elemento de audio existe
var audioElement = document.getElementById('audioElement');
if (audioElement) {
    // Recuperar el estado de reproducción de localStorage
    var isPlaying = localStorage.getItem('isMusicPlaying') === 'true';
    var audioPosition = parseFloat(localStorage.getItem('audioPosition')) || 0;
    var volumeLevel = parseFloat(localStorage.getItem('volumeLevel')) || .5; 

    // Aplicar el estado de reproducción al botón y al audio
    updateAudioState(isPlaying);

    // Función para actualizar el estado de reproducción del audio
    function updateAudioState(isPlaying) {
        if (isPlaying) {
            audioElement.play();
            document.getElementById('musicButton').classList.remove('boton-music-blanco');
            document.getElementById('musicButton').classList.add('boton-music-negro');
        } else {
            audioElement.pause();
            document.getElementById('musicButton').classList.remove('boton-music-negro');
            document.getElementById('musicButton').classList.add('boton-music-blanco');
        }
    }

    // Establecer la posición de reproducción guardada
    audioElement.currentTime = audioPosition;

    // Función para alternar entre reproducir y pausar el audio
    function toggleAudio() {
        isPlaying = !isPlaying; // Cambiar el estado de reproducción
        localStorage.setItem('isMusicPlaying', isPlaying); // Guardar el estado en localStorage
        if (isPlaying) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
        updateAudioState(isPlaying); // Aplicar el estado de reproducción
    }

    // Guardar la posición de reproducción al pausar o detener el audio
    audioElement.addEventListener('pause', function() {
        localStorage.setItem('audioPosition', audioElement.currentTime);
    });
    audioElement.addEventListener('ended', function() {
        localStorage.setItem('audioPosition', 0); // Reiniciar la posición al finalizar la reproducción
    });
} else {
    console.log('El elemento de audio no se encontró.');
}
