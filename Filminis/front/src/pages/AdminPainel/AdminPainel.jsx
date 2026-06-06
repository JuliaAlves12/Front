import { useState, useEffect } from "react";
import { buscarFilmesPendentes, aprovarFilme } from "../../services/api";
import NavBar from "../../../components/navBar/navBar";
import "./AdminPainel.css";

export default function AdminPainel({ logOut }) {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState("");
    const [altoContraste, setAltoContraste] = useState(false);
    
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        carregarPendentes();
    }, []);

    const carregarPendentes = async () => {
        try {
            const dados = await buscarFilmesPendentes(token);
            setFilmes(dados);
        } catch (error) {
            setMensagem("Erro ao buscar filmes pendentes ou você não tem permissão.");
        } finally {
            setLoading(false);
        }
    };

    const handleAprovar = async (idFilme) => {
        try {
            await aprovarFilme(idFilme, token);
            setFilmes(filmes.filter(filme => filme.id_filme !== idFilme));
            alert("Filme aprovado com sucesso! 🎉");
        } catch (error) {
            alert("Erro ao aprovar o filme.");
        }
    };

    return (
        <div className={altoContraste ? "pagina-admin modo-alto-contraste" : "pagina-admin"}>
            <NavBar 
                logOut={logOut} 
                funcaoContraste={() => setAltoContraste(!altoContraste)} 
                estaAtivo={altoContraste} 
            />

            <main className="admin-container">
                <div className="topo-admin">
                    <h2>Painel de Aprovação</h2>
                    <p>Gerencie os filmes cadastrados pelos usuários comuns.</p>
                </div>

                {mensagem && <p className="mensagem-erro-admin">{mensagem}</p>}
                
                {loading ? (
                    <p className="status-admin">Carregando filmes pendentes...</p>
                ) : filmes.length === 0 ? (
                    <p className="status-admin">Nenhum filme pendente de aprovação no momento! 🍿</p>
                ) : (
                    <div className="grid-pendentes">
                        {filmes.map((filme) => (
                            <div key={filme.id_filme} className="card-pendente">
                                <img src={filme.poster} alt={filme.titulo} />
                                <div className="info-pendente">
                                    <h3>{filme.titulo}</h3>
                                    <p>{filme.ano}</p>
                                    <button 
                                        className="botao-aprovar" 
                                        onClick={() => handleAprovar(filme.id_filme)}
                                    >
                                        Aprovar Filme
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}