import { useState } from "react"
import { loginUsuario } from "../../services/api"
import { useNavigate } from "react-router-dom"

export default function Login({setRole, setToken}){
    
    // Cria as caixinhas de memória e as funções que as atualizam
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [error, setError] = useState("") // Para guardar mensagens de erro, se houver

    function decodeJWT(token){
        const base64 = token.split('.')[1]
        return JSON.parse(atob(base64.replace(/-/g, "+").replace(/_/g,"/")))
    }

    // Função que lida com o clique no botão "Entrar"
    const handleLogin = async (e) => {
        e.preventDefault() // Impede a página de recarregar sozinha, e fazer o botão de enviar a gente conseguir criar a funcao dele, sem usar o ja existente

        // Tenta enviar os dados e espera (await) a resposta do servidor
        const data = await loginUsuario(email, senha)

        if(data.acess_token){
            try{
                setToken(data.acess_token)
                localStorage.setItem("acess_token", data.access_token)

                const payload = decodeJWT(data.acess_token)

                setRole(payload.role)
                localStorage.setItem("user_role", payload.role)

                setError("")
                useNavigate("/")
            }catch(err){
                console.error(err)
                setError("Erro ao processar token")
            }
        }else{
            setError(data.error || "Erro no login")
        }
    };


    return(
        <main>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input type="email" 
                placeholder="Digite seu emaill..."
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Atualiza a memória a cada letra digitada 
                required // Obriga o preenchimento antes de enviar
                />

                <label htmlFor="senha">Senha:</label>
                <input type="password" 
                placeholder="Digite sua senha..."
                name="senha"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)} required
                />

                <button type="submit">Entrar</button>
            </form>
        </main>
    )
}