let lista1 = ["João", "Kaique", "Thomas", "Gabi", "Rayane", "Julias"]
let lista2 = [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100];

// for (let indice in lista1){
//     console.log(indice) // ver indice da lista
//     // console.log(lista1[indice]); // ver os proprios nomes
// }

// for (let item of lista1){
//     console.log(item) // aparece os valores da lista
// }

// let frase = "Meus alunos: "; // cria a frase

// lista1.forEach(function(item){
//     frase += item + ", "
// }); 
// console.log(frase);


// lista1.forEach((item)=>{ // air function
//     frase += item + ", ";
// });
// console.log(frase);

// lista1[6] = "dienifer"
// console.log(lista1) // diretamente colocando na lista, mas menos usado (generico)

// lista1.push("dienifer"); // fim da lista

// lista1.unshift("Nicolas"); // começo da lista

// console.log(lista1)

// lista1.pop(); // retira o ultimo nome

// let a = lista1.pop() // maneira de colocar na lista o nom que ira sair
// console.log(lista1)


// lista1.shift() // retira primeiro nome

// let b = lista1.shift() // coloca o nome que retiraste da lista na variavel

// console.log(lista1)

// console.log(lista2.splice(3,4)) // printando o que esta sendo retirado

// lista2.splice(3,4) // printando o resto que sobrou, após retirar
// console.log(lista2) // splice edita lista oficial

// let a = lista2.slice(3,4); // slice nao edita lista oficial
// // 3 = onde começa, 4 = quantas casas retirar
// console.log(a);

// lista3 = lista1.slice(); // posso alterar lista3 sem alterar nada da lista 1
// console.log(lista3)

// let b = lista2.map(function(n){ // function anônima
//     return n*2;
// })

// console.log(b)

// let c = lista2.map(n => n*2)
// console.log(c) // air function em linha

// let d = lista2.map((n) => { // air function com mais de uma function
//     return n*2
// })
// console.log(d)

// let e = lista2.filter(function(n){ // filtros no JS
//     return n % 2 === 0;
// })
// // usado em :
// // BUSCAR COISAS NO FRONT
// // COLOCAR CATEGORIA
// console.log(e);

// let [a1, a2, a3] = lista1;
// console.log(a1,a2,a3)

// let [a1,a2,a3] = lista1[3]
// console.log(a1,a2,a3)

// let ou = lista1 + lista2
// console.log(1)
// 1 = {...lista1, ...lista2}
// console.log(1)

// 1 =  [lsta1, lista2]
// console.log(1)