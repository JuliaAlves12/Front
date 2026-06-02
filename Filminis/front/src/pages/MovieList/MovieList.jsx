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
    const [generoSelecionado, setGeneroSelecionado] = useState("Todos");
    const [menuAberto, setMenuAberto] = useState(false);

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

    const selecionarGenero = (genero) => {
        setGeneroSelecionado(genero);
        setMenuAberto(false);
    };

    return (
        <div className={altoContraste ? "pagina-vitrine modo-alto-contraste" : "pagina-vitrine"}>
            <NavBar 
                logOut={logOut} 
                funcaoContraste={() => setAltoContraste(!altoContraste)} 
                estaAtivo={altoContraste} 
            />

            <section className="filme-section">
                <div className="topo-secao">
                    <h2>Catálogo de Filmes</h2>
                    
                    <div className="barra-pesquisa-composta">
                        <input 
                            type="text" 
                            className="campo-busca" 
                            placeholder="Buscar filme..." 
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)} 
                        />

                        <div 
                            className="wrapper-filtro" 
                            onClick={() => setMenuAberto(!menuAberto)}
                        >
                            <div className="display-filtro">
                                {generoSelecionado === "Todos" ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="4" y1="6" x2="20" y2="6"></line>
                                        <line x1="7" y1="12" x2="17" y2="12"></line>
                                        <line x1="10" y1="18" x2="14" y2="18"></line>
                                    </svg>
                                ) : (
                                    generoSelecionado
                                )}
                            </div>

                            {menuAberto && (
                                <ul className="menu-filtro-customizado">
                                    <li onClick={() => selecionarGenero("Todos")}>Todos os Gêneros</li>
                                    <li onClick={() => selecionarGenero("Ação")}>Ação</li>
                                    <li onClick={() => selecionarGenero("Animação")}>Animação</li>
                                    <li onClick={() => selecionarGenero("Terror")}>Terror</li>
                                    <li onClick={() => selecionarGenero("Romance")}>Romance</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                <div className="filme-grid">
                    {filmes
                        .filter((film) => {
                            const bateTexto = film.titulo.toLowerCase().includes(busca.toLowerCase());
                            const bateGenero = generoSelecionado === "Todos" || film.genero === generoSelecionado;
                            return bateTexto && bateGenero;
                        })
                        .map((film) => (
                            <article className="filme-card" key={film.id}>
                                <img src={film.imagem} alt={`Poster do filme ${film.titulo}`} />
                                <div className="filme-info">
                                    <h3>{film.titulo}</h3>
                                    <p>{film.ano}</p>
                                    <Card idFilme={film.id} />
                                </div>
                            </article>
                        ))
                    }
                </div>
            </section>
        </div>
    );
}