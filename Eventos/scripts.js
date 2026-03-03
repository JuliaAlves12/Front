
const btn = document.querySelector('button');

function random(number){ // número aleatório dentro de um limite
    return Math.floor(Math.random() * (number + 1));
}

function btChange(e) {
    let color = "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")" // rgb(255,255,255)
    document.body.style.backgroundColor = color;
    console.log(e);
}

btn.addEventListener("click", btChange);

// let color = `rgb(${random(255) + random(255) + random(255)})`

/* 

Exercícios

1 - Contador.
    um botão que some (+1) toda vez que é clicado

2 - Mini Card.
    uma imagem, nome, texto
    botão para mudar o fundo só do card
    
3 - Mostrar Texto.
    cria uma barra de texto
    conforme usuário escreva na barra, o texto aparece em baixo em um hx

*/

// ex 1

let contador = 0;

const btn2 = document.getElementById('2');

function soma() {
    contador++
    btn2.textContent = contador
}

btn2.addEventListener("click", soma)


// ex 2

const fundo = document.getElementById('card-div')

const btn3 = document.getElementById('3')

function random(number){ // número aleatório dentro de um limite
    return Math.floor(Math.random() * (number + 1));
}

function changeBg() {
    let colorBg = "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")"
   fundo.style.backgroundColor = colorBg;
}
btn3.addEventListener("click", changeBg);

// ex 3


function userEscrita(){
    let input = document.getElementById('4').value;
    document.getElementById('paragrafo').innerHTML = input;
}