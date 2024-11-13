const btnUno = document.getElementById("btn1");
const btnDos = document.getElementById("btn2");
const btnTres = document.getElementById("btn3");
const btnCuatro = document.getElementById("btn4");
const btnStart = document.getElementById("start");
const btnRestart = document.getElementById("restart");

let index = 0;
let clickingOrder = [];
let arrayAleatorio = [];
const n = 20;

// Inicializar el juego
function inicializarJuego() {
    toggleBotones(false); // Los botones están desactivados por defecto
    btnRestart.disabled = true;
    btnStart.onclick = iniciarJuego;
    btnRestart.onclick = reiniciarJuego;
}

function iniciarJuego() {
    mensaje.style.display = "none";
    arrayAleatorio = generarPatron();
    index = 0;
    clickingOrder = [];
    actualizarSteps(index);
    mostrarPatronSecuencial(index + 1);
    btnRestart.disabled = false;
    console.log("Patrón generado: ", arrayAleatorio);
}

function generarPatron() {
    const nuevoPatron = [];
    while (nuevoPatron.length < n) {
        nuevoPatron.push(Math.round(Math.random() * 3) + 1);
    }
    return nuevoPatron;
}

function toggleBotones(estado) {
    [btnUno, btnDos, btnTres, btnCuatro].forEach(btn => btn.disabled = !estado);
    if (estado) {
        btnUno.onclick = () => manejarClick(1, 1174);
        btnDos.onclick = () => manejarClick(2, 1046);
        btnTres.onclick = () => manejarClick(3, 1318);
        btnCuatro.onclick = () => manejarClick(4, 1397.1);
    } else {
        [btnUno, btnDos, btnTres, btnCuatro].forEach(btn => btn.onclick = null);
    }
}

function mostrarPatronSecuencial(limite) {
    toggleBotones(false);
    let i = 0;
    
    function mostrarSiguientePaso() {
        if (i < limite) {
            const numeroBoton = arrayAleatorio[i];
            const boton = obtenerBoton(numeroBoton);
            const frecuencia = obtenerFrecuencia(numeroBoton);
            iluminarBoton(boton, frecuencia, () => {
                i++;
                mostrarSiguientePaso();
            });
        } else {
            clickingOrder = [];
            toggleBotones(true);
        }
    }
    
    mostrarSiguientePaso();
}

function obtenerBoton(numero) {
    switch (numero) {
        case 1: return btnUno;
        case 2: return btnDos;
        case 3: return btnTres;
        case 4: return btnCuatro;
    }
}

function obtenerFrecuencia(numero) {
    switch (numero) {
        case 1: return 1174;
        case 2: return 1046;
        case 3: return 1318;
        case 4: return 1397.1;
    }
}

function iluminarBoton(boton, frecuencia, callback) {
    boton.style.filter = "brightness(4)";
    tono(frecuencia);
    
    setTimeout(() => {
        boton.style.filter = "brightness(1)";
        setTimeout(callback, 10);
    }, 250);
}

function manejarClick(num, frecuencia) {
    tono(frecuencia, () => btnColorPresionado(num));
}

function btnColorPresionado(num) {
    clickingOrder.push(num);
    const currentSequence = arrayAleatorio.slice(0, clickingOrder.length);
    
    if (clickingOrder.every((val, index) => val === currentSequence[index])) {
        if (clickingOrder.length === index + 1) {
            index++;
            actualizarSteps(index);
            if (index === arrayAleatorio.length) {
                mostrarMensaje("¡Has ganado!", "green");
                toggleBotones(false);
            } else {
                setTimeout(() => mostrarPatronSecuencial(index + 1), 1000);
            }
        }
    } else {
        mostrarMensaje(`Te equivocaste en el nivel ${index + 1}`, "red");
        toggleBotones(false);
        clickingOrder = [];
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

function mostrarMensaje(texto, color) {
    const mensaje = document.getElementById("mensaje");
    mensaje.style.marginTop = "10px";
    mensaje.style.textAlign = "center";
    mensaje.style.display = "block";
    mensaje.style.color = color;
    mensaje.style.fontSize = "30px";
    mensaje.style.fontWeight = "bolder";
    mensaje.innerText = texto;
}

function reiniciarJuego() {
    const mensaje = document.getElementById("mensaje");
    mensaje.style.display = "none";
    index = 0;
    clickingOrder = [];
    actualizarSteps(index);
    toggleBotones(true);
    mostrarPatronSecuencial(index + 1);
}

function actualizarSteps(nivel) {
    const steps = document.getElementById("steps");
    steps.innerText = `${nivel}/${n}`;
}

inicializarJuego();