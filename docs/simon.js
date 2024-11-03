const btnUno = document.getElementById("uno");
const btnDos = document.getElementById("dos");
const btnTres = document.getElementById("tres");
const btnCuatro = document.getElementById("cuatro");

let botonPresionado = false;
let clickingOrder = [];
let index = 0;
let arrayAleatorio = [];

const n = 20;


/* ------ Aqui creamos el patrón de números ------ */
function patron(){
    for (let i = 1; i < 21; i++) {
        let numeroAleatorio = Math.floor(Math.random()*4+1); 
        arrayAleatorio.push(numeroAleatorio);
    }
    console.log(arrayAleatorio);
    
    return arrayAleatorio;
}
/* ------ Aqui creamos el patrón de números ------ */

function iniciarJuego() {
    const boton = document.getElementById("boton-content");
    boton.style.display = "none";
    botonPresionado = true;
    activarBotones();
    patron()
}


function activarBotones() {
    if (!botonPresionado) return;

    btnUno.onclick = () => manejarClick(1, 1174);
    btnDos.onclick = () => manejarClick(2, 1046);
    btnTres.onclick = () => manejarClick(3, 1318);
    btnCuatro.onclick = () => manejarClick(4, 1397.1);
}

function manejarClick(num, frecuencia) {
    tono(frecuencia, () => btnClicked(num));
}


function btnClicked(num) {

    clickingOrder.push(num);

    if (num === arrayAleatorio[index]) {
        index++;
        if (index === arrayAleatorio.length) {
            console.log("¡Completado!");
        }
    } else {
        console.log("Te equivocaste en la posición " + (1+index));
        mostrarModalFallo();
        clickingOrder = [];
        index = 0;
    }

    console.log("Clicking Order: ", clickingOrder);
}

function tono(frecuencia, callback) {
    let audioCtx = new window.AudioContext();

    let oscilador = audioCtx.createOscillator();
    let ganancia = audioCtx.createGain();

    oscilador.connect(ganancia);
    ganancia.connect(audioCtx.destination);

    if (frecuencia) oscilador.frequency.value = frecuencia;
    if (callback) oscilador.onended = callback;

    oscilador.start(audioCtx.currentTime);
    oscilador.stop(audioCtx.currentTime + (150 / 1000));

    audioCtx.resume();
}

function simon (){
    
}

function mostrarModalFallo() {
    mensajeFallo.style.display = "flex";
}

function reiniciarJuego() {
    mensajeFallo.style.display = "none";
}