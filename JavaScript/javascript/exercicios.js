// // 1. Peça um número para o usuário e imprima se ele é par ou ímpar. E se é múltiplo de 3 ou de 5. 

let num = Number(prompt("Escreva um número: "))

if (num % 2 === 0){
    alert("Seu número é par")
} else {
    alert("Seu número é ímpar")
}

if (num % 3 === 0){
    alert("Seu número é múltiplo de 3")
} else {
    alert("Seu número não é múltiplo de 3")
}

if (num % 5 === 0){
    alert("Seu número é múltiplo de 5")
} else {
    alert("Seu número não é múltiplo de 5")
}

// // 2. Peça três números para o usuário e imprima qual o maior. 

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

// // 3. Conversor de Unidades. Escreva um programa que permite ao usuário escolher entre converter uma temperatura de Celsius para Fahrenheit ou vice-versa. Solicite o valor e execute a conversão

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

// // 5. Escreva um programa que pergunte a velocidade de um carro. Caso ultrapasse 80Km/h, exiba uma mensagem dizendo que o usuário foi multado. Nesse caso, exiba o valor da multa, cobrando R$5 por cada Km acima da velocidade permitida

let velocidade = prompt("Digite a velocidade do seu carro: ")

if (velocidade > 80){
    let multa = Number((velocidade - 80) * 5)
    alert(`Você foi multado por alta velocidade! Sua multa ficou em R$: ${multa}`)
} else {
    alert(`Você está dentro da velocidade permitida para essa via.`)
}

// // 6. Faça um algoritmo que pergunte a distância que um passageiro deseja percorrer em Km. Calcule o preço da passagem, cobrando R$0.50 por Km para viagens até 200Km e R$0.45 para viagens mais longas.

let pergunta = Number(prompt("Qual a distância que você deseja percorrer, em KM? "))

if (pergunta < 201){
    let passagem1 = Number(pergunta * 0.5)
    alert(`O preço da sua passagem ficou em R$: ${passagem1}`)
} else {
    let passagem2 = Number(pergunta * 0.45)
    alert(`O preço da sua passagem ficou em R$: ${passagem2}`)
}

// 7. Faça um programa que leia o ano de nascimento de uma pessoa, calcule a idade dela e depois mostre se ela pode ou não votar. 

let data_nasc = new Date(prompt("Qual sua data de nascimento? (AAAA-MM-DD) "))

let hoje = new Date

let idade = hoje.getFullYear() - data_nasc.getFullYear()

if (idade < 18){
    alert(`Você tem ${idade} anos e não pode votar!`)
} else {
    alert(`Você tem ${idade} anos e pode votar!`)
}

// 8. Faça um algoritmo que leia um determinado ano e mostre se ele é ou não BISSEXTO. 

let ano = Number(prompt("Em que ano estamos?"))

if (ano % 400 === 0){
    alert("É ano bissexto!")
} else if (ano % 4 === 0 && ano % 100 !== 0){
    alert("É ano bissexto!")
} else {
    alert("Não é ano bissexto")
}

// 9. Escreva um programa que leia o ano de nascimento de um rapaz e mostre a sua situação em relação ao alistamento militar. 
// - Se estiver antes dos 18 anos, mostre em quantos anos faltam para o alistamento. 
// - Se já tiver depois dos 18 anos, mostre quantos anos já se passaram do alistamento

let ano_nascimento = Number(prompt("Digite seu ano de nascimento: "))

let ano_atual = new Date().getFullYear()

let idade_alistamento = ano_atual - ano_nascimento

if (idade_alistamento < 18){
    let falta = 18 - idade_alistamento
    alert(`Faltam ${falta} anos para o alistamento`)
} else {
    let passou = idade_alistamento - 18
    alert(`Já se passaram ${passou} anos de alistamento`)
}

// 10. Faça um algoritmo para ler: número da conta do cliente, saldo, débito e crédito. Após, calcular e escrever o saldo atual (saldo atual = saldo - débito + crédito). Também testar se saldo atual for maior ou igual a zero escrever a mensagem 'Saldo Positivo', senão escrever a mensagem 'Saldo Negativo'.

let conta = prompt("Número da conta:")
let saldo = Number(prompt("Saldo atual:"))
let debito = Number(prompt("Débito:"))
let credito = Number(prompt("Crédito:"))

let saldo_atual = saldo - debito + credito

alert("Saldo atual: " + saldo_atual)

if (saldo_atual >= 0) {
  alert("Saldo Positivo")
} else {
  alert("Saldo Negativo")
}

// 11. Escreva um algoritmo para imprimir os números de 1 (inclusive) a 10 (inclusive) em ordem crescente. 

for (let i = 1; i <= 10; i++){
    alert(i)
}

// 12. Escreva um algoritmo para imprimir os números de 1 (inclusive) a 10 (inclusive) em ordem decrescente.

for (let i = 1; i >=1; i--){
    alert(i)
}

// 13. Escreva um algoritmo para imprimir os 10 primeiros números inteiros maiores que 100.

for (let i = 101; i <=110; i++){
    alert(i)
}

// 14. Ler o número de alunos existentes em uma turma e, após isto, ler as notas destes alunos, calcular e escrever a média aritmética dessas notas lidas.

let alunos = Number(prompt("Quantos alunos tem nessa sala? "))

let soma_alunos = 0

for (let i = 1; i <= alunos; i++){
    let nota_alunos = Number(prompt(`Digite a nosta do aluno ${i}: `))
    soma_alunos = soma_alunos + nota_alunos
}

let media = soma_alunos / alunos
alert(`Média da turma: ${media}`)

// 15. Escreva um algoritmo para ler 10 números e ao final da leitura escrever a soma total dos 10 números lidos.

let soma_num = 0

for (let i = 1; i <= 10; i++) {
  let numero = Number(prompt("Digite um número:"))
  soma_num = soma_num + numero
}

alert(`soma total: ${soma_num}`)

// 16. Escreva um algoritmo para ler 10 números. Todos os números lidos com valor inferior a 40 devem ser somados. Escreva o valor final da soma efetuada.

let soma_40 = 0

for (let i = 1; i <= 10; i++) {
  let numero = Number(prompt("Digite um número:"))
  
  if (numero < 40) {
    soma_40 = soma_40 + numero
  }
}

alert(`soma dos menores que 40: ${soma_40}`)

// 17. Ler 2 valores, calcular e escrever a soma dos inteiros existentes entre os 2 valores lidos (incluindo os valores lidos na soma). Considere que o segundo valor lido será sempre maior que o primeiro valor lido.

let valor_soma1 = Number(prompt("Digite o primeiro valor:"))
let valor_soma2 = Number(prompt("Digite o segundo valor:"))

let soma_total = 0

for (let i = valor_soma1; i <= valor_soma2; i++) {
  soma_total = soma_total + i
}

alert("Soma total: ${soma_total }")