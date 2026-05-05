
export default function Login(){
    

    return(
        <main>
            <h2>Login</h2>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" 
                placeholder="Digite seu emaill..."
                name="email"
                id="email"
                />

                <label htmlFor="senha">Senha:</label>
                <input type="password" 
                placeholder="Digite sua senha..."
                name="senha"
                id="senha"
                />

                <button type="submit">Entrar</button>
            </form>
        </main>
    )
}