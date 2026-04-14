import { useEffect, useState } from "react";
import { buscarFilmes } from "../services/api";

export default function MovieList() {
    const [filmes, setFilmes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function carregaFilme() {
            try {
                const dados = await buscarFilmes();
                setFilmes(dados)
            } catch {
                setError("Não foi possível carregar os filmes.")
            } finally {
                setLoading(false);
            }
        }
        carregaFilme();
    }, [])


    if (loading) {
        return <p>Carregando filmes...</p>
    }

    if (error) {
        return <p> {error} </p>
    }

    return (
        <section className="filme-section">
            <h2>Catálogo de Filmes</h2>

            <div>
                {filmes.map((film) => (
                    <article className="filme-card" key={film.id}>
                        <img src={film.imagem} alt={`Poster do filme ${filmes.titulo}`} />
                        <div>
                            <h3>{film.titulo}</h3>
                            <p>{film.ano}</p>
                        </div>

                    </article>
                ))}
            </div>
        </section>
    )
}