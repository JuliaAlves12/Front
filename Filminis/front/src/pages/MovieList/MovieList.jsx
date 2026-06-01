import { useEffect, useState } from "react";
import { buscarFilmes } from "../../services/api";
import "./movieList.css";
import NavBar from "../../../components/navBar/navBar";
import Card from "../../../components/card/card";

export default function MovieList({ logOut }) {
    const [filmes, setFilmes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [altoContraste, setAltoContraste] = useState(false);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        async function carregaFilme() {
            try {
                const dados = await buscarFilmes();
                setFilmes(dados);
            } catch {
                setError("Não foi possível carregar os filmes.");
            } finally {
                setLoading(false);
            }
        }
        carregaFilme();
    }, []);

    if (loading) {
        return <p className="status">Carregando filmes...</p>;
    }

    if (error) {
        return <p className="status error">{error}</p>;
    }

    return (
        <div className={altoContraste ? "pagina-vitrine modo-alto-contraste" : "pagina-vitrine"}>
            <NavBar 
                logOut={logOut} 
                funcaoContraste={() => setAltoContraste(!altoContraste)} 
                estaAtivo={altoContraste} 
            />

            <section className="filme-section">
                <h2>Catálogo de Filmes</h2>

                <div className="filme-grid">
                    {filmes.map((film) => (
                        <article className="filme-card" key={film.id}>
                            <img src={film.imagem} alt={`Poster do filme ${film.titulo}`} />
                            <div className="filme-info">
                                <h3>{film.titulo}</h3>
                                <p>{film.ano}</p>
                                <Card idFilme={film.id} />
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}