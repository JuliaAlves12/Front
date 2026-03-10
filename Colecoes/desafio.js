// Desenvolva um programa que a partir de um vetor de inteiros com 5 valores inicializados na declaração apresente o dobro de cada valor armazenado.

let listaItens = [10,20,30,40,50]

for (let dobro of listaItens){
    console.log(dobro*2)
}


// Desenvolva um programa que a partir de um vetor de inteiros com 8 valores inicializados na declaração apresente a média aritméticas desses valores.

let listaInteiros = [1,2,3,4,5,6,7,8]

let soma = 0

for (let n of listaInteiros){
    soma += n
}

let mediaArit = soma / listaInteiros.length

console.log(mediaArit)


// Desenvolva um programa que leia a idade de 20 pessoas e apresente as idades acima da média.

