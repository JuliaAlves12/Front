import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NavBar from "../../../components/navBar/navBar";
import Footer from "../../../components/Footer/Footer";
import { filmeID, editarFilme } from "../../services/api";
import "./EditarFilme.css";

export default function EditarFilme({ logOut }) {
    const [buscaParam] = useSearchParams();
    const id = buscaParam.get('id');
    const navigate = useNavigate();
    
    const [altoContraste, setAltoContraste] = useState(false);
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });

    const userRole = localStorage.getItem("user_role");
    const eAdmin = userRole && userRole.toLowerCase() === "admin";

    const [dbListas, setDbListas] = useState({
        categorias: [], produtoras: [], diretores: [], atores: [], linguagens: [], paises: []
    });

    const [titulo, setTitulo] = useState("");
    const [ano, setAno] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [duracao, setDuracao] = useState("");
    const [imagem, setImagem] = useState("");
    const [orcamento, setOrcamento] = useState("");

    // Agora vamos guardar os IDs numéricos!
    const [selecionados, setSelecionados] = useState({
        categorias: [], produtoras: [], diretores: [], atores: [], linguagens: [], paises: []
    });

    const formatarNomeCompleto = (item) => {
        if (item.sobrenome) return `${item.nome} ${item.sobrenome}`.trim();
        return item.nome.trim();
    };

    useEffect(() => {
        const inicializar = async () => {
            const endpoints = ["categorias", "produtoras", "diretores", "atores", "linguagens", "paises"];
            const novasListas = {};

            // 1. Busca todas as listas de IDs do banco primeiro
            for (let ep of endpoints) {
                try {
                    const res = await fetch(`http://localhost:8000/${ep}`); 
                    novasListas[ep] = await res.json();
                } catch (error) {
                    novasListas[ep] = [];
                }
            }
            setDbListas(novasListas);

            // 2. Carrega os dados do filme
            if (id) {
                try {
                    const dadosFilme = await filmeID(id);
                    setTitulo(dadosFilme.titulo || "");
                    setAno(dadosFilme.ano || "");
                    setSinopse(dadosFilme.sinopse || "");
                    setDuracao(dadosFilme.duracao || "");
                    setImagem(dadosFilme.poster || dadosFilme.imagem || "");
                    setOrcamento(dadosFilme.orcamento || "");

                    // Função inteligente para achar os IDs numéricos baseados nos nomes do filme
                    const extrairNome = (item) => {
                        let nome = typeof item === 'string' ? item : (item.valor || item.nome || '');
                        return nome.split('—')[0].trim().toLowerCase(); // Limpa o "— Não-binario" do back-end
                    };

                    const mapToIds = (listaFilme, listaDb, isPerson = false) => {
                        if (!listaFilme || !Array.isArray(listaFilme)) return [];
                        return listaFilme.map(itemFilme => {
                            const nomeFilme = extrairNome(itemFilme);
                            const encontrado = listaDb.find(itemDb => {
                                const nomeDb = isPerson ? formatarNomeCompleto(itemDb).toLowerCase() : itemDb.nome.toLowerCase();
                                return nomeDb === nomeFilme;
                            });
                            return encontrado ? String(encontrado.id) : null;
                        }).filter(idNum => idNum !== null);
                    };

                    setSelecionados({
                        categorias: mapToIds(dadosFilme.categorias, novasListas.categorias),
                        produtoras: mapToIds(dadosFilme.produtoras, novasListas.produtoras),
                        diretores: mapToIds(dadosFilme.diretores, novasListas.diretores, true),
                        atores: mapToIds(dadosFilme.atores, novasListas.atores, true),
                        linguagens: mapToIds(dadosFilme.linguagens, novasListas.linguagens),
                        paises: mapToIds(dadosFilme.paises, novasListas.paises)
                    });

                } catch (error) {
                    setMensagem({ texto: "Erro ao carregar os dados originais do filme.", tipo: "erro" });
                }
            }
            setLoading(false);
        };
        inicializar();
    }, [id]);

    const handleSelectChange = (e, campo) => {
        const valores = Array.from(e.target.selectedOptions, option => option.value);
        setSelecionados({ ...selecionados, [campo]: valores });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSalvando(true);
        setMensagem({ texto: "", tipo: "" });

        const token = localStorage.getItem("access_token");

        // O Python espera apenas números inteiros nestes arrays
        const filmeAtualizado = {
            titulo,
            ano: parseInt(ano) || 2026,
            sinopse,
            duracao,
            imagem,
            orcamento: String(orcamento || "0"),
            categorias: selecionados.categorias.map(Number),
            produtoras: selecionados.produtoras.map(Number),
            diretores: selecionados.diretores.map(Number),
            atores: selecionados.atores.map(Number),
            linguagens: selecionados.linguagens.map(Number),
            paises: selecionados.paises.map(Number)
        };

        try {
            await editarFilme(id, filmeAtualizado, token);
            setMensagem({ texto: "Filme atualizado com sucesso!", tipo: "sucesso" });
            setTimeout(() => navigate(`/movie?id=${id}`), 2000);
        } catch (error) {
            setMensagem({ texto: error.message, tipo: "erro" });
        } finally {
            setSalvando(false);
        }
    };

    if (loading) {
        return <div className="pagina-edit-movie"><p className="status">Carregando dados para edição...</p></div>;
    }

    if (!eAdmin) {
        return (
            <div className={altoContraste ? "pagina-edit-movie modo-alto-contraste" : "pagina-edit-movie"}>
                <NavBar logOut={logOut} funcaoContraste={() => setAltoContraste(!altoContraste)} estaAtivo={altoContraste} />
                <main className="form-container">
                    <div className="alerta-form alert-erro" style={{marginTop: "50px"}}>Apenas administradores podem editar filmes.</div>
                </main>
            </div>
        );
    }

    return (
        <div className={altoContraste ? "pagina-edit-movie modo-alto-contraste" : "pagina-edit-movie"}>
            <NavBar 
                logOut={logOut} 
                funcaoContraste={() => setAltoContraste(!altoContraste)} 
                estaAtivo={altoContraste} 
            />

            <main className="form-container">
                <div className="topo-form">
                    <h2>Editar Filme</h2>
                    <p>Altere as informações desejadas e atualize o catálogo.</p>
                </div>

                {mensagem.texto && (
                    <div className={`alerta-form alert-${mensagem.tipo}`}>{mensagem.texto}</div>
                )}

                <form onSubmit={handleSubmit} className="formulario-layout-duplo">
                    <div className="coluna-esquerda">
                        <h3>Informações Principais</h3>
                        <div className="grupo-input">
                            <label>Título do Filme *</label>
                            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                        </div>
                        
                        <div className="grupo-form-linha">
                            <div className="grupo-input">
                                <label>Ano *</label>
                                <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} required />
                            </div>
                            <div className="grupo-input">
                                <label>Duração (HH:MM:SS) *</label>
                                <input type="text" value={duracao} onChange={(e) => setDuracao(e.target.value)} required />
                            </div>
                        </div>

                        <div className="grupo-input">
                            <label>Orçamento (Opcional)</label>
                            <input type="text" value={orcamento} onChange={(e) => setOrcamento(e.target.value)} />
                        </div>

                        <div className="grupo-input">
                            <label>URL do Poster *</label>
                            <input type="url" value={imagem} onChange={(e) => setImagem(e.target.value)} required />
                        </div>

                        <div className="grupo-input">
                            <label>Sinopse *</label>
                            <textarea value={sinopse} onChange={(e) => setSinopse(e.target.value)} required rows="6"></textarea>
                        </div>
                    </div>

                    <div className="coluna-direita">
                        <h3>Ficha Técnica</h3>
                        <p className="aviso-ctrl">Segure <strong>CTRL</strong> para selecionar vários atributos existentes.</p>
                        
                        <div className="grid-selecao">
                            <div className="grupo-hibrido">
                                <label>Categorias</label>
                                <select multiple value={selecionados.categorias} onChange={(e) => handleSelectChange(e, "categorias")}>
                                    {dbListas.categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                                </select>
                            </div>

                            <div className="grupo-hibrido">
                                <label>Diretores</label>
                                <select multiple value={selecionados.diretores} onChange={(e) => handleSelectChange(e, "diretores")}>
                                    {dbListas.diretores.map(d => {
                                        const nomeFull = formatarNomeCompleto(d);
                                        return <option key={d.id} value={d.id}>{nomeFull}</option>
                                    })}
                                </select>
                            </div>

                            <div className="grupo-hibrido">
                                <label>Atores Principais</label>
                                <select multiple value={selecionados.atores} onChange={(e) => handleSelectChange(e, "atores")}>
                                    {dbListas.atores.map(a => {
                                        const nomeFull = formatarNomeCompleto(a);
                                        return <option key={a.id} value={a.id}>{nomeFull}</option>
                                    })}
                                </select>
                            </div>

                            <div className="grupo-hibrido">
                                <label>Linguagens</label>
                                <select multiple value={selecionados.linguagens} onChange={(e) => handleSelectChange(e, "linguagens")}>
                                    {dbListas.linguagens.map(l => <option key={l.id} value={l.id}>{l.nome}</option>)}
                                </select>
                            </div>

                            <div className="grupo-hibrido">
                                <label>Países</label>
                                <select multiple value={selecionados.paises} onChange={(e) => handleSelectChange(e, "paises")}>
                                    {dbListas.paises.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                </select>
                            </div>

                            <div className="grupo-hibrido">
                                <label>Produtoras</label>
                                <select multiple value={selecionados.produtoras} onChange={(e) => handleSelectChange(e, "produtoras")}>
                                    {dbListas.produtoras.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="area-botao">
                        <button type="submit" className="botao-submit-filme" disabled={salvando}>
                            {salvando ? "Salvando..." : "Salvar Edição"}
                        </button>
                    </div>
                </form>
            </main>

            <Footer logOut={logOut} />
        </div>
    );
}