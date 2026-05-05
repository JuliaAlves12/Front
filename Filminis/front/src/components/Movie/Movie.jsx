
import { useEffect, useState } from "react";
import { filmeID } from "../../services/api";
import { useSearchParams } from "react-router-dom";

export default function Movie() {

    const [buscaParam] = useSearchParams();
    const id = buscaParam.get('id')

    const [filme, setFilme] = useState(null)
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState("")

    useEffect(() => {
        async function carregarFilme() {
            try {
                setLoading(true)
                setErro("")

                const dados = await filmeID(id);

                if (!dados) {
                    throw new Error("Filme não encontrado")
                }

                setFilme(dados)
            } catch (erro) {
                setErro(erro.message)
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            carregarFilme();
        }
    }, [id])

    if (loading) {
        return <p className="loading"> Carregando filme...</p>
    }

    if (erro) {
        return <p className="error">Erro: {erro}</p>
    }

    if (!filme) {
        return <p className="error"> Nenhum filme para exibir.</p>
    }

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
                    {filme.categorias.map((c) => (
                        <li>{c}</li>
                    ))}
                </ul>
            </section>
        </main>
    )
}