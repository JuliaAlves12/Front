import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Não esqueça do Link aqui!
import { loginUsuario } from "../../services/api";
import NavBar from "../../../components/navBar/navBar";
import "./login.css";

export default function Login({ setToken, setRole }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const [altoContraste, setAltoContraste] = useState(false);
    
    // O useNavigate é o nosso "motorista", ele leva o usuário pra outra tela
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita que a página recarregue ao enviar o formulário
        setLoading(true);
        setErro("");

        try {
            const dados = await loginUsuario(email, senha);

            if (!dados) {
                throw new Error("E-mail ou senha incorretos!");
            }

            const tokenRecebido = dados.access_token || dados.token; 
            const roleRecebida = dados.role || dados.tipo_usuario || "user";

            // Salva no navegador para não deslogar quando der F5
            localStorage.setItem("access_token", tokenRecebido);
            localStorage.setItem("user_role", roleRecebida);

            // Atualiza o App.jsx para liberar as rotas
            setToken(tokenRecebido);
            setRole(roleRecebida);

            // Manda o usuário de volta para a tela inicial
            navigate("/");

        } catch (error) {
            setErro(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={altoContraste ? "pagina-login modo-alto-contraste" : "pagina-login"}>
            <NavBar 
                funcaoContraste={() => setAltoContraste(!altoContraste)} 
                estaAtivo={altoContraste} 
            />

            <main className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>Acesse sua Conta</h2>
                    
                    {erro && <p className="mensagem-erro">{erro}</p>}

                    <div className="grupo-input">
                        <label htmlFor="email">E-mail</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="grupo-input">
                        <label htmlFor="senha">Senha</label>
                        <input 
                            type="password" 
                            id="senha" 
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required 
                        />
                    </div>

                    <button type="submit" className="botao-entrar" disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
                    </button>

                    {/* O nosso atalho para a página de Cadastro fica aqui! */}
                    <p style={{ textAlign: "center", marginTop: "16px", color: "var(--txt-secundario)", fontSize: "14px" }}>
                        Ainda não tem conta? <Link to="/register" style={{ color: "var(--primary)", fontWeight: "bold", textDecoration: "none" }}>Cadastre-se</Link>
                    </p>
                </form>
            </main>
        </div>
    );
}