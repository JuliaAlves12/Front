import { useEffect, useState } from "react";
import { buscarFilmes } from "../../services/api"; // Usando a função que sabemos que funciona!
import { useSearchParams, Link } from "react-router-dom";
import NavBar from "../../../components/navBar/navBar";
import "./Movie.css";

export default function Movie() {
    const [buscaParam] = useSearchParams();
    const id = buscaParam.get('id');

    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [altoContraste, setAltoContraste] = useState(false);

    useEffect(() => {
        async function carregarFilme() {
            try {
                setLoading(true);
                setErro("");

                // Pega a lista completa de filmes
                const todosOsFilmes = await buscarFilmes();

                // Pesca apenas o filme que tem o ID igual ao que foi clicado
                const filmeEncontrado = todosOsFilmes.find((f) => Number(f.id) === Number(id));

                if (!filmeEncontrado) {
                    throw new Error("Filme não encontrado na lista.");
                }

                setFilme(filmeEncontrado); 
                
            } catch (erro) {
                setErro(erro.message);
            } finally {
                setLoading(false);
            }
        }
        
        if (id) {
            carregarFilme();
        }
    }, [id]);

    if (loading) {
        return <p className="status">Carregando filme...</p>;
    }

    if (erro) {
        return <p className="status error">Erro: {erro}</p>;
    }

    if (!filme) {
        return <p className="status error">Nenhum filme para exibir.</p>;
    }

    const listaCategorias = filme.categorias ? filme.categorias.split(',') : [];

    return (
        <div className={altoContraste ? "pagina-detalhes modo-alto-contraste" : "pagina-detalhes"}>
            <NavBar 
                funcaoContraste={() => setAltoContraste(!altoContraste)} 
                estaAtivo={altoContraste} 
            />

            <main className="detalhes-container">
                <Link to="/" className="botao-voltar">← Voltar para o Catálogo</Link>

                <section className="detalhes-conteudo">
                    <img 
                        src={filme.poster || filme.imagem} 
                        alt={`Poster do filme ${filme.titulo}`} 
                        className="detalhes-poster" 
                    />

                    <div className="detalhes-info">
                        <h1>{filme.titulo}</h1>

                        <div className="tags-filme">
                            <span className="tag-info">{filme.ano}</span>
                            <span className="tag-info">{filme.duracao}</span>
                        </div>

                        <div className="categorias-box">
                            <h3>Categorias</h3>
                            <ul className="lista-categorias">
                                {listaCategorias.map((categoria, index) => (
                                    <li key={index} className="tag-categoria">
                                        {categoria.trim()}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="sinopse-box">
                            <h3>Sinopse</h3>
                            <p>{filme.sinopse}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}