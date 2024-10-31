const btnUno = document.getElementById("uno");
const btnDos = document.getElementById("dos");
const btnTres = document.getElementById("tres");
const btnCuatro = document.getElementById("cuatro");

let clickingOrder = [];

btnUno.onclick = () => tono(1174,btnClicked(1));
btnDos.onclick = () => tono(1046,btnClicked(2));
btnTres.onclick = () => tono(1318,btnClicked(3));
btnCuatro.onclick = () => tono(1397.1,btnClicked(4));

function btnClicked(num) {
    if (clickingOrder.length >= 20) {
        clickingOrder = [];
        clickingOrder.push(num);
        console.log(clickingOrder);
    } else {
        clickingOrder.push(num);
        console.log(clickingOrder);
    }
}

function tono(frecuencia, callback) {
    let audioCtx = new window.AudioContext;

    let oscilador = audioCtx.createOscillator();
    let ganancia = audioCtx.createGain();
    
    oscilador.connect(ganancia);
    ganancia.connect(audioCtx.destination);
    
    if (frecuencia){oscilador.frequency.value = frecuencia;} //frecuencia en Hz. Default: 440 Hz
    if (callback){oscilador.onended = callback;} //llamar función después del tono
    
    oscilador.start(audioCtx.currentTime);
    oscilador.stop(audioCtx.currentTime + (150 / 1000)); //duración en milisegundos. Default: 150 ms

    audioCtx.resume();
};