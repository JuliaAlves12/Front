
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