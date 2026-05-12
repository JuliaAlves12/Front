
// O Endereço: Pega o link do servidor de um arquivo secreto (.env)
// Isso evita que o endereço real do banco de dados fique exposto publicamente.
const API_URL = import.meta.env.VITE_API_URL;

// BUSCA GERAL: Pede a lista completa de filmes
export async function buscarFilmes(){
    try {
        // fetch: É como enviar uma carta pedindo a "/listagem"
        const resposta = await fetch(`${API_URL}/listagem`)

        if(!resposta.ok){
            throw new Error("Erro ao buscar filmes") // Se o servidor estiver fora do ar
        }

        // json(): Converte o "pacote" que chegou em dados que o JavaScript entende
        const dados = await resposta.json();
        return dados;

    } catch (erro) {
        console.error("Erro na API: ", erro)
        return []; // Se der erro, retorna uma lista vazia para o site não travar
    }
}

// BUSCA ÚNICA: Pede os detalhes de UM filme específico usando o ID
export async function filmeID(id){
    try{
        // Vai até o endereço com um "bilhete" identificando o filme (?id=...)
        const resposta = await fetch(`${API_URL}/filme?id=${id}`)

        if (!resposta.ok){
            throw new Error("Erro ao buscar filme.")
        }
        const dados = await resposta.json();
        return dados;
    } catch (erro){
        console.error("Erro na API:", erro)
        return [];
    }
}

// LOGIN: Envia seus dados para ver se você pode entrar
export async function loginUsuario(email, password){
    try{
        const resposta = await fetch(`${API_URL}/send_loginho`, {
            method: "POST", // POST significa "ENVIAR" dados sensíveis, em vez de apenas pedir
            headers:{"Content-Type": "application/x-www-form-urlencoded"}, // Avisa o formato do "envelope"
            body: new URLSearchParams({email, password}).toString(), // Coloca o email e senha dentro do envelope
        })
        
        if(!resposta.ok){
            throw new Error('Erro de Login')
        }

        const dados = await resposta.json()
        return dados
    }catch(erro){
        console.error('Erro de Login:', erro)
        return null // Se o login falhar, retorna "nada"
    }
}