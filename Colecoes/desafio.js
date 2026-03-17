// Desenvolva um programa que a partir de um vetor de inteiros com 5 valores inicializados na declaração apresente o dobro de cada valor armazenado.

let listaItens = [10,20,30,40,50]

for (let dobro of listaItens){
    console.log(dobro*2)
}


// Desenvolva um programa que a partir de um vetor de inteiros com 8 valores inicializados na declaração apresente a média aritméticas desses valores.

let listaInteiros = [1,2,3,4,5,6,7,8]

let soma = 0

for (let n of listaInteiros){
    soma = soma + n
}

let mediaArit = soma / listaInteiros.length

console.log(mediaArit)


// Desenvolva um programa que leia a idade de 20 pessoas e apresente as idades acima da média.

let listaIdades = [15, 20, 30, 10, 45, 50, 12, 18, 25, 33, 40, 22, 28, 35, 60, 14, 19, 21, 55, 17]

let somaIdades = 0

for (let idades20 of listaIdades){
    somaIdades = somaIdades + idades20;
}

let mediaIdades = somaIdades / listaIdades.length

console.log(`A média é: ${mediaIdades}`)
console.log("Idades maiores que a média das idades: ")

for (let idadesMaior of listaIdades){
    if (idadesMaior > mediaIdades)
        console.log(idadesMaior)
}


// Desenvolva um programa que leia 10 números e apresente os valores pares. Caso não tenha nenhum número par apresente a mensagem “Todos os números são ímpares.”

let listaValores = [10,11,20,23,30,35,40,47,50,59]

let listaPares = []

for (let numPar of listaValores){
    if (numPar % 2 === 0)
        listaPares.push(numPar)
    }

if (listaPares.length > 0){
    console.log(`Os numeros pares são ${listaPares}`)
} else {
    console.log("Todos os números sçao ímpares")
}


// Desenvolva um programa que leia 8 números garantindo que os valores informados estejam entre 100 e 200 (caso não esteja apresente uma mensagem de “valor inválido”). Depois de preenchido apresente os valores armazenados.

let numerosValidos = []

while (numerosValidos.length < 8){
    let entrada = Number(prompt("Digite um número entre 100 e 200: "))
    if (entrada >= 100 && entrada <= 200){
        numerosValidos.push(entrada)
    } else {
        alert("Valor inválido, tente novamente: ")
    }
}

console.log(`Os valores armazenados foram ${numerosValidos}`)