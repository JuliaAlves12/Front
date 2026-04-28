import { useEffect, useState } from "react";
import { buscarFilmes, filmeID } from "../../services/api";
import { Link } from "react-router-dom";
import "./movieList.css"

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
        return <p className="status">Carregando filmes...</p>
    }

    if (error) {
        return <p className="status error"> {error} </p>
    }

    return (
        <section className="filme-section">
            <h2>Catálogo de Filmes</h2>

            <div className="filme-grid">
                {filmes.map((film) => (
                    <article className="filme-card" key={film.id}>
                        <Link to={`/filme?id=${film.id}`}>
                            <img src={film.imagem} alt={`Poster do filme ${filmes.titulo}`} />
                            <div className="filme-info">
                                <h3>{film.titulo}</h3>
                                <p>{film.ano}</p>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    )
}