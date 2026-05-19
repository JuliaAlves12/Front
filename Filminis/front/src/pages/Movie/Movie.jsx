
import { useEffect, useState } from "react"; // useEffect: faz algo assim que a página carrega
import { filmeID } from "../../services/api"; // Busca os dados do filme no servidor
import { useSearchParams } from "react-router-dom"; // Lê o ID do filme na barra de endereço (ex: ?id=123)

export default function Movie() {

    // 1. Identificação: Pega o ID do filme que está na URL do navegador
    const [buscaParam] = useSearchParams();
    const id = buscaParam.get('id')

    // 2. Memória: Estados para o filme, para o carregamento e para erros
    const [filme, setFilme] = useState(null)
    const [loading, setLoading] = useState(true) // Começa como 'true' (carregando...)
    const [erro, setErro] = useState("")

    // 3. O "Gatilho": O useEffect executa o código assim que o componente aparece
    useEffect(() => {
        async function carregarFilme() {
            try {
                setLoading(true) // Garante que a mensagem de "carregando" apareça
                setErro("") // Limpa erros de tentativas anteriores

                const dados = await filmeID(id); // Faz a chamada real ao servidor

                if (!dados) {
                    throw new Error("Filme não encontrado") // Se o servidor não achar nada, gera um erro
                }

                setFilme(dados) // Sucesso! Guarda os dados do filme na memória
            } catch (erro) {
                setErro(erro.message) // Algo deu errado (internet caiu ou ID inválido)
            } finally {
                setLoading(false); // Acabou o processo (com sucesso ou erro), para de carregar
            }
        }
        if (id) {
            carregarFilme(); // Só busca se existir um ID para procurar
        }
    }, [id]) // Refaz tudo se o ID na barra de endereço mudar

    // 4. Telas de Estado: O que mostrar enquanto os dados não chegam
    if (loading) {
        return <p className="loading"> Carregando filme...</p> // Tela de espera
    }

    if (erro) {
        return <p className="error">Erro: {erro}</p> // Tela de aviso de problema
    }

    if (!filme) {
        return <p className="error"> Nenhum filme para exibir.</p> // Tela de segurança
    }
 
    // 5. O Visual Final: Só aparece quando o 'filme' já está na memória
    return (
        <main>
            <h2>{filme.titulo}</h2>
            <div>
                <p>Ano: {filme.ano}</p>
                <p>Duração: {filme.duracao}</p>
            </div>

            <figure>
                <img src={filme.poster} alt={`Poster do filme ${filme.titulo}`} />
            </figure>

            <section>
                <h3>Categorias</h3>
                <ul>
                    {/* O .map percorre a lista de categorias e cria um <li> para cada uma */}
                    {filme.categorias.map((c) => (
                        <li>{c}</li>
                    ))}
                </ul>
            </section>
        </main>
    )
}