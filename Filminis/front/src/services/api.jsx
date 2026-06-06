
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

export async function buscarDadosAuxiliares(rota) {
    try {
        const resposta = await fetch(`${API_URL}/${rota}`);
        if (!resposta.ok) {
            throw new Error(`Erro ao buscar ${rota}`);
        }
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error(`Erro na API (${rota}):`, erro);
        return [];
    }
}

// Função para enviar o filme novo para o banco
export async function adicionarFilme(filmeData, token) {
    try {
        const resposta = await fetch(`${API_URL}/cadastrani`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Aqui enviamos o crachá de acesso (Token JWT) da sua professora!
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(filmeData) // Transforma os dados em texto JSON
        });

        if (!resposta.ok) {
            throw new Error('Erro ao cadastrar o filme. Verifique os dados.');
        }

        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error('Erro de Cadastro:', erro);
        throw erro;
    }
}

// Função para cadastrar um usuário novo
export async function registrarUsuario(dadosUsuario) {
    try {
        const resposta = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosUsuario)
        });

        if (!resposta.ok) {
            throw new Error('Erro ao criar conta. Verifique os dados ou se o email já existe.');
        }

        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error('Erro de Cadastro:', erro);
        throw erro;
    }
}

// ==========================================
// FUNÇÕES EXCLUSIVAS DO ADMINISTRADOR
// ==========================================

// 1. Busca todos os filmes que estão com status de "pendente"
export async function buscarFilmesPendentes(token) {
    try {
        const resposta = await fetch(`${API_URL}/filmes-pendentes`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Essencial para provar que é Admin
                "Content-Type": "application/json"
            }
        });

        if (!resposta.ok) {
            throw new Error('Erro ao buscar os filmes pendentes. Verifique se você tem permissão de Admin.');
        }

        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error('Erro de requisição:', erro);
        throw erro;
    }
}

// 2. Aprova o filme e envia ele para a vitrine principal
export async function aprovarFilme(idFilme, token) {
    try {
        // Nota: Assumindo que a professora espera o ID na URL (ex: /aprovafilme/5)
        // Se ela configurou para receber no "body", nós ajustamos depois!
        const resposta = await fetch(`${API_URL}/aprovafilme/${idFilme}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!resposta.ok) {
            throw new Error('Erro ao tentar aprovar o filme.');
        }

        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error('Erro ao aprovar filme:', erro);
        throw erro;
    }
}