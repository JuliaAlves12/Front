var a = 1; // pouco usada
let b = 2;
const c = 3; // não pode mudar depois

console.log(a + 1);
console.log(b + 1);
console.log(c + 1);

alert("Cuidado!! Julinha linda chegou rsrs"); // caixa de mensagem

const nome = prompt("Qual seu nome?") /*  caixa de entrada */     
console.log(nome);                    /* (input), e  
                                     coloca ela em uma 
                                     variável para ela 
                                     guardar as respostas. */

console.log(confirm("Você é real?" + nome)) /* pergunta de True or False */


const nome_usuario = prompt("Qual seu nome?"); /* Aqui ele vai mandar uma ciaxa de perguntas (input) para o usuario responder, e vai armazenar nessa const */
console.log(alert("Olá, "+ nome_usuario + "!")); /* Aqui ele vai enviar uma caixa de mensagem ao usuario, com o nome dele, desejando boas vindas */

const materia_fav = prompt("Qual sua matéria favorita " + nome_usuario + "?"); /* Aqui ele ja vai perguntar qual a matéria favorita do usuário utilizando a última variávelque criamos, onde armazenamos o nome */
console.log(alert("A matéria " + materia_fav + " realmente é ótima " + nome_usuario + "!")); /* Aqui ele esta respondendo ao usuário utilizando a const materia_fav e respondendo com o nome dele também, utilizando a const nome_usuario */

const data_hoje = prompt("Infome a data de hoje, "+ nome_usuario + ":") /* Aqui o usuario vai informar a data de hoje */
console.log(alert("A data de hoje, conforme o(a) " + nome_usuario + " é: " + data_hoje)) /* Aqui ele está pedindo a data de hoje ao usuário e desenvolvendo com o nome e a const da data de hoje*/

const pergunta = prompt(nome_usuario + " , está preparado (a) para o segundo semestre de desenvolvimento de sistemas?") /* Aqui ele está perguntando o nome o usuário */


// Exercício 2 

const num1 = Number(prompt("Digite um número: ")) /* Esse number serve para ele enteder como numero inteiro, e nao como string */
const num2 = Number(prompt("Digite outro número: "))

console.log(alert(`A soma desses números é: ${num1 + num2} \nA subtração desses números é: ${num1-num2} \nA muliplicação desses números é: ${num1*num2} \nA divisão desses números é: ${num1/num2}`)); /* Essa é a nova forma de fazer o console, sem utilizar o + */

const nota1 = Number(prompt("Digite sua primeira nota: "))
const nota2 = Number(prompt("Digite sua segunda nota: "))
const nota3 = Number(prompt("Digite sua terceira nota: "))

console.log(alert(`A média das suas notas é: ${(nota1+nota2+nota2) / 3} `)) /* Aqui está fazendo uma média aritmética */


const largura = Number(prompt("Digite a largura da sua parede: "))
const altura = Number(prompt("Digite a altura da sua parede: "))

const area = largura*altura
const litros = area/2

console.log(alert(`São necessários ${litros} litros de tinta para pintar a sua parede`))


// Terceiro exemplo
let maior = 20

if (maior > 19){
    console.log("maior")
} else {
    console.log("menor")
} 

let cor = prompt("or favorita: ");

switch (cor){
    case "preto":
        console.log("Você é a Kuromi");
        break;
    case "pink":
        console.log("Você é a My Melody");
        break;   
    case "rosa":
        console.log("Você é a Hello Kitty");
        break;
    case "branco":
        console.log("Você é a Cinamonroll");
        break;
    case "verde":
        console.log("Você é o Keroppi");
        break;
    case "amarelo":
        console.log("Você é o Ponponpurim");
        break;
}
