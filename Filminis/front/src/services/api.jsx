const API_URL = import.meta.env.VITE_API_URL;

export async function buscarFilmes(){
    try {
        const resposta = await fetch(`${API_URL}/listagem`)

        if(!resposta.ok){
            throw new Error("Erro ao buscar filmes")
        }

        const dados = await resposta.json();
        return dados;

    } catch (erro) {
        console.error("Erro na API: ", erro)
        return [];
    }
}

export async function filmeID(id){
    try{
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