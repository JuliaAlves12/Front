// 1. Peça um número para o usuário e imprima se ele é par ou ímpar. E se é múltiplo de 3 ou de 5. 

let num = Number(prompt("Escreva um número: "))

if (num % 2 === 0){
    console.log("Seu número é par")
} else {
    console.log("Seu número é ímpar")
}

if (num % 3 === 0){
    console.log("Seu número é múltiplo de 3")
} else {
    console.log("Seu número não é múltiplo de 3")
}

if (num % 5 === 0){
    console.log("Seu número é múltiplo de 5")
} else {
    console.log("Seu número não é múltiplo de 5")
}

// 2. Peça três números para o usuário e imprima qual o maior. 

let num1 = Number(prompt("Escreva o primeiro número: "))
let num2 = Number(prompt("Escreva o segundo número: "))
let num3 = Number(prompt("Escreva o terceiro número: "))

if (num1 > num2 && num1 > num3){
    console.log(alert(`O número ${num1} é o maior número`))
} else if (num2 > num1 && num2 > num3){
    console.log(alert(`O número ${num2} é o maior número`))
} else {
    console.log(alert(`O número ${num3} é o maior número`))
}

// 3. Conversor de Unidades. Escreva um programa que permite ao usuário escolher entre converter uma temperatura de Celsius para Fahrenheit ou vice-versa. Solicite o valor e execute a conversão

let escolha = confirm("Você quer converter em Celsius ou Fahrenheit? \nCelsius = Ok ou Fahrenheit = Cancel ")

if (escolha === true){
    let celsius = prompt("Quantos graus em celsius você que converter para fahrenheit? ")
    let conta1 = (celsius * 1.8) + 32
    alert(`O número ${celsius} covertido fica: ${conta1} `)
} else {
    let fahrenheit = prompt("Quantos graus em fahrenheit você que converter para celsius? ")
    let conta2 = (fahrenheit / 1.8) - 32
    alert(`O número ${fahrenheit} covertido fica: ${conta2} `)
}

// 5. Escreva um programa que pergunte a velocidade de um carro. Caso ultrapasse 80Km/h, exiba uma mensagem dizendo que o usuário foi multado. Nesse caso, exiba o valor da multa, cobrando R$5 por cada Km acima da velocidade permitida

let velocidade = prompt("Digite a velocidade do seu carro: ")

if (velocidade > 80){
    
}