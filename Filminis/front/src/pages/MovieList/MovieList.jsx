import { useEffect, useState } from "react";
import { buscarFilmes, filmeID } from "../../services/api";
import { Link } from "react-router-dom"; // Importa o "link inteligente" que não recarrega a página
import "./movieList.css" // Importa o visual (estilos) da lista
import NavBar from "../../../components/navBar/navBar";

export default function MovieList({logOut}) {
    // 1. Memória: Aqui 'filmes' começa como uma lista vazia []
    const [filmes, setFilmes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true)

    // 2. O Gatilho: useEffect vazio [] significa "execute assim que a vitrine abrir"
    useEffect(() => {
        async function carregaFilme() {
            try {
                const dados = await buscarFilmes(); // Pede a lista de filmes para a API
                setFilmes(dados)
            } catch {
                setError("Não foi possível carregar os filmes.") // Caso a internet caia ou o servidor falhe
            } finally {
                setLoading(false); // Desliga a mensagem de "carregando"
            }
        }
        carregaFilme();
    }, []) // O colchete vazio garante que ele busque os filmes apenas UMA vez

    // 3. Telas de Espera: Bloqueia o visual final até que tudo esteja pronto
    if (loading) {
        return <p className="status">Carregando filmes...</p>
    }

    if (error) {
        return <p className="status error"> {error} </p>
    }

    // 4. A Vitrine: Transforma a lista de dados em elementos visuais
    return (
        <>
            <NavBar logOut={logOut}/>

            <section className="filme-section">
                <h2>Catálogo de Filmes</h2>

                <div className="filme-grid">
                    {filmes.map((film) => (
                        <article className="filme-card" key={film.id}>
                            <Link to={'/filme?id=${film.id}'}>
                                <img src={film.imagem} alt={'Poster do filme ${film.titulo}'} />
                                <div className="filme-info">
                                    <h3>{film.titulo}</h3>
                                    <p>{film.ano}</p>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}