// Gerencia as "solicitações de edição" feitas por usuários comuns.
// Como o back-end não tem fluxo de edição pendente (o PATCH /filme exige admin),
// guardamos as solicitações no localStorage, no mesmo estilo dos favoritos.
// O admin revê o "antes x depois" no painel e aprova (aí sim dá o PATCH real) ou recusa.

const CHAVE = "solicitacoes_edicao_cinelist";

export function listarSolicitacoes() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE)) || [];
    } catch {
        return [];
    }
}

export function salvarSolicitacao(solicitacao) {
    const atuais = listarSolicitacoes();
    atuais.push(solicitacao);
    localStorage.setItem(CHAVE, JSON.stringify(atuais));
}

export function removerSolicitacao(idSolicitacao) {
    const restantes = listarSolicitacoes().filter((s) => s.idSolicitacao !== idSolicitacao);
    localStorage.setItem(CHAVE, JSON.stringify(restantes));
}
