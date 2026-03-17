
function falaDoido()
{
    const verbo = document.getElementById("verbo").value
    const nome = document.getElementById("nome").value
    const adje = document.getElementById("adjetivo").value

    const frase = document.getElementById("frase")

    frase.innerText = `${nome} é ${verbo} pra fazer ${adje}`

}

const botao = document.getElementById("botao")
botao.addEventListener('click', falaDoido)