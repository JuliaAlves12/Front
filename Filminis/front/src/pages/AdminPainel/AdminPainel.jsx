import { useState, useEffect } from "react";
import NavBar from "../../../components/navBar/navBar";
import Footer from "../../../components/Footer/Footer";
import "./AdminPainel.css";

export default function AdminPainel({ logOut }) {
    const [filmesPendentes, setFilmesPendentes] = useState([]);
    const [altoContraste, setAltoContraste] = useState(false);
    const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

    const token = localStorage.getItem("access_token");

    const carregarPendentes = async () => {
        try {
            const res = await fetch("http://localhost:8000/filmes-pendentes", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            
            if (res.ok) {
                setFilmesPendentes(data);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        carregarPendentes();
    }, []);

    const handleAprovar = async (id) => {
        try {
            const res = await fetch(`http://localhost:8000/aprovafilme?id=${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();

            if (res.ok) {
                setMensagem({ texto: "Filme aprovado! Ele já foi para o catálogo principal.", tipo: "sucesso" });
                setFilmesPendentes(filmesPendentes.filter(filme => filme.id !== id));
            } else {
                setMensagem({ texto: data.error || "Erro ao aprovar.", tipo: "erro" });
            }
        } catch (error) {
            setMensagem({ texto: "Erro ao conectar com o servidor.", tipo: "erro" });
        }

        setTimeout(() => setMensagem({ texto: "", tipo: "" }), 3000);
    };

    const handleReprovar = async (id) => {
        const confirmar = window.confirm("Tem certeza que deseja reprovar e excluir este filme permanentemente?");
        if (!confirmar) return;

        try {
            const res = await fetch(`http://localhost:8000/filme?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();

            if (res.ok) {
                setMensagem({ texto: "Filme reprovado e removido do sistema.", tipo: "sucesso" });
                setFilmesPendentes(filmesPendentes.filter(filme => filme.id !== id));
            } else {
                setMensagem({ texto: data.error || "Erro ao reprovar.", tipo: "erro" });
            }
        } catch (error) {
            setMensagem({ texto: "Erro ao conectar com o servidor.", tipo: "erro" });
        }

        setTimeout(() => setMensagem({ texto: "", tipo: "" }), 3000);
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
                    <h2>Painel de Moderação</h2>
                    <p>Gerencie os filmes enviados pelos usuários antes que eles fiquem visíveis no catálogo.</p>
                </div>

                {mensagem.texto && (
                    <div className={`alerta-admin alert-${mensagem.tipo}`}>{mensagem.texto}</div>
                )}

                {filmesPendentes.length === 0 ? (
                    <div className="sem-pendentes">
                        <p>Nenhum filme aguardando aprovação no momento!</p>
                    </div>
                ) : (
                    <div className="grid-pendentes">
                        {filmesPendentes.map((filme) => (
                            <div key={filme.id} className="card-pendente">
                                <img 
                                    src={filme.imagem || "https://via.placeholder.com/150"} 
                                    alt={filme.titulo} 
                                    className="poster-pendente" 
                                />
                                <div className="info-pendente">
                                    <h3>{filme.titulo}</h3>
                                    <p className="ano-pendente">{filme.ano} • {filme.duracao}</p>
                                    <p className="sinopse-pendente">{filme.sinopse}</p>
                                    
                                    <div className="botoes-acoes">
                                        <button 
                                            className="botao-aprovar" 
                                            onClick={() => handleAprovar(filme.id)}
                                        >
                                            Aprovar e Publicar
                                        </button>
                                        <button 
                                            className="botao-reprovar" 
                                            onClick={() => handleReprovar(filme.id)}
                                        >
                                            Reprovar Filme
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer logOut={logOut} />
        </div>
    );
}