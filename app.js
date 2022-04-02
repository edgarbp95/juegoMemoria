const cardCover = document.querySelectorAll(".card_cover");
const cardHidden = document.querySelectorAll(".card_hidden");
const inputIntentos = document.getElementById("intentosRestantes");
const inputAciertos = document.getElementById("aciertos");
const cartas = document.querySelectorAll(".mezclar");
const botonRestart = document.querySelector(".restart");
const msjEstado = document.getElementById("msj_estado");
let intentosRest = 10;
let aciertos = 0;
let retornar, primeraCartaCover,primeraCartaHidden, segundaCartaCover,segundaCartaHidden;
let jugada = 0;

inputIntentos.value = intentosRest;

const revolverCartas = ()=>{

    cartas.forEach((element)=>{
        let cartasAzar = Math.floor(Math.random()*16);
        element.style.order = cartasAzar;
    })

}

const incrementarAcierto = ()=>{
    inputAciertos.value++;
    if(inputAciertos.value==8){
        ganaste();
    } 
}

const ganaste = ()=>{
    msjEstado.innerHTML = "¡Ganasteeeeeeeeeee!";
}

const perdiste = ()=>{
    msjEstado.innerHTML = "¡Buuu! Intentalo de nuevo"
    for(let i=0;i<cardCover.length;i++){
        cardHidden[i].removeAttribute("style");
        cardCover[i].removeAttribute("style");
        cardHidden[i].style.display = "block";
    }
}

const restarIntento = ()=>{
    
    inputIntentos.value--;
}

const voltearCartas = ()=>{
    for(let i=0;i<cardCover.length;i++){
        cardCover[i].addEventListener("click", ()=>{

            if(jugada==0){
                clearTimeout(retornar);
                primeraCartaHidden = cardHidden[i];
                primeraCartaCover = cardCover[i];
                cardHidden[i].style.display = "block";
                cardCover[i].style.animation = "girarCarta 2s forwards";
                        
                cardHidden[i].style.animation = "girarCartaDos 1.2s forwards";

                cardHidden[i].setAttribute("data-jugada","volteada");

                cardHidden[i].disabled = true;
                jugada++;
                
            } else if(jugada==1){
                jugada++;
                segundaCartaHidden = cardHidden[i];
                segundaCartaCover = cardCover[i];
                cardHidden[i].style.display = "block";
                cardCover[i].style.animation = "girarCarta 2s forwards";
                        
                cardHidden[i].style.animation = "girarCartaDos 1.2s forwards";

                cardHidden[i].setAttribute("data-jugada","volteada");   
                cardHidden[i].disabled = true;           

                if(primeraCartaHidden.dataset.anime === segundaCartaHidden.dataset.anime){
                    primeraCartaHidden.disabled = true;
                    segundaCartaHidden.disabled = true;
                    jugada=0;
                    
                    setTimeout(incrementarAcierto,500);
                } else{
                    retornar = setTimeout(()=>{
                    primeraCartaCover.style.animation = "devolverCartas 0.5s forwards";
                    primeraCartaHidden.style.animation = "devolverCartaDos 0.5s forwards";
                    segundaCartaCover.style.animation = "devolverCartas 0.5s forwards";
                    segundaCartaHidden.style.animation = "devolverCartaDos 0.5s forwards";
                    jugada=0;
                    primeraCartaHidden.disabled = false;
                    segundaCartaHidden.disabled = false;
                    primeraCartaHidden.style.display = "none";
                    segundaCartaHidden.style.display = "none";
                    restarIntento();
                    if(inputIntentos.value==0){
                        setTimeout(perdiste,500);
                    }
                    
                },2000);
                }

                
            }       

        })
    }
}

const configurarJuego = ()=>{
    inputAciertos.value=0;
    inputIntentos.value=10;
    clearTimeout(retornar);
    jugada = 0;
    msjEstado.innerHTML = ""
    for(let i=0;i<cardCover.length;i++){
        
        cardHidden[i].disabled = false;
        cardHidden[i].removeAttribute("style");
        cardHidden[i].style.display = "none";
        cardCover[i].removeAttribute("style");
    }
    revolverCartas();
}

const comenzarJuego = ()=>{
    
    configurarJuego();

    voltearCartas();

}

comenzarJuego();

botonRestart.addEventListener("click",configurarJuego);
