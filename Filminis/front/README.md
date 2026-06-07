# 🎬 Filminis

Sistema de gerenciamento de filmes desenvolvido com React, Python e MySQL.

O projeto permite visualizar, cadastrar, editar, excluir e favoritar filmes, além de contar com controle de acesso para usuários comuns e administradores.


## Tecnologias Utilizadas

- React.js
- Vite
- CSS
- Python
- MySQL


## Pré-requisitos

Para executar o projeto, é necessário ter instalado:

- Node.js
- Python 3
- MySQL Server
- MySQL Workbench


## Configuração do Banco de Dados

1. Abra o MySQL Workbench.
2. Conecte-se utilizando:

```text
Usuário: root
Senha: root
```

3. Abra o arquivo DDL fornecido pelo BackEnd.
4. Execute o script para criar o banco de dados e as tabelas.

O arquivo `infra/database.py` está configurado para utilizar:

```text
Usuário: root
Senha: root
```

Caso utilize outras credenciais, será necessário alterar esse arquivo.


## Executando o Back-end

Abra um terminal na raiz do projeto e execute:

```bash
cd back
cd FILMESERVER
```

Instale as dependências:

```bash
pip install mysql-connector-python pyjwt
```

Inicie o servidor:

```bash
py server.py
```

Se tudo estiver correto, o servidor será iniciado em:

```text
http://localhost:8000
```


## Executando o Front-end

Abra outro terminal e execute:

```bash
cd front
```

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run dev
```

O terminal exibirá o endereço para acesso da aplicação.

Geralmente:

```text
http://localhost:5173
```


## Usuário Administrador

O banco já possui um administrador cadastrado para testes.

**E-mail**

```text
admin@example.com
```

**Senha**

```text
admin
```


## Cadastro de Usuários

Usuários comuns não vêm cadastrados no banco de dados.

Para criar uma conta, utilize a opção **Cadastre-se** na tela inicial.


## Permissões

### Usuário Comum

- Visualizar filmes
- Acessar os detalhes dos filmes
- Favoritar filmes
- Visualizar seus favoritos
- Cadastrar filmes
- Enviar filmes para aprovação dos administradores

### Administrador

- Visualizar filmes
- Acessar os detalhes dos filmes
- Favoritar filmes
- Cadastrar filmes
- Editar filmes
- Aprovar filmes enviados por usuários
- Reprovar filmes enviados por usuários
- Excluir filmes



## Funcionalidades

- Cadastro de filmes
- Listagem de filmes
- Edição de filmes
- Exclusão de filmes
- Aprovação e reprovação de filmes
- Sistema de favoritos
- Busca por título
- Busca por ano
- Busca por categoria
- Busca por diretor
- Busca por atores
- Modo alto contraste


## Observações

- O banco de dados deve ser criado antes de iniciar a aplicação.
- O Back-end deve estar em execução para que o Front-end funcione corretamente.
- É necessário executar `pip install` no Back-end e `npm install` no Front-end antes da primeira execução.